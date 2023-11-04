// // config/passportConfig.js
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const User = require("../models/userModel");

// const googleAuthOptions = {
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: process.env.GOOGLE_AUTH_CALLBACK_URL === "PRODUCTION" ?
//     process.env.GOOGLE_AUTH_CALLBACK_URL_PRODUCTION :
//     process.env.GOOGLE_AUTH_CALLBACK_URL_DEVELOPMENT
// };

// passport.use(new GoogleStrategy(googleAuthOptions, async (accessToken, refreshToken, profile, done) => {

//   const email = profile.emails[0].value;
//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     console.log(`user is ${existingUser}`);
//     done(null, existingUser);
//   }
//   else{
    
//   const user = await User.create({
//     name: profile.displayName,
//     email: profile.emails[0].value,
//     profile_photo_url : profile.photos[0].value
//   });
//   console.log(`user is ${user}`);
//   console.log(profile);
//   done(null, profile);
//   }

// }));

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((obj, done) => {
//   done(null, obj);
// });

// module.exports = passport;





// config/passportConfig.js
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
      console.log(`User already exists: ${existingUser}`);
      done(null, existingUser);
    } else {
      const newUser = await User.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        profile_photo_url: profile.photos[0].value
      });

      console.log(`New user created: ${newUser}`);
      console.log(profile);
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
    console.log(`Deserialized user: ${user}`);
	done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
