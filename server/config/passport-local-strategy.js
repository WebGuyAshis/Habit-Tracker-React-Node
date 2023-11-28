import passport from "passport";
// import LocalStrategy from 'passport-local';
import { Strategy as LocalStrategy } from "passport-local";
import User from "../model/User.js";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      User.findOne({ email: email })
        .then((user) => {
          console.log("User:", user);
          if (!user || user.password !== password) {
            console.log("Invalid Username/Password");
            return done(null, false);
          }
          console.log("Return Done");
          return done(null, user);
        })
        .catch((err) => {
          console.log("Error finding User!!", err);
          return done(err);
        });
    }
  )
);

// Serialize user

passport.serializeUser((user, done) => {
  console.log("User from Serialize", user);
  console.log("Serialize the user");
  return done(null, user.id);
});

// Deserialize user

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      if (!user) {
        return done(null, false);
      }
      console.log("User Deserialized");

      return done(null, user);
    })
    .catch((err) => {
      console.log("Error finding User!!");
      return done(err);
    });
});

// check user authentication

passport.checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // User is authenticated, continue to the next middleware or route
  }
  return res.status(401).json({ message: "Not Authenticated" });
};

passport.setAuthenticatedUser = function (req, res, next) {
  console.log("Set Authenticated User to Views");
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};
export default passport;
