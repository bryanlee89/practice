const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  // console.log("I was called, i am from serializer", user)
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
    // console.log("I was called, i am from deserializer", id)
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      const existingUser = await User.findOne({ googleId: profile.id });
      // console.log('existinguser', existingUser);
      if (existingUser) {
        done(null, existingUser);
      } else {
        const user = await new User({
          googleId: profile.id
          // name: profile.name.givenName + " " + profile.name.familyName,
          // email: profile.emails[0].value
        }).save();
        done(null, user);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookAppID,
      clientSecret: keys.facebookAppSecret,
      callbackURL: "/auth/facebook/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ facebookId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      } else {
        const user = await new User({ facebookId: profile.id }).save();
        done(null, user);
      }
    }
  )
);
