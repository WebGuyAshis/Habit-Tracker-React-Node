import express from "express";
import {user} from '../../../controllers/userController.js'
let router = express.Router();

router.post('/create-user', user);
console.log("Redirect to Controller!");

export default router;