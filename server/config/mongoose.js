import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
// mongoose.connect("mongodb://localhost:27017/Habit_Tracker");
// mongoose.connect(process.env.mongoDBAtlas)

mongoose.connect('mongodb+srv://developerashis99:gSlbbzdGZMlhuLRb@cluster0.3m2ngtn.mongodb.net/Habit_Tracker')

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error Connecting Database"));
db.once('open',function(){
    console.log("Successfully Connected to Database!!");
});

export default db;