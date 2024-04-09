var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const key = require("../keys/keys.js");
const User = require("../models/user-Schema.js");

passport.use(
  new GoogleStrategy(
    {
      clientID: key.google.web.client_id,
      clientSecret: key.google.web.client_secret,
      callbackURL: "/login/oauth2/google/redirect",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ google_id: profile.id }).catch(
        (err) => {
          console.log(err);
        }
      );

      if (user) {
        console.log("User is found: ", user.id);
        req.user = user;
        done(null, user);
      } else {
        const newUser = new User({
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          email: profile._json.email,
          google_id: profile.id,
          avatar: profile.photos[0].value,
        });
        await newUser.save().then((user) => {
          console.log("New user created: ", user);
          req.user = user;
          done(null, user);
        });
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("Serializing user: ", user);
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      console.log("Deserializing user: ", user);
      done(null, user);
    })
    .catch((e) => {
      done(new Error("Failed to deserialize an user"));
    });
});
