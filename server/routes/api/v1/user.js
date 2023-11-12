import express from "express";
import {createUser, createSession, createHabit,fetch_habits, delete_habit, habit_update, userLogout, createPost, fetchPosts, fetchUserPoints} from '../../../controllers/userController.js'
let router = express.Router();

router.post('/create-user', createUser);
router.post('/create-session',createSession);

router.post('/create-habit', createHabit)
router.get('/fetch_habits/:userId',fetch_habits)
router.get('/delete-habit/:habitId', delete_habit)
router.post('/habitupdate/:habitId', habit_update)
router.get('/sign-out', userLogout);
router.post('/createPost', createPost)
router.get('/fetchPosts', fetchPosts);
router.get('/fetchUserPoints',fetchUserPoints)

console.log("Redirect to Controller!");

export default router;