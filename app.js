const express = require("express");
const app = express();
const cors = require("cors");
const port = 4000;
const mongoose = require("mongoose");
const key = require("./keys/keys.js");
const User = require("./models/user-Schema.js");
const googleRoute = require("./authRoute/authGogoleRoute.js");
const passport = require("passport");
const GoogleStrategy = require("./configs/authGoogle_config.js");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "session",
    key: "sessionNEK",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/login", googleRoute);

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
