import User from "../model/User.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import Habit from "../model/Habit.js";
// import Post from "../model/Post.js";
import Post from "../model/Post.js";

// Formatted Date
function getCurrentFormattedDate() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  // Function to add ordinal suffix to day (e.g., 1st, 2nd, 3rd, 4th)
  const getDayWithOrdinal = (day) => {
    if (day >= 11 && day <= 13) {
      return day + "th";
    }
    switch (day % 10) {
      case 1:
        return day + "st";
      case 2:
        return day + "nd";
      case 3:
        return day + "rd";
      default:
        return day + "th";
    }
  };
  const formattedDate = `${getDayWithOrdinal(day)} ${month} ${year}`;
  return formattedDate;
}

export const createUser = async (req, res) => {
  try {
    if (req.body.password !== req.body.cnfPassword) {
      return res.status(400).json({
        error: "Passwords do not match",
        message: "The provided password and confirm password do not match.",
      });
    }
    let userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(409).json({
        error: "User already registered!",
        message: "User with this Email already Exists!",
      });
    }
    let allUsers = await User.find();
    let rank = allUsers.length + 1;
    let memberSince = getCurrentFormattedDate();

    let newData = { ...req.body, rank, memberSince };
    let user = await User.create(newData);

    if (user) {
      return res.status(200).json({ message: "User Created Successfully!" });
    }
  } catch (error) {
    console.log("Error while registering User!", error);
    return res.status(500).json({ error: "Error while registering User!" });
  }
};

//  async (req, res) => {
//   try {
//     let user = await User.findOne({ email: req.body.email });
//     if (!user) {
//       return res.status(404).json({ "error": "Please Create Account!" });
//     }

//     if (user.password === req.body.password) {
//       return res.status(200).json({ "message": "Sign In Successfull!" });
//     }
//     return res
//       .status(401)
//       .json({ "error": "Password mismatch. Authentication failed." });
//   } catch (error) {
//     console.log("Error while Signin In User!", error);
//     return res.status(500).json({ "message": "Error while Signin In User!" });
//   }
// };
export const createSession = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    console.log("User From Controller", user);
    console.log("Info From Controller", info);

    if (err) {
      // Handle unexpected errors
      console.log("Internal server error");
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!user) {
      // Authentication failed
      console.log("Authentication failed");
      return res.status(401).json({ message: "Authentication failed" });
    }
    req.logIn(user, (loginErr) => {
      if (loginErr) {
        console.log("Login error!", loginErr);
        return res.status(500).json({ message: "Login error" });
      }
      // Authentication successful
      console.log("Authentication successful");

      let userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        rank: user.rank,
        memberSince: user.memberSince,
        totalPoints: user.totalPoints,
      };
      console.log("Cookie:");
      return res
        .status(200)
        .json({ message: "Authentication successful", userData });
    });
  })(req, res, next);
};

export const createHabit = async (req, res) => {
  console.log("Will Create Later");

  try {
    console.log("Req.Body:", req.body);

    let habit = await Habit.create(req.body);
    console.log("Habit Created in Db:", habit);

    return res.status(200).json({ message: "Successfully Created Habit!" });
  } catch (error) {
    console.log("Error Creating task:", error);
    return res.status(500).json({ error: "  Internal Serever Error!" });
  }
};

export const fetch_habits = async (req, res) => {
  try {
    const userId = req.params.userId;
    const habits = await Habit.find({ habitUser: userId });

    if (habits) {
      // console.log("Found Habits of User!", habits);

      // Get today's formatted date
      const currentDate = getCurrentFormattedDate();

      for (const habit of habits) {
        // Check if today's date already exists in the prevRecord array
        const dateExists = habit.prevRecord.some(
          (record) => record.date === currentDate
        );

        if (!dateExists) {
          console.log("Date Doesnt Exists");
          // If today's date doesn't exist, add a new date field
          habit.prevRecord = [
            {
              date: currentDate,
              status: "Not Done",
            },
            ...habit.prevRecord,
          ];

          // Save the updated habit
          await habit.save();
        }
      }

      return res.status(200).send(habits);
    }
  } catch (error) {
    console.log("Error showing tasks!", error);
    return res.status(500).json({ error: "Error Fetching Songs!" });
  }
};

