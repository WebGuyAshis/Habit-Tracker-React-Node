import React, { useState,useEffect } from "react";
import "./createTask.styles.css";
import { CloseOutlined } from "@ant-design/icons";

import {useSelector,useDispatch} from "react-redux";
import { createHabit } from "../../actions";

import { Button, Input, InputNumber, Select, Switch } from "antd";
import { closeCreateHabit } from "../../actions";
import axios from 'axios';

const CreateTask = () => {

    // const userData = useSelector((state)=>state.userAuth)
    const fetchUserHabits = useSelector((state)=>state.userHabits)
    const activeUser = useSelector((state)=>state.userAuth);


    console.log("hola hola--------------",activeUser);
    // const createBoxState = useSelector((state)=> state.openDialogueBoxes);
    const dispatch = useDispatch()
    let [localhabitData, setlocalHabitData] = useState({
        habitUser:activeUser._id,
        habitName: "",
        habitCategory: "Not Set",
        habitRepeat: "Everyday",
        habitTimeOptions: "Anytime",
        habitGoal: "off",
        habitGoalDurationNum: 0,
        habitGoalDurationFormmat: "min",
        habitGoalCount: 0,
        habitAlert: true,
    });
    // const habitDataState = useSelector((state)=>state.createHabit)
    // const closeCreateBox = useSelector((state)=>state.closeCreateHabit)

    // useEffect(() => {
    //     console.log("Updated Habit Data:", habitDataState);
    //   }, [habitDataState]);

    const handleFormSubmission = async(e) => {
        e.preventDefault();
        // setlocalHabitData({...localhabitData,habitUser:4567})
        console.log("Meowwww");
        dispatch(createHabit(localhabitData))
        console.log("Meowwww2222222");

        dispatch(closeCreateHabit());

        // Saving data in DB
        let baseUrl = "http://localhost:8080";

        try{
            let response = await axios.post(
                `${baseUrl}/api/v1/user/create-habit`,
                localhabitData
            );
                if(response.status===200){
                    console.log("Habit Saved in Database!");
                    console.log("User Habits Fetch::::", fetchUserHabits);
                    console.log("Active USer Before Refresh:", activeUser);
                    fetchUserHabits()
                    return;
                }

        }catch(error){
            console.log("Error Saving HabitData to database!", error);
            return;
        }
    };

    const handleInputChange = (name, value) => {
        // Need to handle like this because antd select tags dont send event directly we need to send it using Form.item but it is not optimised under screen width 575px it automatically switches layout and other libraries are prettyu much boring so Im using antd and my custom design and little bit manual code
        setlocalHabitData({...localhabitData, [name]:value})
    };
    return (
        <div className="createTask-container">
            <div className="createTask-body">
                <h1>Create Habit</h1>
                {/* Cross Icon */}
                <CloseOutlined className="close-create_box" onClick={()=>{dispatch(closeCreateHabit())}}/>
                <form onSubmit={handleFormSubmission}>
                    {/* Habit name */}
                    <div className="form-item">
                        <label htmlFor="habit-name-input" className="form-item-label">
                            Habit Name:
                        </label>
                        <Input
                            className="form-data"
                            id="create-habit-name"
                            name="habitName"
                            onChange={(e) => {
                                handleInputChange(e.target.name, e.target.value);
                            }}
                            required
                        />
                        {/* <input type="text" className="form-data" id="create-habit-name" name="habitName" onChange={(value)=>{handleInputChange("habitName", value)}} /> */}
                    </div>
                    {/* </Form.Item> */}

                    {/* Category */}
                    <div className="form-item">
                        <label htmlFor="habit-name-input" className="form-item-label">
                            Category:
                        </label>
                        <Select
                            defaultValue="Select"
                            id="create-select-category"
                            className="form-data"
                            name="habitCategory"
                            onChange={(value) => {
                                handleInputChange("habitCategory", value);
                            }}
                        >
                            <Select.Option value="Not Set">Select</Select.Option>
                            <Select.Option value="Sports">Sports</Select.Option>
                            <Select.Option value="School">School</Select.Option>
                            <Select.Option value="Work">Work</Select.Option>
                        </Select>
                    </div>

                    {/* Repeat Habit */}

                    {/* <Form.Item className="form-item" label="Repeat Habit"> */}
                    <div className="form-item">
                        <label
                            htmlFor="repHabit"
                            className="form-item-label"
                            name="habitRepeat"
                        >
                            Repeat:
                        </label>
                        <Select
                            defaultValue="Select"
                            id="create-select-repHabit"
                            className="form-data"
                            name="habitRepeat"
                            onChange={(value) => {
                                handleInputChange("habitRepeat", value);
                            }}
                        >
                            <Select.Option value="Everyday">Everyday</Select.Option>
                            <Select.Option value="Weekly">Weekly</Select.Option>
                        </Select>
                    </div>
                    {/* </Form.Item> */}

                    <div className="will-do-at">
                        <label htmlFor="repHabit" className="form-item-label">
                            Habit Time:
                        </label>
                        <div className="time-options-container">
                            <div
                                className="time-options"
                                onClick={() => {
                                    handleInputChange("habitTimeOptions", "Anytime");
                                }}
                            >
                                Anytime
                            </div>
                            <div
                                className="time-options"
                                onClick={() => {
                                    handleInputChange("habitTimeOptions", "Morning");
                                }}
                            >
                                <img
                                    src="https://cdn-icons-png.flaticon.com/128/2402/2402907.png"
                                    alt=""
                                    className="morning"
                                />
                                Morning
                            </div>
                            <div
                                className="time-options"
                                onClick={() => {
                                    handleInputChange("habitTimeOptions", "afternoon");
                                }}
                            >
                                <img
                                    src="https://cdn-icons-png.flaticon.com/128/11175/11175473.png"
                                    alt=""
                                    className="Afternoon"
                                />
                                Afternoon
                            </div>
                            <div
                                className="time-options"
                                onClick={() => {
                                    handleInputChange("habitTimeOptions", "evening");
                                }}
                            >
                                <img
                                    src="https://cdn-icons-png.flaticon.com/128/7687/7687113.png"
                                    alt=""
                                    className="Evening"
                                />
                                Evening
                            </div>
                        </div>
                    </div>

                    {/* Goal */}
                    <div className="form-item">
                        <label htmlFor="create-goal" className="form-item-label">
                            Goal:
                        </label>
                        <Select
                            defaultValue="Off"
                            id="create-goal"
                            className="form-data"
                            name="habitGoal"
                            onChange={(value) => {
                                handleInputChange("habitGoal", value);
                            }}
                        >
                            <Select.Option value="off">Off</Select.Option>
                            <Select.Option value="duration">Duration</Select.Option>
                            <Select.Option value="count">Count</Select.Option>
                        </Select>
                    </div>
                    {/* If duration is selected */}

                    {localhabitData.habitGoal ==="duration" && (<div className="form-item">
                        <label htmlFor="create-duration" className="form-item-label">
                            Duration:
                        </label>
                        <InputNumber
                            defaultValue="0"
                            name="habitGoalDurationNum"
                            onChange={(value) => {
                                handleInputChange("habitGoalDurationNum", value);
                            }}
                            min="0"
                        />
                        <Select
                            defaultValue="min"
                            id="create-duration"
                            className="form-data"
                            name="habitGoalDurationFormmat"
                            onChange={(value) => {
                                handleInputChange("habitGoalDurationFormmat", value);
                            }}
                        >
                            <Select.Option value="min">Minute</Select.Option>
                            <Select.Option value="hour">Hour</Select.Option>
                        </Select>
                    </div>) }


                    {/* if Count is selected */}
                    {localhabitData.habitGoal==="count" && (
                        <div className="form-item">
                        <label htmlFor="create-count" className="form-item-label">
                            Count:
                        </label>
                        <InputNumber
                            defaultValue="0"
                            id="create-count"
                            name="habitGoalCount"
                            onChange={(value) => {
                                handleInputChange("habitGoalCount", value);
                            }}
                            min="0"
                        />
                    </div>
                    )}
                    
                    <div className="form-item">
                        <label htmlFor="create-alert" className="form-item-label">
                            Alert:{" "}
                        </label>
                        <Switch
                            defaultChecked
                            id="create-alert"
                            name="habitAlert"
                            onChange={(value) => {
                                handleInputChange("habitAlert", value);
                            }}
                        />
                    </div>
                    {/* </Form.Item> */}

                    <div className="create-btn">
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTask;
