const express = require('express');
const session = require('express-session');

// carga de middlewares
const Varificacion = require('./iniciosesion/infrastructure/middleware/isAuthenticated');

// Carga de los Routers
const routerInicioSesion = require('./iniciosesion/application/routes/inicioSesionRouter');
const routerUsusarios = require('./usuarios/application/routes/userRoutes');

// Inicializar la app Express
const app = express();
app.use(express.json());

// Configura la sesión
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // Evita que el cliente acceda a la cookie
      secure: false, // Debe estar en true en producción si usas HTTPS
      maxAge: parseInt(process.env.EXPRESS_EXPIRE), // Tiempo de vida de la cookie (ejemplo: 1 minuto)
      // sameSite: 'None', // Permite compartir cookies entre diferentes dominios
    },
  })
);

// Inicialización de Passport.js para autenticación
app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.use("/usuarios", routerUsusarios); // Rutas para los usuarios
app.use("/inicioSesion", routerInicioSesion); // Rutas de inicio de sesión

// Configuración del servidor
const config = {
  port: process.env.EXPRESS_PORT,
  host: process.env.EXPRESS_HOST,
};

// Iniciar el servidor
app.listen(config.port, config.host, () => {
  console.log(`Servidor corriendo en http://${config.host}:${config.port}`);
});
