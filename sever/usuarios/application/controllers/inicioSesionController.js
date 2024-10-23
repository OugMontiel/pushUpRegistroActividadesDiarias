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
      res.status(201).json({ token });
    } catch (error) {
      // Si el error contiene un mensaje específico
      if (error.message) {
        try {
          const errorData = JSON.parse(error.message); // Intentar parsear el mensaje de error
          return res.status(errorData.status || 500).json({ message: errorData.message });
        } catch (parseError) {
          // Si no se puede parsear, enviar un error genérico
          return res.status(500).json({ message: 'Error en el servidor' });
        }
      } else {
        // Si el error no tiene mensaje, lanzamos un error genérico
        throw new Error(JSON.stringify({ status: 400, message: 'Error in auth repository' }));
      }
    }
  }
  // Cerrar sesión
  async logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Error logging out' });
      }
      res.status(200).json({ message: 'Logged out successfully' });
    });
  }
  // Encontrar o crear Usuuario para autentificaicon 2 pasos
  async findOrCreate(profile) {
    try {
      // console.log(profile);

      // Extraer información del perfil
      const { name, photos, id, displayName, emails, username } = profile;
      const email = emails ? emails[0].value.trim() : null;
      const foto = photos ? photos[0].value : null;

      // console.log("email enviado a verificar: ",email);

      // Buscar usuario existente
      const user = await this.inicioSesionService.getUserByEmailWithoutPassword(email);

      // Retornar el usuario si existe
      if (user) {
        // Generar el token usando la función separada
        const token = this.inicioSesionService.generarToken(user);

        // console.log(user);
        return { user, token }; // Retornar usuario y token
      } else {
        // Si `givenName` no existe, usar `username`
        const nameToUse = name?.givenName || username;
        // console.log('name User final despues de verificar:',nameToUse);
        
        //  Si no existe, crear un nuevo usuario (delegar la lógica al servicio)
        const newUser = await this.inicioSesionService.createUser({
          password: id,
          nameUser: nameToUse,
          FullName: displayName,
          email: email,
          foto: foto,
        });

        // Generar el token para el nuevo usuario
        const token = this.inicioSesionService.generarToken(newUser);

        return { newUser, token }; // Retornar usuario y token
      }
    } catch (error) {
      // Manejo de errores
      console.error('Error en findOrCreate:', error);
      throw error; // Puedes personalizar el manejo de errores según tus necesidades
    }
  }
  // Validar la session
  async checkSession(req, res) {
    // Comprobamos si el usuario tiene una sesión activa
    // console.log('Session:', req.session, 'token:', req.session.token);

    if (req.session && req.session.token) {
      // Si la sesión es válida, respondemos con authenticated: true
      return res.status(200).json({ authenticated: true, token: req.session.token });
    }
    // Si no tiene sesión activa, devolvemos un error 401 (no autorizado)
    res.status(401).json({ authenticated: false, message: 'Not authenticated' });
  }
}

module.exports = inicioSesionController;
