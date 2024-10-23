const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const InicioSesionController = require('../../application/controllers/inicioSesionController');
const inicioSesionController = new InicioSesionController();

// Serializa el usuario para la sesión
passport.serializeUser((user, cb) => {
  // console.log('adnsalkjkjnasdn ', user);
  cb(null, user);
});

// Deserializa el usuario de la sesión
passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/inicioSesion/google/callback',
      scope: ['profile', 'email'],
    },
    async (accessToken, refreshToken, profile, cb) => {
      // console.log("Usuario de google:",profile)
      try {
        // Llamamos a findOrCreate para obtener el usuario y el token
        let { user, token } = await inicioSesionController.findOrCreate(profile);

        // Retorna el usuario (puedes agregar el token también si lo necesitas en el callback)
        return cb(null, { user, token });
      } catch (error) {
        console.log('Error en estrategia de Google:', error);
        return cb(error);
      }
    }
  )
);

// Exportamos passport
module.exports = passport;
