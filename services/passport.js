const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: keys.googleCallBackUrl,
    },
    (accessToken, refreshToken, profile, done) => {
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //     return cb(err, user);
      //   });
      User.findOne({ googleId: profile.id })
        .then((existingUser) => {
          if (existingUser) {
            //user exists
            return done(null, existingUser);
          } else {
            new User({ googleId: profile.id })
              .save()
              .then((user) => done(null, user));
            //.catch((e) => done(err, null));
          }
        })
        .catch((e) => console.log(e));
    }
  )
);
