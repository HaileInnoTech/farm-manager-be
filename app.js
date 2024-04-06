const express = require("express");
const app = express();
const cors = require("cors");
const port = 4000;
const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");
const key = require("./keys/keys.js");
const User = require("./models/user-Schema.js");
const googleRoute = require("./authRoute/authGogoleRoute.js");
const passport = require("passport");
const GoogleStrategy = require("./configs/authGoogle_config.js");
var cookieSession = require("cookie-session");

app.use(passport.initialize());
app.use(
  cookieSession({
    name: "session",
    keys: key.session_key,
    resave: false,
    saveUninitialized: false,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);
app.use(cors());
app.use("/login", googleRoute);

const client = new MongoClient(key.mongodb_uri);
//connect to mongoDB
client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

// Connect to MongoDB
mongoose
  .connect(key.mongoose_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const newUser = new User({ first_name: "Hai", email: "hai28022002@gmail.com" });
User.findOne({ email: newUser.email })
  .exec()
  .then((user) => {
    if (user) {
      console.log("User exists");
    } else {
      newUser
        .save()
        .then(() => console.log("User saved"))
        .catch((err) => console.error("Error saving user:", err));
    }
  })
  .catch((err) => console.error("Error finding user:", err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
