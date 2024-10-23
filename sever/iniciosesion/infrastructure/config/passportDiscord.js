const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;

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

// Discord Strategy
passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: '/inicioSesion/discord/callback',
      scope: ['identify', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
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
