// const passport = require('passport');

// const LocalStrategy = require('passport-local').Strategy;

// const User = require('../model/User');

import passport from "passport";
import LocalStrategy from 'passport-local';
import User from "../model/User.js";

passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function(email, password, done){
        User.findOne({email:email})
        .then((user)=>{
            console.log("User:",user);
            if(!user || user.password !== password){
                console.log("Invalid Username/Password");
                return done(null,false);
            }
            console.log("Return Done");
            return done(null, user)
        })
        .catch((err)=>{
            console.log("Error finding User!!",err);
            return done(err);
        });
    }
));

// Serialize user

passport.serializeUser((user,done)=>{
    console.log("User from Serialize", user);
    console.log("Serialize the user");
    return done(null, user._id);
})

// Deserialize user

passport.deserializeUser((id,done)=>{
    User.findById(id)
        .then((user)=>{
            if(!user){
                return done(null,false);
            }
            return done(null,employee);
        })
        .catch((err)=>{
            console.log("Error finding User!!");
            return done(err);
        })
});


// check user authentication

passport.checkAuthentication = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/authorization');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user; 
    }
    next();
}

// module.exports = passport
export default passport;