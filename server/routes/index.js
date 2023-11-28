import express from "express";
import api from './api/index.js';
import passport from "passport";

let router = express.Router();

// router.get('/', (req,res)=>{
//     return res.status(200).json({mesaage:"Server is Running on port 8080!"})
// })
router.use('/api', api)

export default router;