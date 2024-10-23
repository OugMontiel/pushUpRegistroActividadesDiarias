const { ObjectId } = require("mongodb");
const ConnectToDatabase = require("../../infrastructure/mongodb");

class User {
  constructor() {
    // Crear una única instancia de conexión a la base de datos
    this.dbConnection = new ConnectToDatabase();
  }
  async createUser(userData) {
    try {
      await this.dbConnection.connectOpen(); // Abrir la conexión a la BD
      const collection = this.dbConnection.db.collection("usuario");
      const res = await collection.insertMany([userData]);
      return res;
    } catch (error) {
      throw new Error(
        JSON.stringify({
          status: 503,
          message: `Error en modelo al crear usuario: ${error.message}`
        })
      );
    } finally {
      await this.dbConnection.connectClose(); // Cerrar la conexión en el bloque finally
    }
  }
  async getById(id) {
    try {
      await this.dbConnection.connectOpen(); // Abrir la conexión a la BD
      const collection = this.dbConnection.db.collection("usuario");
      const [res] = await collection.find({ _id: new ObjectId(id) }).toArray();
      return res;
    } catch (error) {
      throw new Error(
        JSON.stringify({
          status: 503,
          message: `Error en modelo al Encontrar usuario: ${error.message}`
        })
      );
    } finally {
      await this.dbConnection.connectClose(); // Cerrar la conexión en el bloque finally
    }
  }
  async updateById(id, updateData) {
    try {
      await this.dbConnection.connectOpen(); // Abrir la conexión a la BD
      const collection = this.dbConnection.db.collection("usuario");
      const res = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData },
        { upsert: false }
      );
      return res;
    } catch (error) {
      throw new Error(
        JSON.stringify({
          status: 503,
          message: `Error en modelo al actualizar usuario: ${error.message}`
        })
      );
    } finally {
      await this.dbConnection.connectClose(); // Cerrar la conexión en el bloque finally
    }
  }
  async deleteUser(id) {
    try {
      await this.dbConnection.connectOpen(); // Abrir la conexión a la BD
      const collection = this.dbConnection.db.collection("usuario");
      const res = await collection.deleteMany({ _id: new ObjectId(id) });
      return res;
    } catch (error) {
      throw new Error(
        JSON.stringify({
          status: 503,
          message: `Error en modelo al Eliminar un usuario: ${error.message}`
        })
      );
    } finally {
      await this.dbConnection.connectClose(); // Cerrar la conexión en el bloque finally
    }
  }
}

module.exports = User;
