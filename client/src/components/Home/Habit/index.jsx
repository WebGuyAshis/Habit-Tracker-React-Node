import { useDispatch, useSelector } from "react-redux";
import { selectedHabitDetail, userHabits } from "../../../actions";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "antd";
import "./habit.styles.css";
import { useEffect, useState } from "react";
import axios from "axios";
import coin from "../../../assets/images/coin.png";
const Habit = ({ habit, imgSrc }) => {
  const myHabits = useSelector((state) => state.userHabitData);
  const showNotification = useSelector((state) => state.showNotification);
  const activeUser = useSelector((state)=>state.userAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let baseUrl = "http://127.0.0.1:8080";
  // To show habit details on click
  const showHabitDetails = (habitId) => {
    let selectedHabit = myHabits.filter((habit) => habit._id === habitId);
    console.log("Selected Habit:", selectedHabit[0]);
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
    console.log("My Habits--------After Update!", myHabits);
  }, []);
  // Change STatus
  async function changeHabitStatus(habitId) {
    let status = habit.prevRecord[0].status;
    let prevHabitId = habit.prevRecord[0]._id;
    // let totalPoints = status==="Done" ?   ;
    status === "Done" ? (status = "None") : (status = "Done");
    console.log("Previous Habit Id:", habitId, status);

    try {
      let updateData = { prevHabitId, status };
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

      console.log("Error Updating Habit!");
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
