// Define las rutas de la aplicación y mapea las URLs a los controladores.
const express = require('express');

const UserController = require('../controllers/userController'); // Importa el controlador
const UserValidator = require('../validator/userValidator'); // Importa el validador

// enrutador de Express para manejar las rutas específicas de autenticación.
const router = express.Router(); // Crea un enrutador de Express que manejará las sub rutas específicas para la ruta /users
const insUserController = new UserController(); // Instancia el controlador de usuarios
const insUserValidator = new UserValidator(); // Instancia el validador de usuarios

// Define la ruta para crear un nuevo usuario.
router.post('/', insUserValidator.validateUserData(), (req, res) =>
  insUserController.createUser(req, res)
);

router.get('/', (req, res) => {
  res.send('¡Bienvenido a ruraqMaki! User');
});

// Define la ruta para obtener un usuario por ID.
router.get('/:id', insUserValidator.validateUserId(), (req, res) =>
  insUserController.getUser(req, res)
);


// Define la ruta para actualizar un usuario por ID.
router.put('/:id', insUserValidator.validateUserUpdateById(), (req, res) =>
  insUserController.updateUser(req, res)
);

// Define la ruta para eliminar un usuario por ID.
router.delete('/:id', insUserValidator.validateUserId(), (req, res) =>
  insUserController.deleteUser(req, res)
);

module.exports = router; 
