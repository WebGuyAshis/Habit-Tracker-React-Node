import express from "express";
import userRoute from './user.js'
import passport from "passport";
import { checkLogin } from "../../../controllers/checkLogin.js";
let router = express.Router();

// router.get('/',passport.checkAuthentication, (req,res)=>{
//     // console.log("Connected");
//     if (!req.isAuthenticated()) {
//         // If the user is not authenticated, redirect them to the login page
//         return res.redirect('/login');
//       }
// console.log("Hola");
// return res.status(200).send(req.user)
// })

// router.get('/',passport.checkAuthentication, checkLogin)

router.use('/user',userRoute)

export default router;