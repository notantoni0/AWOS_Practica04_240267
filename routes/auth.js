const router = require('express').Router();
const passport = require('passport');

// Estrategia Facebook
const FacebookStrategy = require('passport-facebook').Strategy;
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.CALLBACK_URL}/facebook/callback`,
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));

// Estrategia GitHub (similar para otras)
const GitHubStrategy = require('passport-github2').Strategy;
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${process.env.CALLBACK_URL}/github/callback`
  },
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));

// Estrategia Discord
const DiscordStrategy = require('passport-discord').Strategy;
passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: `${process.env.CALLBACK_URL}/discord/callback`,
    scope: ["identify", "email"],
  },
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));

// strategy twitter
const TwitterStrategy = require('@superfaceai/passport-twitter-oauth2');
passport.use(new TwitterStrategy({
    clientID: process.env.TWITTER_CLIENT_ID,
    clientSecret: process.env.TWITTER_CLIENT_SECRET,
    callbackURL: `${process.env.CALLBACK_URL}/twitter/callback`,
  },
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));

// strategy linkedin
const LinkedInStrategy = require('passport-linkedin-oath2').Strategy;
passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: `${process.env.CALLBACK_URL}/linkedin/callback`,
    scope: ["r_liteprofile", "r_emailaddress"]
  },
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));

// Serialización de usuario
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Rutas de autenticación
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => { res.redirect('/profile'); }
);

router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => { res.redirect('/profile'); }
);

// ruta d discordd
router.get('/auth/discord', passport.authenticate('discord'));
router.get('/auth/discord/callback',
  passport.authenticate('discord', { failureRedirect: '/' }),
  (req, res) => { res.redirect('/profile'); }
);

// ruta d twitter
router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/' }),
  (req, res) => { res.redirect('/profile'); }
);

// ruta d linkedin
router.get('/auth/linkedin', passport.authenticate('linkedin'));
router.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/' }),
  (req, res) => { res.redirect('/profile'); }
);

// Agregar rutas similares para LinkedIn, Twitter, Discord

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

module.exports = router;