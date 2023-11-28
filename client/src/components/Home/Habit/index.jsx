import { useDispatch, useSelector } from "react-redux";
import { selectedHabitDetail, userHabits } from "../../../actions";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "antd";
import "./habit.styles.css";
import { useEffect, useState } from "react";
import axios from "axios";
import coin from "../../../assets/images/coin.png";
import { Progress } from "antd";
import { getConfig } from "../../../config";

const Habit = ({ habit, imgSrc }) => {
  let baseUrl = getConfig();

  const myHabits = useSelector((state) => state.userHabitData);
  const showNotification = useSelector((state) => state.showNotification);
  const activeUser = useSelector((state) => state.userAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let totalIterationCount =
    habit.habitGoalDurationNum > 0
      ? habit.habitGoalDurationNum
      : habit.habitGoalCount;

  // To show habit details on click
  const showHabitDetails = (habitId) => {
    let selectedHabit = myHabits.filter((habit) => habit._id === habitId);
    dispatch(selectedHabitDetail(selectedHabit[0]));

    navigate("/user/habit-detail");
  };

  // Detecting Habit status and assigning it to the task
  const [isChecked, setIsChecked] = useState(
    habit.prevRecord[0].status === "Done"
  );

  useEffect(() => {
    let tempStatus = habit.prevRecord[0].status === "Done";
    setIsChecked(tempStatus);
  }, []);

  // Change STatus
  async function changeHabitStatus(habitId,totalCount = 0) {
    let status = habit.prevRecord[0].status;
    let prevHabitId = habit.prevRecord[0]._id;
    // let totalPoints = status==="Done" ?   ;
    // status === "Done" ? (status = "None") : (status = "Done");
    console.log("Previous Habit Id:", habitId, status);
    if(status === "Done"){
      status = "None";
      totalCount = 0;
    }else{
      status = "Done"
      totalCount = totalIterationCount
    }

    try {
      let updateData = { prevHabitId, status,totalCount };
      const response = await axios.post(
        `${baseUrl}/api/v1/user/habitupdate/${habit._id}`,
        updateData
      );
      if (response.status === 200) {
        setIsChecked(!isChecked);
        console.log("Habit Updated Successfully!!", response.data);
        // Updating the stored redux
        // dispatch(selectedHabitDetail(response.data));
        showNotification(
          "success",
          "Congratulations!",
          "Habit Updated Successfully!!!"
        );
        dispatch(userHabits(response.data));
      } // calculateFinishedCount()
    } catch (error) {
      showNotification(
        "error",
        "Oops Something Went Wrong!",
        "Habit Updation Failed!"
      );

      console.log("Error Updating Habit!",error);
    }
    // Update Finished Tasks Count
    return;
  }



  return (
    <div className="habit-list-items">
      <div
        className="habit-data"
        onClick={() => {
          showHabitDetails(habit._id);
        }}
      >
        <img className="habit-img" src={imgSrc} alt="" />
        <div className="habit-detail">
          <h5>{habit.habitName}</h5>
          <div className="habit-extra-det">
            <span>08:00AM</span>
            <img src={coin} alt="" className="habit-coin-symbol" />
            <span>+50</span>
          </div>
          <div className="show-habit-progress">
            <Progress
              percent={
                habit.prevRecord[0].status === "Done"?100:
                  totalIterationCount === 0
                  ? 0
                  : Math.round(
                    (habit.prevRecord[0].countCompleted /
                      totalIterationCount) *
                    100
                  )
              }
              size="small"
            />
          </div>
        </div>
      </div>
      <Checkbox
        className="habit-status"
        checked={isChecked}
        onChange={() => {
          changeHabitStatus(habit._id);
        }}
      />
    </div>
  );
};

export default Habit;
