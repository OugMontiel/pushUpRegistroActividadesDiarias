// Gestiona las peticiones HTTP y las respuestas, delegando la lógica de negocio a los servicios.
const { validationResult } = require('express-validator');
const InicioSesionService = require('../services/iniciosesionService');

class inicioSesionController {
  constructor() {
    this.inicioSesionService = new InicioSesionService();
  }
  // Controlador: Maneja el inicio de sesión mediante cookies
  async sessionLogin(req, res) {
    try {
      // Verificación de errores de validación
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Busca el usuario en la base de datos por email y Comparar la contraseña
      const token = await this.inicioSesionService.getUserByEmail(
        req.body.password,
        req.body.email
      );

      // Almacena el token en la sesión
      req.session.token = token;

      // Enviar respuesta de éxito con el token
      res.status(201).json({
        status: 201,
        message: "Autenticación exitosa",
        data: { token }
      });
    } catch (error) {
      // Si el error contiene un mensaje específico
      if (error.message) {
        try {
          const errorObj = JSON.parse(error.message);
          res.status(errorObj.status).json({
            status: errorObj.status,
            message: errorObj.message
          });
        } catch (parseError) {
          // Si no se puede parsear, enviar un error genérico
          return res.status(500).json({
            status: 500,
            message: "Error en el Controlador de inicio de sesión"
          });
        }
      } else {
        // Si el error no tiene mensaje, lanzamos un error genérico
        return res.status(400).json({
          status: 400,
          message: "Error en el Contolador de inicio"
        });
      }
    }
  }
  // Cerrar sesión
  async logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          message: "Error al cerrar sesión"
        });
      }
      res.status(200).json({
        status: 200,
        message: "Sesión cerrada exitosamente"
      });
    });
  }
  // Validar la session
  async checkSession(req, res) {
    // Comprobamos si el usuario tiene una sesión activa
    // console.log('Session:', req.session, 'token:', req.session.token);

    if (req.session && req.session.token) {
      // Si la sesión es válida, respondemos con authenticated: true
    return res.status(200).json({
      status: 200,
      message: "Sesión válida",
      data: { authenticated: true, token: req.session.token }
    });
  }
  // Si no tiene sesión activa, devolvemos un error 401 (no autorizado)
    res.status(401).json({
      status: 401,
      message: "No autenticado",
      data: { authenticated: false}
      });
  }
}

module.exports = inicioSesionController;
