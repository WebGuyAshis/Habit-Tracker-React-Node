import React, { useEffect, useState } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Progress, Select } from "antd";

import "./habitDetail.styles.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const HabitDetail = () => {
    const navigate = useNavigate();
    console.log("Go back to home!!!!!!!!!!!!!!!!!!!!!!!!!");
    // navigate("/user/home");
    const selectedHabitData = useSelector((state)=>state.selectedHabitDetail)
    const [percent, setPercent] = useState(0);

    useEffect(()=>{
        console.log("After Refresh Data:",selectedHabitData);
        console.log("typer of", typeof(selectedHabitData));
        if(!selectedHabitData){
            console.log("Navigate to home");
            navigate("/user/home");
        }     
    },[])
    

    if (!selectedHabitData) {
        return null;
    }

    console.log("Selected Habit Dataasdsadaqw:",selectedHabitData);
    // For Ant D chart
    const increase = () => {
        setPercent((prevPercent) => {
            const newPercent = parseFloat((prevPercent + 100 / 7).toFixed(2));
            if (newPercent > 100) {
                return 100;
            }
            return newPercent;
        });
    };
    const decline = () => {
        setPercent((prevPercent) => {
            const newPercent = prevPercent - 10;
            if (newPercent < 0) {
                return 0;
            }
            return newPercent;
        });
    };

    let baseUrl = 'http://127.0.0.1:8080'
    const deleteHabit= async(habitId)=>{
        try {
            let response = await axios.get(`${baseUrl}/api/v1/user/delete-habit/${habitId}`)

        if(response.status === 200){
            console.log("Successfully Deleted Habit!");
            navigate('/user/home');
        }
        } catch (error) {
            console.log("Error Deleting Habit!");
        }
    }

    return (
        <div className="habitDetail-container">
            <div className="back-icon">
                Back
            </div>
            <div className="habit-details">
                <h1>{selectedHabitData.habitName}</h1>
                    <p>TOdays Date</p>
                <div className="habit-detail-cat-time">
                    <div className="habit-time-anytime">{selectedHabitData.habitTimeOptions}</div>
                    <div className="habit-time-everyday">{selectedHabitData.habitRepeat}</div>
                </div>

                <div className="habit-details-records">
                    <div className="current-streak habit-records-data">
                        <h3>Current Streak</h3>
                        <h1>0</h1>
                        <span>Best Streak: 0</span>
                    </div>

                    <div className="habit-finished habit-records-data">
                        <h3>Habit Finished</h3>
                        <h1>0</h1>
                        <span>This Week: 0</span>
                    </div>

                    <div className="completion-rate habit-records-data">
                        <h3>Completition Rate</h3>
                        <h1>100%</h1>
                        <span>1/1 habits</span>
                    </div>
                </div>

                <div className="todays-completition-stats">
                    <h2>Habit Progress</h2>
                    <div className="habit-completion-graph">
                        <div
                            style={{
                                marginBottom: 10,
                                textAlign: "center",
                            }}
                        >
                            <Progress type="circle" percent={percent} format={() => percent === 0 ? "Not Started" : percent === 100 ? "Done" : `${percent}%`} />
                        </div>
                        <Button onClick={decline} icon={<MinusOutlined />} />
                        <span>Completed: 0/10</span>
                        <Button onClick={increase} icon={<PlusOutlined />} />

                        <div className="mark-current-task-complete" onClick={() => {
                            setPercent(100);
                        }}>
                            Mark As Complete
                        </div>
                    </div>
                </div>

                <div className="previous-data">
                    <h2>Previous Habit Record</h2>
                    <div className="previous-record">

                        {selectedHabitData ? selectedHabitData.prevRecord.map((prevDays,index)=>{
                            return(
                                <div className="previous-day" key={index}>
                            <h3 className="previous-date">
                                {prevDays.date}
                            </h3>
                            <div className="previous-habit-status-cont">
                                Status:
                                <Select
                                    defaultValue="None"
                                    className="previous-habit-status"
                                >
                                    <Select.Option value="Done">Done</Select.Option>
                                    <Select.Option value="Not Done">Not Done</Select.Option>
                                    <Select.Option value="None">None</Select.Option>
                                </Select>
                            </div>

                        </div>
                            )
                        }):<h1>Not Found! or Error</h1>}
                    </div>
                </div>
                <div className="delete-habit" onClick={()=>{deleteHabit(selectedHabitData._id)}}>
                    Delete Habit
                </div>
            </div>
        </div>
    );
};

export default HabitDetail;
