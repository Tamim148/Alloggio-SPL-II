// passport-config.js

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from './models/User.js';
passport.serializeUser((user, done) => {
  // serialize user to store in session
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // deserialize user from session
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: '1021321517117-6npji70d3r50634vc9d6tjri5of58gs2.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:8800/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in the database based on Google ID
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          // User already exists, return the user
          return done(null, user);
        }

        // User doesn't exist, create a new user
        user = await User.create({
          username: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          isAdmin: false,   // Set to false for new users
          verified: true,   // Set to true for new users
        });

        // Return the newly created user
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
