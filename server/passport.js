const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const db = require("./models");
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/apis/auth/google/callback",
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
              // role: "USER",
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
