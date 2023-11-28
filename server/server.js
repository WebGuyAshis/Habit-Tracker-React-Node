import express, { urlencoded } from "express";
import cors from "cors";
import db from "./config/mongoose.js";
import route from "./routes/index.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
// import path from 'path';
dotenv.config();

// Using Passport js
import passport from "passport";
import passportLocal from "./config/passport-local-strategy.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());

const corsOptions = {
  origin: "http://127.0.0.1:3000", // Replace with your frontend URL
  credentials: true,
};

// app.use(cors(corsOptions));

// we basically dont need urlencoded because we are parsing data usning express.json
// app.use(urlencoded({extended:true}))
app.use(cookieParser());
app.use(express.json());

app.use(
  session({
    name: "Habit_Tracker",
    secret: "I_need_a_job_so_can_fullFill_my_promises",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 2000, // 2 days
      // secure: true,
      // sameSite: "none",
      // domain: '.onrender.com',
    },
  })
);


// app.use((req, res, next) => {
//   console.log("Request Session ID:", req.sessionID);
//   console.log("Session Data:", req.session);
//   next();
// });

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Setting route
app.get("/protected-route", (req, res) => {
  if (req.isAuthenticated()) {
    const {_id,name,email,rank,memberSince,totalPoints} = req.user;
    const userData = {
        _id,
        name,
        email,
        rank,
        memberSince,
        totalPoints
    }
    console.log("User had active Session!");
    res.status(200).send(userData);
  } else {
    // console.log("User dont have active Session:", userData);
    res.status(401).json({ error: "User session not found" });
  }
});


app.use("/", route);

// const publicPath = join(__dirname, 'frontend', 'build');

// app.use(express.static(publicPath));

// app.get('*', (req, res) => {
//   res.sendFile(join(publicPath, 'index.html'));
// });

app.listen(8080, (err) => {
  if (err) {
    console.log("Error Connecting to Server! ", err);
    return;
  }
  console.log("Successfully Connected to Port : 8080!");
});
