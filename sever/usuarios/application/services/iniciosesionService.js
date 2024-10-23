// Implementa la lógica de negocio y coordina las interacciones entre el dominio y la infraestructura.
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const InicioSesionRepository = require('../../domain/repositories/inicioSesionRepository');

class inicioSesionService {
  constructor() {
    this.inicioSesionRepository = new InicioSesionRepository();
  }
  async getUserByEmail(password, email) {
    try {
      // Lógica para obtener el usuario desde el repositorio
      const usuario = await this.inicioSesionRepository.getUserByEmail(email);

      // Verificar si el usuario existe
      if (!usuario) {
        return res.status(404).json({
          status: 404,
          message: "Usuario no encontrado o credenciales inválidas"
        });
      }

      // Verificar si la contraseña es correcta
      const isMatch = await bcrypt.compare(password, usuario.password);
      if (!isMatch) {
        return res.status(404).json({
          status: 401,
          message: "No autorizado, contraseña incorrecta"
        });
      }

      // Retornamos el token
      return jwt.sign(usuario, process.env.JWT_SECRET, {
        expiresIn: `${process.env.EXPRESS_EXPIRE}ms`,
      });

    } catch (error) {
      if (error.message) {
        return res.status(500).json({
          status: 500,
          message: error.message
        });
      } else {
        // Si el error no tiene mensaje, lanzamos un error genérico
        return res.status(400).json({
          status: 400,
          message: "Error en el server de autenticación"
        });
      }
    }
  }
}

module.exports = inicioSesionService;
