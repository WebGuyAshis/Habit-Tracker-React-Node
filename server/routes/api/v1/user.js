import express from "express";
import {createUser, createSession, createHabit} from '../../../controllers/userController.js'
let router = express.Router();

router.post('/create-user', createUser);
router.post('/create-session',createSession);
router.post('/create-habit', createHabit)
console.log("Redirect to Controller!");

export default router;