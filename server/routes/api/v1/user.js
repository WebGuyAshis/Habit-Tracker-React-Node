import express from "express";
import {createUser, createSession} from '../../../controllers/userController.js'
let router = express.Router();

router.post('/create-user', createUser);
router.post('/create-session',createSession);
console.log("Redirect to Controller!");

export default router;