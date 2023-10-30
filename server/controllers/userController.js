import User from "../model/User.js";
import passport from 'passport';
import cookieParser from "cookie-parser";


export const createUser = async (req, res) => {
  try {
    if (req.body.password !== req.body.cnfPassword) {
      return res.status(400).json({
        error: "Passwords do not match",
        message: "The provided password and confirm password do not match.",
      });
    }
    let userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(409)
        .json({ "error": "User already registered!",
    "message":"User with this Email already Exists!" });
    }

    let user = await User.create(req.body);
    if (user) {
      return res.status(200).json({ "message": "User Created Successfully!" });
    }
  } catch (error) {
    console.log("Error while registering User!", error);
    return res.status(500).json({ "error": "Error while registering User!" });
  }
};

//  async (req, res) => {
//   try {
//     let user = await User.findOne({ email: req.body.email });
//     if (!user) {
//       return res.status(404).json({ "error": "Please Create Account!" });
//     }

//     if (user.password === req.body.password) {
//       return res.status(200).json({ "message": "Sign In Successfull!" });
//     }
//     return res
//       .status(401)
//       .json({ "error": "Password mismatch. Authentication failed." });
//   } catch (error) {
//     console.log("Error while Signin In User!", error);
//     return res.status(500).json({ "message": "Error while Signin In User!" });
//   }
// };
export const createSession =
(req, res, next) => {
  passport.authenticate('local', (err, user, info) => {

    console.log("User From Controller", user);
    console.log("Info From Controller", info);

    if (err) {
      // Handle unexpected errors
      console.log("Internal server error");
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (!user) {
      // Authentication failed
      console.log("Authentication failed");
      return res.status(401).json({ message: 'Authentication failed' });
    }
    req.logIn(user, (loginErr) => {
      if (loginErr) {
        console.log("Login error!",loginErr);
        return res.status(500).json({ message: 'Login error' });
      }
      // Authentication successful
      console.log("Authentication successful");
      let userData = {
        id:user._id,
        name:user.name,
        email:user.email
      }
      console.log("Cookie:", );
      return res.status(200).json({ message: 'Authentication successful', userData });
    });
  })(req, res, next);
};

export const createHabit = async()=>{
    console.log("Will Create Later");
}