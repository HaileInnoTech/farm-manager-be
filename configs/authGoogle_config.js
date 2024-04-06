var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20");
const key = require("../keys/keys.js");
const User = require("../models/user-Schema.js");

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((cookie, done) => {
  User.findById(cookie).then((user) => {
    done(null, user);
    console.log("User is: ", user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: key.google.web.client_id,
      clientSecret: key.google.web.client_secret,
      callbackURL: "/login/oauth2/google/redirect",
      scope: ["profile", "email"],
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ google_id: profile.id }).then((currentUser) => {
        if (currentUser) {
          console.log("User is: ", currentUser.id);
        } else {
          const user = new User({
            first_name: profile.name.givenName,
            last_name: profile.name.familyName,
            email: profile._json.email,
            google_id: profile.id,
            avatar: profile.photos[0].value,
          });
          user.save().then((newUser) => {
            console.log("New user created: ", newUser);
            done(null, newUser);
          });
        }
      });
    }
  )
);
