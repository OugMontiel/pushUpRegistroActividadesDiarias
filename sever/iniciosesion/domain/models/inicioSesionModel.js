const ConnectToDatabase = require('../../infrastructure/mongodb');

class inicioSesionModel {
  constructor() {
    // Crear una única instancia de conexión a la base de datos
    this.dbConnection = new ConnectToDatabase();
  }
  async getUserByEmail(Email) {
    try {
      await this.dbConnection.connectOpen(); // Abrir la conexión a la BD
      const collection = this.dbConnection.db.collection("usuario");
      const [res] = await collection.find({ email: Email }).toArray();
      // console.log('en modelo',res);
      return res;
    } catch (error) {
      throw new Error(`Error al insertar usuario: ${error.message}`);
    } finally {
      await this.dbConnection.connectClose(); // Cerrar la conexión en el bloque finally
    }
  }
}

module.exports = inicioSesionModel;
