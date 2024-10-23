const InicioSesionModel = require('../models/inicioSesionModel');

class InicioSesionRepository {
  constructor() {
    this.inicioSesionModel = new InicioSesionModel();
  }
  // Obtener un usuario basado en su 'email' y comparar Su contraseña
  async getUserByEmail(email) {
    try {
      // Ejecutamos el pipeline de agregación en el modelo Auth
      const usuario = await this.inicioSesionModel.getUserByEmail(email);

      // Validamos que el resultado no sea undefined o un array vacío
      if (!usuario) {
        return false;
      }
      // console.log('resultado Encontrado', usuario.length);
      if (usuario.length === 0) {
        return res.status(404).json({
          status: 404,
          message: "Credenciales inválidas"
        });
      }

      // validación usuarios duplicados
      if (usuario.length > 1) {
        return res.status(500).json({
          status: 500,
          message: "Se encontraron múltiples usuarios con el mismo correo electrónico. Contacta al soporte."
        });
      }

      // Si se encontró un usuario, devolvemos el primer (y único) resultado en el array
      return usuario;
    } catch (error) {
      if (error.message) {
        return res.status(500).json({
          status: 500,
          message: error.message
        });
      } else {
        // Si ocurre otro tipo de error, lanzamos uno genérico
        return res.status(400).json({
          status: 400,
          message: "Error en el repositorio de autenticación"
        });
      }
    }
  }
}

module.exports = InicioSesionRepository;
