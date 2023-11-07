import { useDispatch, useSelector } from "react-redux";
import { selectedHabitDetail, userHabits } from "../../../actions";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "antd";
import './habit.styles.css'
import { useEffect, useState } from "react";
import axios from "axios";
const Habit =({ habit, imgSrc })=>{

    const myHabits = useSelector((state)=>state.userHabitData)
    const dispatch = useDispatch();
    const navigate = useNavigate();
// To show habit details on click
    const showHabitDetails = (habitId) => {
        let selectedHabit = myHabits.filter((habit) => habit._id === habitId);
        console.log("Selected Habit:", selectedHabit[0]);
        dispatch(selectedHabitDetail(selectedHabit[0]));
    
        navigate("/user/habit-detail");
      };

      const [isChecked, setIsChecked] = useState(habit.prevRecord[0].status === "Done");

      useEffect(()=>{
        let tempStatus = habit.prevRecord[0].status === "Done"
        setIsChecked(tempStatus);
        console.log("My Habits--------After Update!", myHabits);
      },[])
      let baseUrl = 'http://127.0.0.1:8080'

      async function changeHabitStatus(habitId){
        let status = habit.prevRecord[0].status;
        let prevHabitId = habit.prevRecord[0]._id;
        status === "Done"? status="None": status = "Done"
        console.log("Previous Habit Id:", habitId, status);

        try {
            let updateData = {prevHabitId, status }
            const response = await axios.post(`${baseUrl}/api/v1/user/habitupdate/${habit._id}`, updateData);
            if(response.status === 200){
                setIsChecked(!isChecked);
                console.log("Habit Updated Successfully!!", response.data);
                // Updating the stored redux 
                // dispatch(selectedHabitDetail(response.data));
                dispatch(userHabits(response.data))
            }            // calculateFinishedCount()
        } catch (error) {
            console.log("Error Updating Habit!");
        }
// Update Finished Tasks Count
        return;
      }

    return (
        <div
          className="habit-list-items"
        >
          <div className="habit-data" onClick={() => {
            showHabitDetails(habit._id);
          }}>
            <img className="habit-img" src={imgSrc} alt="" />
            <div className="habit-detail">
              <h5>{habit.habitName}</h5>
              <span>08:00AM</span>
            </div>
          </div>
          <Checkbox className="habit-status" checked={isChecked} onChange={()=>{
            changeHabitStatus(habit._id)
          }} />
        </div>
      );
}

export default Habit;