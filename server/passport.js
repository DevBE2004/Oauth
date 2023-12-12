const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const db = require("./models");
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/apis/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, cb) => {
      const tokenUrl = uuidv4();
      profile.tokenUrl = tokenUrl;
      try {
        if (profile) {
          await db.User.update({ tokenUrl }, { where: { id: profile.id } });
          await db.User.findOrCreate({
            where: { id: profile.id },
            defaults: {
              id: profile.id,
              name: profile.displayName,
              avatar: profile.photos[0].value,
              typeLogin: profile.provider,
              tokenUrl,
              email: profile._json.email,
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
      return cb(null, profile);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/apis/auth/facebook/callback",
      profileFields: ["email", "id", "displayName", "photos"],
      enableProof: true, // Thêm dòng này
      scope: ["email"], // Yêu cầu quyền truy cập email
    },
    async function (accessToken, refreshToken, profile, cb) {
      const tokenUrl = uuidv4();
      profile.tokenUrl = tokenUrl;
      try {
        if (profile) {
          await db.User.update({ tokenUrl }, { where: { id: profile.id } });
          await db.User.findOrCreate({
            where: { id: profile.id },
            defaults: {
              id: profile.id,
              name: profile.displayName,
              avatar: profile.photos[0].value,
              typeLogin: profile.provider,
              tokenUrl,
              email: profile._json.email,
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
      return cb(null, profile);
    }
  )
);
