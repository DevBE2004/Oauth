const router = require("express").Router();
const passport = require("passport");
const ctrl = require("../controllers/auth");
require("dotenv").config;
router.get("/google", passport.authenticate("google", { session: false }));

router.get(
  "/google/callback",
  (req, res, next) => {
    passport.authenticate("google", (err, profile) => {
      req.user = profile;
      next();
    })(req, res, next);
  },
  (req, res) => {
    res.redirect(
      `${process.env.URL_CLIENT}/login-success/${req.user?.id}/${req.user.tokenUrl}`
    );
  }
);

router.get("/facebook", passport.authenticate("facebook", { session: false }));

router.get(
  "/facebook/callback",
  (req, res, next) => {
    passport.authenticate("facebook", (err, profile) => {
      req.user = profile;
      next();
    })(req, res, next);
  },
  (req, res) => {
    res.redirect(`${process.env.URL_CLIENT}/login-success/${req.user?.id}`);
  }
);
router.post("/loggin-success", ctrl.loginSuccess);

module.exports = router;
