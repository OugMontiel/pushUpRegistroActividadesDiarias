// Implementa la lógica de negocio y coordina las interacciones entre el dominio y la infraestructura.
const UserModel = require("../../domain/models/userModel");
const bcrypt = require("bcryptjs");

class UserService {
  constructor() {
    this.userModel = new UserModel();
  }
  // obtener todos los Usuarios 
  async getAllUsers() {
    try {
      // retorna de una todos los Usuarios
      return  await this.userModel.getAllUsers();

    } catch (error) {
      // console.error("Error:", error);
      throw new Error(
        JSON.stringify({ 
          status: 500, 
          message: "Error En el service al otener todos el usuario" 
        })
      );
    }  
  }
  // crear un Usuario
  async createUser(data) {
    try {
      // Encriptar la contraseña
      // console.log('data.password',data);
      const password = await bcrypt.hash(data.password, 5);
      
      // Reemplazar la contraseña original con el hash
      data.contrasena_hash = password;
      delete data.password;
      
      return await this.userModel.createUser(data);

    } catch (error) {
      // console.error("Error:", error);
      throw new Error(
        JSON.stringify({ 
          status: 500, 
          message: "Error En el service al crear el usuario" 
        })
      );
    }
  }
  //Obtener un Usuario por Id 
  async getUserById(id) {
    const user = await this.userModel.getById(id);

    // Si Es folse es por que no se encontro Usuario
    if (!user) {
      throw new Error(
        JSON.stringify({ 
          status: 500, 
          message: "Error En el service al optener el usuario" 
        })
      );
    }

    //retorna el Usuario
    return user;

  }

  // Actualizar Usuario
  async updateUser(id, data) {
    // Actualizar el usuario
    const updatedUser = await this.userModel.updateById(id, data);

    // si es falso, no entontro Usuario 
    if (!updatedUser) {
      throw new Error(
        JSON.stringify({ 
          status: 500, 
          message: "Error En el service al actualizar el usuario" 
        })
      );
    }
    
    // Verificar si se actualizó algún documento
    if (res.modifiedCount === 0) {
      throw new Error(
        JSON.stringify({ 
          status: 500, 
          message: "Error En el service usuario no encontrado" 
        })
      );
    }
    return updatedUser;
  }
  //Borrar o eliminar un usuario 
  async deleteUser(id) {
    const deletedUser = await this.userModel.deleteUser(id);
    if (!deletedUser) {
      throw new Error(
        JSON.stringify({ 
          status: 404, 
          message: "Error En el service, usuario no Eliminado" 
        })
      );
    }
    return deletedUser;
  }
}

module.exports = UserService;
