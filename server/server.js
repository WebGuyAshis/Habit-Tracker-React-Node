import express, { urlencoded } from "express";
import cors from "cors";
import db from "./config/mongoose.js";
import route from "./routes/index.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

// Using Passport js
import passport from "passport";
import passportLocal from "./config/passport-local-strategy.js";

const app = express();

// app.use(cors());

const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend URL
  credentials: true,
};

app.use(cors(corsOptions));

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
      maxAge: 24 * 60 * 60 * 1000, // 1 day=============
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
    const {_id,name,email} = req.user;
    const userData = {
        _id,
        name,
        email
    }
    console.log("User had active Session!");
    res.status(200).send(userData);
  } else {
    // console.log("User dont have active Session:", userData);
    res.status(401).json({ error: "User session not found" });
  }
});

app.use("/", route);

app.listen(8080, (err) => {
  if (err) {
    console.log("Error Connecting to Server! ", err);
    return;
  }
  console.log("Successfully Connected to Port : 8080!");
});
