import mongoose from "mongoose";
import moment from "moment";

const habitSchema = new mongoose.Schema({
  habitName: {
    type: String,
    required: true,
  },
  habitCategory: {
    type: String,
    required: true,
  },
  habitRepeat: {
    type: String,
    required: true,
  },
  habitTimeOptions: {
    type: String,
    required: true,
  },
  habitGoalDurationNum: {
    type: Number,
    required: true,
  },
  habitGoalDurationFormmat: {
    type: String,
    required: true,
  },
  habitGoalCount: {
    type: Number,
    required: true,
  },
  habitAlert: {
    type: Boolean,
    required: true,
  },
  habitUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  prevRecord: {
    type: [
      {
        date: {
          type: String, // Store date as a string
          required: true,
        },
        status: {
          type: String,
          default: "Not Done",
        },
        countCompleted:{
          type:Number,
          default:0
        }
      },
    ],
    default: function () {
      const currentDate = moment();
      let dates = [];
      for (let i = 0; i < 7; i++) {
        // Subtract a day and format it as a string
        const formattedDate = currentDate
          .clone()
          .subtract(i, "days")
          .format("Do MMMM YYYY");
        dates.push({ date: formattedDate });
      }

      return dates;
    },
    required: true,
  },
},{
  timestamps:true
});

const Habit = mongoose.model("Habit", habitSchema);

export default Habit;
