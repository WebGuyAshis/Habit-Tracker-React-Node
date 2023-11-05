import express from "express";
import {createUser, createSession, createHabit,fetch_habits, delete_habit} from '../../../controllers/userController.js'
let router = express.Router();

router.post('/create-user', createUser);
router.post('/create-session',createSession);

router.post('/create-habit', createHabit)
router.get('/fetch_habits/:userId',fetch_habits)
router.get('/delete-habit/:habitId', delete_habit)
console.log("Redirect to Controller!");

export default router;