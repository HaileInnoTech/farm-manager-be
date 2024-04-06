const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/oauth2/google", passport.authenticate("google"));

router.get(
  "/oauth2/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "<h1>Failed to login</h1>",
    successRedirect: "<h1>Successfully logged in</h1>",
  })
);

module.exports = router;
