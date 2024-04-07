const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/oauth2/google/fail", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate.",
  });
});
router.get("/oauth2/google/success", (req, res) => {
  if (req.user) {
    console.log("User is authenticated: ", req.user.id);
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies,
    });
  }
});

router.get(
  "/oauth2/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/oauth2/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("http://localhost:5173/login/oauth2/google/success");
  }
);

router.get("/logout", async (req, res, next) => {
  req.logout();

  res.clearCookie("sessionNEK");
  req.session.destroy();
  console.log("User has logged out");
  res.status(200).json({
    success: true,
    message: "User has logged out",
  });
});

module.exports = router;
