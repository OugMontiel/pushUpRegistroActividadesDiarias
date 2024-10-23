const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const InicioSesionController = require('../../application/controllers/inicioSesionController');
const inicioSesionController = new InicioSesionController();

// Serializa el usuario para la sesión
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserializa el usuario de la sesión
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Github Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/inicioSesion/github/callback',
      scope: ['user:email'],
      state: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // console.log('Usuario de github:', profile);
        
        let { user, token } = await inicioSesionController.findOrCreate(profile);
        return done(null, { user, token });
      } catch (error) {
        console.log('Error en estrategia de Google:', error);
        return done(error);
      }
    }
  )
);

// Exportamos passport
module.exports = passport;
