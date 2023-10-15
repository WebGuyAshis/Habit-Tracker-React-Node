import express from "express";
import userRoute from './user.js'

let router = express.Router();

router.get('/', (req,res)=>{
    console.log("Connected");
})

router.use('/user',userRoute)

export default router;