export const delete_habit = async (req, res) => {
  const habitId = req.params.habitId;
  console.log("Lets Delete Habit!");
  try {
    const deletedHabit = await Habit.findByIdAndDelete(habitId);
    if (deletedHabit) {
      console.log(
        "Successfully Deleted Habit and Previous data!",
        deletedHabit
      );
      return res
        .status(200)
        .json({ message: "Successfully Deleted Habit and Previous data!" });
    }
  } catch (error) {
    console.log("Error Deleting Habit!", error);
    return res.status(500).json({ error: "Error deleting Habit" });
  }
};

export const habit_update = async (req, res) => {
  const habitId = req.params.habitId;
  // here prevId is actually used for the date where we need to update
  // habit id is habits id and prevId is the todays or particular day where needs update

  const { prevHabitId, status, totalCount } = req.body;

  try {
    console.log(
      "Let's Update this Habit having Id:",
      habitId,
      "&&",
      prevHabitId,
      "&&",
      status,
      totalCount
    );

    // Find the habit by its ID
    const updateHabit = await Habit.findById(habitId);
    const userId = updateHabit.habitUser;
    const user = await User.findById(userId);
    let habits = await Habit.find({ habitUser:userId });
    
    if (!updateHabit || !user) {
      return res.status(404).json({ error: "Habit Not Found!" });
    }

    // Find the previous record to update (.id() mongoose method to find easily)
    const prevRecordToUpdate = updateHabit.prevRecord.id(prevHabitId);

    if (!prevRecordToUpdate) {
      return res.status(404).json({ error: "Previous Record Not Found!" });
    }

    console.log("Changed Data:", "Status:",prevRecordToUpdate.status, status, "Total:",prevRecordToUpdate.countCompleted, totalCount  );

    // Update the status

    if(prevRecordToUpdate.status === status && prevRecordToUpdate.countCompleted === totalCount ){//no changes made

      return res.status(200).json(habits)
    }

    if(prevRecordToUpdate.status !== status){
      if (status === "Done") {
        console.log("increaseing Points");
        user.totalPoints += 50;
        
      } else {
        if(user.totalPoints <= 0){
           user.totalPoints = 0;
        }
        else{
        console.log("Decreasing Points");
          user.totalPoints -= 50;
        }
      }
    }
    
    prevRecordToUpdate.status = status;
    prevRecordToUpdate.countCompleted = totalCount;
    // Save the habit document

    await updateHabit.save();
    await user.save();

    let updatedHabits = await Habit.find({ habitUser:userId });

    return res.status(200).json(updatedHabits);
  } catch (error) {
    console.log("Error Updating!", error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

export const userLogout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log("Error logging Out!", err);

      return res.status(500).json({ error: "Internal Server Error!" });
    }
    return res.status(200).json({ message: "Successfullly Logged Out!" });
  });
};

export const createPost = async (req, res) => {
  const { status, userId } = req.body;

  try {
    const post = await Post.create({
      postStatus: status,
      userData: userId,
    });
    if (post) {
      return res.status(200).send(post);
    }
  } catch (error) {
    console.log("Error Creating Post!");
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

export const fetchPosts = async (req, res) => {
  try {
    let allPosts = await Post.find()
      .populate("userData")
      .sort({ createdAt: -1 });

    return res.status(200).send(allPosts);
  } catch (error) {
    return res.status(500).json({ error: "Error Occurred while Fetching!" });
  }
};

export const fetchUserPoints = async (req, res) => {
  try {
    let users = await User.find();
    if (!users) {
      return res.status(404).json({
        error: "Error finding User!",
      });
    }
    let newArr = [...users];
    // This will basically sort the arr in descending order as per the totalpoints
    newArr.sort((a, b) => b.totalPoints - a.totalPoints);
    let sortedArr = newArr.map((user) => {
      return {
        name: user.name,
        totalPoints: user.totalPoints,
      };
    });
    return res.status(200).send(sortedArr);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};
