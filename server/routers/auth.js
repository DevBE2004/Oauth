const router = require("express").Router();
const passport = require("passport");
const ctrl = require("../controllers/auth");
require("dotenv").config;
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"], session: false })
);

router.get(
  "/google/callback",
  (req, res, next) => {
    passport.authenticate("google", (err, profile) => {
      req.user = profile;
      next();
    })(req, res, next);
  },
  (req, res, next) => {
    res.redirect(
      `${process.env.URL_CLIENT}/login-success/${req.user?.id}/${req.user.tokenUrl}`
    );
  }
);
router.post("/loggin-success", ctrl.loginSuccess);

module.exports = router;
