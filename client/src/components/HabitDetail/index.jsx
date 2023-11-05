import React, { useEffect, useState } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Progress, Select } from "antd";

import "./habitDetail.styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectedHabitDetail } from "../../actions";
import axios from "axios";
const HabitDetail = () => {
    const [totalFinished, setTotalFinished] = useState(0);
const [weekFinished, setWeekFinished] = useState(0);
const [finishedPercent, setFinishedPercent] = useState(0)


    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log("Go back to home!!!!!!!!!!!!!!!!!!!!!!!!!");
    // navigate("/user/home");
    const selectedHabitData = useSelector((state)=>state.selectedHabitDetail)
    let chartValue = 0;
    if(selectedHabitData && selectedHabitData.prevRecord[0].status === "Done"){
        chartValue = 100;
    }

    const [percent, setPercent] = useState(chartValue);  //For antd Chart

    useEffect(()=>{
        console.log("After Refresh Data:",selectedHabitData);
        console.log("typer of", typeof(selectedHabitData));
        if(!selectedHabitData){
            console.log("Navigate to home");
            navigate("/user/home");
        } 
        if(selectedHabitData){
            calculateFinishedCount()
            calculateFinishedPercent()
        }    
    },[selectedHabitData])
    

    // Add each 

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

// Lets Update/Change Status of Tasks
    const changeTaskStatus = async(prevHabitId,status)=>{
        console.log("Previous Habit Id:", prevHabitId, status);

        try {
            let updateData = {prevHabitId, status}
            const response = await axios.post(`${baseUrl}/api/v1/user/habitupdate/${selectedHabitData._id}`, updateData);
            if(response.status === 200){
                console.log("Habit Updated Successfully!!", response.data);
                // Updating the stored redux 
                dispatch(selectedHabitDetail(response.data));
            }
            // calculateFinishedCount()
        } catch (error) {
            console.log("Error Updating Habit!");
        }
// Update Finished Tasks Count
        return;
    }

    async function calculateFinishedCount (){

        if(selectedHabitData){
            let count = 0;
            let lastSeven = 0;
            // selectedHabitData.prevRecord.forEach((prevDays)=>{
            //     if(prevDays.status === "Done");
            //     count += 1;
            // })
                let prevRecords = [...selectedHabitData.prevRecord]
            for(let i=0; i< prevRecords.length; i++){
                if(i<7 && prevRecords[i].status === "Done"){
                    lastSeven+=1;
                }
                if(prevRecords[i].status === "Done"){
                    count += 1;
                }
            }

            setTotalFinished(count);
            setWeekFinished(lastSeven);


        }
    }
    // let finishedPercent = 0;
    function calculateFinishedPercent(){
        if(selectedHabitData){
            let totalHabitDays = selectedHabitData.prevRecord.length;
            let finished = selectedHabitData.prevRecord.filter((days)=>days.status === "Done")
            let percent = parseFloat((finished.length/totalHabitDays)*100).toFixed(2);
            console.log("Percent:",percent, totalHabitDays,finished.length );
            setFinishedPercent(percent)
        }

    }
    return (
        <div className="habitDetail-container">
            <div className="back-icon">
                Back
            </div>
            <div className="habit-details">
                <h1>{selectedHabitData.habitName}</h1>
                    <p className="habit-detail-current-date">{selectedHabitData.prevRecord[0].date}</p>
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
                        <h1>{totalFinished}</h1>
                        <span>Last Seven Days:{weekFinished}</span>
                    </div>

                    <div className="completion-rate habit-records-data">
                        <h3>Completition Rate</h3>
                        <h1>{finishedPercent}%</h1>
                        <span>{totalFinished}/{selectedHabitData.prevRecord.length} Days</span>
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
                            changeTaskStatus(selectedHabitData.prevRecord[0]._id, "Done")
                        }}>
                            Mark As Complete
                        </div>
                    </div>
                </div>

                <div className="previous-data">
                    <h2>Previous Habit Record</h2>
                    <div className="previous-record">

                        {selectedHabitData ? selectedHabitData.prevRecord.map((prevDays,index)=>{
                            if(index > 0){  // Will make sure that latest task should not be present in the list of previous days
                                return(
                                    <div className="previous-day" key={index}>
                                <h3 className="previous-date">
                                    {prevDays.date}
                                </h3>
                                <div className="previous-habit-status-cont">
                                    Status:
                                    <Select
                                        defaultValue={prevDays.status}
                                        className="previous-habit-status"
                                        onChange={(value)=>{changeTaskStatus(prevDays._id, value )}}
                                    >
                                        <Select.Option value="Done">Done</Select.Option>
                                        <Select.Option value="Not Done">Not Done</Select.Option>
                                        <Select.Option value="None">None</Select.Option>
                                    </Select>
                                </div>
    
                            </div>
                                )
                            }
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
