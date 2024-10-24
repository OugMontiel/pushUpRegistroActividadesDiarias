// Gestiona las peticiones HTTP y las respuestas, delegando la lógica de negocio a los servicios.
const { validationResult } = require("express-validator");
const UserService = require("../services/userService");

class UserController {
  constructor() {
    this.insUserService = new UserService();
  }
  // validar generico
  validarExpres(req, res) {
    const errors = validationResult(req);
    // console.error("errors:", errors);
    if (!errors.isEmpty()){
      res.status(400).json({ errors: errors.array() });
      return; // Detener la ejecución si hay errores
    }
    return true;
  }
  // crear un Usuario
  async createUser(req, res) {
    try {
      // Validar si hay errores
      if (!this.validarExpres(req, res)) return;

      // Crear el usuario
      const user = await this.insUserService.createUser(req.body);

      // Responder con éxito usando el formato estándar
      res.status(201).json({
        status: 201,
        message: "Usuario creado exitosamente",
        data: user // Aquí se enviaría el objeto del usuario creado
      });
    } catch (error) {
      // console.error("Error:", error);

      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status).json({
        status: errorObj.status,
        message: errorObj.message
      });
    }
  }
  //obtener todos los Usuarios 
  async getAllUsers(req, res) {
    try {
      // Validar si hay errores
      if (!this.validarExpres(req, res)) return;

      // Obtener todos los Usuarios
      const users = await this.insUserService.getAllUsers();

      // Responder con éxito usando el formato estándar
      res.status(201).json({
        status: 201,
        message: "Todos los Usuarios",
        data: users // Aquí se enviaría el objeto del usuario creado
      });

    } catch (error) {
      // console.error("Error:", error);

      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status).json({
        status: errorObj.status,
        message: errorObj.message
      });
    }
  }
  // obtener un Usuario
  async getUser(req, res) {
    try {
      // Validar si hay errores
      if (!this.validarExpres(req, res)) return;

      // Optner el Usuario
      const user = await this.insUserService.getUserById(req.params.id);

      // respoder con exito
      res.status(200).json({
        status: 200,
        message: "Usuario por Id",
        data: user // Aquí se enviaría el objeto del usuario creado
      });

    } catch (error) {
      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status).json({
        status: errorObj.status,
        message: errorObj.message
      });
    }
  }
  // actualizar un Usuario
  async updateUser(req, res) {
    try {
      // Validar si hay errores
      if (!this.validarExpres(req, res)) return;

      // Actualizar el Usuario
      const user = await this.insUserService.updateUser(req.params.id, req.body);

      // Responder con éxito
      res.status(200).json({
        status: 200,
        message: "Usuarios actualizado",
        data: user // Aquí se enviaría el objeto del usuario creado
      });

    } catch (error) {
      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status).json({
        status: errorObj.status,
        message: errorObj.message
      });
    }
  }
  // eliminar un Usuario
  async deleteUser(req, res) {
    try {
      // Validar si hay errores
      if (!this.validarExpres(req, res)) return;

      // Borrar el Usuario
      const user = await this.insUserService.deleteUser(req.params.id);

      // Este código indica que la solicitud fue exitosa y que el recurso ha sido eliminado, pero no hay contenido adicional para enviar en la respuesta.
      res.status(204).json({
        status: 204,
        message: "Usuarios eliminado",
        data: user // Aqui se envia el ok del borrado 
      });

    } catch (error) {
      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status).json({
        status: errorObj.status,
        message: errorObj.message
      });
    }
  }
}

module.exports = UserController;
