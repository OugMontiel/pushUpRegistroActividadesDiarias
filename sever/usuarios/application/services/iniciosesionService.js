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
        throw new Error(
          JSON.stringify({
            status: 404,
            message: 'Usuario no encontrado o credenciales inválidas',
          })
        );
      }

      // Verificar si la contraseña es correcta
      const isMatch = await bcrypt.compare(password, usuario.password);
      if (!isMatch) {
        throw new Error(
          JSON.stringify({
            status: 401,
            message: 'No autorizado, contraseña incorrecta',
          })
        );
      }

      // Retornamos el token
      return jwt.sign(usuario, process.env.JWT_SECRET, {
        expiresIn: `${process.env.EXPRESS_EXPIRE}ms`,
      });
    } catch (error) {
      if (error.message) {
        throw new Error(error.message); // Mostramos el mensaje del error original
      } else {
        // Si el error no tiene mensaje, lanzamos un error genérico
        throw new Error(
          JSON.stringify({
            status: 400,
            message: 'Error en el repositorio de autenticación',
          })
        );
      }
    }
  }

  async getUserByEmailWithoutPassword(email) {
    // Lógica para obtener el usuario desde el repositorio
    const usuario = await this.inicioSesionRepository.getUserByEmail(email);

    // console.log('usuario:', usuario);

    // Verificar si el usuario existe
    if (!usuario) {
      return false
    }
    return usuario;
  }
  async createUser(user) {
    try {

      // 1. Define el cuerpo de la solicitud (body)
      const usuario = {
        nameUser: user.nameUser,
        FullName: user.FullName,
        password: user.password,
        email: user.email,
        foto: user.foto,
      };
      // console.log('Usuario a crear', JSON.stringify(usuario));
      
      // Realiza la solicitud POST a tu endpoint
    const response = await fetch('http://localhost:3000/user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario),
    });

    // Maneja la respuesta exitosa
    if (response.ok) {
      return this.getUserByEmailWithoutPassword(user.email);
    }
    
    // console.log('Usuario creado exitosamente:', response.data);
      return response.data;
    } catch (error) {
      // 4. Maneja errores
      if (error.response) {
        // La solicitud se hizo y el servidor respondió con un estado de error
        console.error('Error al crear usuario:', error.response.data);
      } else if (error.request) {
        // La solicitud se hizo pero no se recibió respuesta
        console.error('Error de solicitud:', error.request);
      } else {
        // Algo más sucedió al configurar la solicitud
        console.error('Error:', error.message);
      }
    }
  }
  // Función para generar el token
  generarToken(usuario) {
    // Convertir la expiración en segundos si es necesario
    const expiresIn = Math.floor(process.env.EXPRESS_EXPIRE / 1000);

    // Generar el token en una variable
    const token = jwt.sign(usuario, process.env.JWT_SECRET, {
      expiresIn,
    });

    // Retornar el token
    return token;
  }
}

module.exports = inicioSesionService;
