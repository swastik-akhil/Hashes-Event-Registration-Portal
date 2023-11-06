const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/userModel");

const googleAuthOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_AUTH_CALLBACK_URL === "PRODUCTION" ?
    process.env.GOOGLE_AUTH_CALLBACK_URL_PRODUCTION :
    process.env.GOOGLE_AUTH_CALLBACK_URL_DEVELOPMENT
};

passport.use(new GoogleStrategy(googleAuthOptions, async (accessToken, refreshToken, profile, done) => {

  const email = profile.emails[0].value;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      done(null, existingUser);
    } else {
      const newUser = await User.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        profile_photo_url: profile.photos[0].value
      });

      done(null, newUser);
    }
  } catch (error) {
    console.error(`Error during Google OAuth: ${error}`);
    done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id); // Assuming user.id is unique and can be used to serialize
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
	done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
