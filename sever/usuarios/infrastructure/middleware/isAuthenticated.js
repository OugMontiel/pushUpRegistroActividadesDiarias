// middleware/isAuthenticated.js
module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // El usuario está autenticado, pasa al siguiente middleware o ruta
  }
  res.redirect('/login'); // Redirige si no está autenticado
};
