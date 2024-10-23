const express = require('express');

const InicioSesionController = require('../controllers/inicioSesionController'); // Importa el controlador de autenticación.
const InicioSesionValidator = require('../validator/inicioSesionValidator');

// enrutador de Express para manejar las rutas específicas de autenticación.
const router = express.Router();
const inicioSesionController = new InicioSesionController();
const inicioSesionValidator = new InicioSesionValidator();

router.get('/', (req, res) => {
  res.send('¡Bienvenido a ruraqMaki! inicioSesion');
});

// Ruta para validar la sesión
router.get('/check', (req, res) => {
  inicioSesionController.checkSession(req, res);
});

// Define la ruta para iniciar sesión mediante sesión Express.
router.post('/sessionLogin', inicioSesionValidator.validatorSessionLogin(), (req, res) =>
  inicioSesionController.sessionLogin(req, res)
);

// Ruta para cerrar sesión
router.get(
  '/logout',
  // checkApiVersion('1.0.0'),
  (req, res) => inicioSesionController.logout(req, res)
);

// Exporta el enrutador para que pueda ser utilizado en otras partes de la aplicación.
module.exports = router;
