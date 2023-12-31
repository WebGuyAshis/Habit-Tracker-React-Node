import React, { useEffect, useState, useRef } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Progress, Select } from "antd";

import "./habitDetail.styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userHabits } from "../../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import PrevDays from "./PrevDays";
import { getConfig } from "../../config.js";

const HabitDetail = () => {
    let baseUrl = getConfig();

    const [totalFinished, setTotalFinished] = useState(0);
    const [weekFinished, setWeekFinished] = useState(0);
    const [finishedPercent, setFinishedPercent] = useState(0);

    // const [targetCompleted, setTargetCompleted] = useState(0);
    let timeOutRef = useRef(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selectedHabitData = useSelector((state) => state.selectedHabitDetail);

    console.log("Go back to home!!!!!!!!!!!!!!!!!!!!!!!!!");

    let totalIterationCount = selectedHabitData
        ? selectedHabitData.habitGoalDurationNum > 0
            ? selectedHabitData.habitGoalDurationNum
            : selectedHabitData.habitGoalCount
        : 0;

    // To Change values as per the progress will implemet later

    // let currentStatus = "None";

    // let [currentStatus,setCurrentStatus] = useState("None")
    //     useEffect(()=>{
    //         if(selectedHabitData){
    //             if(selectedHabitData.prevRecord[0].status === "Done"){
    //             setChangeVal(100)
    //         }

    //         if(selectedHabitData.prevRecord[0].countCompleted === totalIterationCount){
    //             setCurrentStatus("Done");
    //         }
    //         if(selectedHabitData.prevRecord[0].countCompleted > 0){
    //             setCurrentStatus("Not Done")
    //         }
    //         }
    //     },[])
    // navigate("/user/home");
    let [changeVal, setChangeVal] = useState(
        selectedHabitData && selectedHabitData.prevRecord[0].countCompleted
    );
    let [changeStatus, setChangeStatus] = useState(
        selectedHabitData && selectedHabitData.prevRecord[0].status
    );
    console.log("CHange Val:", changeVal);
    let chartValue = 0;
    if (
        selectedHabitData &&
        (selectedHabitData.habitGoalCount > 0 ||
            selectedHabitData.habitGoalDurationNum > 0)
    ) {
        chartValue = Math.round(
            (selectedHabitData.prevRecord[0].countCompleted / totalIterationCount) *
            100
        );
    }
    if (selectedHabitData && selectedHabitData.prevRecord[0].status === "Done") {
        chartValue = 100;
    }

    const [percent, setPercent] = useState(chartValue); //For antd Chart

    useEffect(() => {
        console.log("After Refresh Data:", selectedHabitData);
        console.log("typer of", typeof selectedHabitData);
        if (!selectedHabitData) {
            console.log("Navigate to home");
            navigate("/user/home");
        }
        if (selectedHabitData) {
            calculateFinishedCount();
            calculateFinishedPercent();
        }
    }, [selectedHabitData]);

    // Add each
    // useEffect(() => {
    //     if (selectedHabitData) {
    //         if (percent === 0) {
    //             changeTaskStatus(selectedHabitData.prevRecord[0]._id, "None");
    //         } else if (percent === 100) {
    //             changeTaskStatus(selectedHabitData.prevRecord[0]._id, "Done");
    //         } else {
    //             changeTaskStatus(selectedHabitData.prevRecord[0]._id, "Not Done");
    //         }
    //     }
    // }, [percent]);

    // To Update Habit Completed Count after sometime when user completes the clicking did like this to handle ultiple function call and multiple time hitting same route so this will basically update only the fainal value after 3.5s
    // useEffect(() => {
    //     if (selectedHabitData) {
    //         // clearTimeout(timeOutRef.current);

    //         // timeOutRef.current = setTimeout(() => {
    //             // Will Handle Api Call
    //             let id = selectedHabitData.prevRecord[0]._id;
    //             console.log("---------------------------------------------------------------");
    //             console.log("Data For Change:", );
    //             console.log(changeVal,totalIterationCount);

    //             let status =
    //                 changeVal === totalIterationCount
    //                     ? "Done"
    //                     : changeVal === 0
    //                         ? "None"
    //                         : "Not Done";
    //             console.log("sending for updation:", id, status, changeVal);
    //             changeTaskStatus(id, status, changeVal);

    //             console.log("Hola");
    //         // }, 1000);
    //     }
    // }, [changeVal]);
    useEffect(() => {
        console.log("Hello");
        if (selectedHabitData) {
            if (changeVal === totalIterationCount) {
                console.log(
                    "Data For Updation:",
                    selectedHabitData.prevRecord[0]._id,
                    "Done",
                    changeVal
                );
                changeTaskStatus(
                    selectedHabitData.prevRecord[0]._id,
                    "Done",
                    changeVal
                );
                setChangeStatus("Done");
            } else if (changeVal === 0) {
                console.log(
                    "Data For Updation:",
                    selectedHabitData.prevRecord[0]._id,
                    "None",
                    changeVal
                );
                changeTaskStatus(
                    selectedHabitData.prevRecord[0]._id,
                    "None",
                    changeVal
                );
                setChangeStatus("None");
            } else {
                console.log(
                    "Data For Updation:",
                    selectedHabitData.prevRecord[0]._id,
                    "Not Done",
                    changeVal
                );
                changeTaskStatus(
                    selectedHabitData.prevRecord[0]._id,
                    "Not Done",
                    changeVal
                );
                setChangeStatus("Not Done");
            }
        }
        // const updateHabit = () => {

        return;
        //   };
    }, [changeVal]);

    if (!selectedHabitData) {
        return null;
    }

    console.log("Selected Habit Dataasdsadaqw:", selectedHabitData);
    // For Ant D chart

    const increase = () => {
        setChangeVal((prevValue) => {
            if (prevValue === totalIterationCount) {
                console.log("Target Completed!-------------~~!!!!!!!!!!!");

                return totalIterationCount;
            }
            return prevValue + 1;
        });

        // updateHabit();

        setPercent((prevPercent) => {
            const newPercent = parseFloat(
                (prevPercent + 100 / totalIterationCount).toFixed(2)
            );
            if (newPercent > 99) {
                return 100;
            }
            return newPercent;
        });
    };
    const decline = () => {
        setChangeVal((prevValue) => {
            if (prevValue === 0) {
                // changeTaskStatus(selectedHabitData.prevRecord[0]._id,"None",0)

                return 0;
            }
            return prevValue - 1;
        });

        // updateHabit();
        // if(changeVal > 0 && changeVal < totalIterationCount){
        //     console.log("Data befire updation:",selectedHabitData.prevRecord[0]._id,"Not Done",changeVal);
        //     changeTaskStatus(selectedHabitData.prevRecord[0]._id,"Not Done",changeVal)
        // }else{
        //     console.log("Data befire updation:",selectedHabitData.prevRecord[0]._id,"None",changeVal);
        //     changeTaskStatus(selectedHabitData.prevRecord[0]._id,"None",0)
        // }
        setPercent((prevPercent) => {
            const newPercent = parseFloat(
                (prevPercent - 100 / totalIterationCount).toFixed(2)
            );
            if (newPercent < 1) {
                return 0;
            }

            return newPercent;
        });
    };

    const deleteHabit = async (habitId) => {
        try {
            let response = await axios.get(
                `${baseUrl}/api/v1/user/delete-habit/${habitId}`
            );

            if (response.status === 200) {
                console.log("Successfully Deleted Habit!");
                navigate("/user/home");
            }
        } catch (error) {
            console.log("Error Deleting Habit!");
        }
    };

    // Lets Update/Change Status of Tasks
    async function changeTaskStatus(prevHabitId, status, totalCount = 0) {
        console.log("Previous Habit Id:", prevHabitId, status);

        try {
            let updateData = { prevHabitId, status, totalCount };
            const response = await axios.post(
                `${baseUrl}/api/v1/user/habitupdate/${selectedHabitData._id}`,
                updateData
            );
            if (response.status === 200) {
                console.log("Habit Updated Successfully!!", response.data);
                // Updating the stored redux
                // dispatch(selectedHabitDetail(response.data));
                // Updating myHbaits
                if (response.data) {
                    dispatch(userHabits(response.data));
                }
            }
            // calculateFinishedCount()
        } catch (error) {
            console.log("Error Updating Habit!");
        }
        // Update Finished Tasks Count
        return;
    }

    async function calculateFinishedCount() {
        if (selectedHabitData) {
            let count = 0;
            let lastSeven = 0;
            // selectedHabitData.prevRecord.forEach((prevDays)=>{
            //     if(prevDays.status === "Done");
            //     count += 1;
            // })
            let prevRecords = [...selectedHabitData.prevRecord];
            for (let i = 0; i < prevRecords.length; i++) {
                if (i < 7 && prevRecords[i].status === "Done") {
                    lastSeven += 1;
                }
                if (prevRecords[i].status === "Done") {
                    count += 1;
                }
            }

            setTotalFinished(count);
            setWeekFinished(lastSeven);
        }
    }
    // let finishedPercent = 0;
    function calculateFinishedPercent() {
        if (selectedHabitData) {
            let totalHabitDays = selectedHabitData.prevRecord.length;
            let finished = selectedHabitData.prevRecord.filter(
                (days) => days.status === "Done"
            );
            let percent = parseFloat(
                (finished.length / totalHabitDays) * 100
            ).toFixed(2);
            console.log("Percent:", percent, totalHabitDays, finished.length);
            setFinishedPercent(percent);
        }
    }
    return (
        <div className="habitDetail-container">
            <div
                className="back-btn-icon"
                onClick={() => {
                    // To go back we can use -1
                    navigate(-1);
                }}
            >
                <FontAwesomeIcon icon={faArrowLeft} />
                <span>Back</span>
            </div>
            <div className="habit-details">
                <h1>{selectedHabitData.habitName}</h1>
                <p className="habit-detail-current-date">
                    {selectedHabitData.prevRecord[0].date}
                </p>
                <div className="habit-detail-cat-time">
                    <div className="habit-time-anytime">
                        {selectedHabitData.habitTimeOptions}
                    </div>
                    <div className="habit-time-everyday">
                        {selectedHabitData.habitRepeat}
                    </div>
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
                        <span>
                            {totalFinished}/{selectedHabitData.prevRecord.length} Days
                        </span>
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
                            <Progress
                                type="circle"
                                percent={percent}
                                format={() =>
                                    percent === 0
                                        ? "Not Started"
                                        : percent === 100
                                            ? "Done"
                                            : `${percent}%`
                                }
                            />
                        </div>
                        {/* If there is nop Goal count then therer is no need to show increase decrease
             */}
                        {(selectedHabitData.habitGoalDurationNum > 0 ||
                            selectedHabitData.habitGoalCount > 0) && (
                                <div className="complete-task-count">
                                    Completed:
                                    <div>
                                        <Button
                                            onClick={decline}
                                            icon={<MinusOutlined />}
                                            className="dec-count-btn"
                                        />
                                        <span>
                                            {changeVal}/
                                            {selectedHabitData && selectedHabitData.habitGoalCount > 0
                                                ? selectedHabitData.habitGoalCount
                                                : selectedHabitData.habitGoalDurationNum}
                                        </span>
                                        <Button
                                            onClick={increase}
                                            icon={<PlusOutlined />}
                                            className="inc-count-btn"
                                        />
                                    </div>
                                </div>
                            )}
                        {/* <div
                            className="mark-current-task-complete"
                            onClick={() => {
                                setPercent(100);
                                changeTaskStatus(selectedHabitData.prevRecord[0]._id, "Done");
                            }}
                        >
                            Mark As Complete
                        </div> */}

                        <div className="current-task-status">
                            Status:
                            <Select
                                defaultValue={
                                    changeStatus
                                        ? changeStatus
                                        : "Fetching..."
                                }
                                className="todays-habit-status"
                                onChange={(value) => {
                                    value === "Done" ? setPercent(100) : setPercent(0);
                                    value === "Done" && setChangeVal(totalIterationCount);
                                    console.log(
                                        "Data For Updation Status:",
                                        selectedHabitData.prevRecord[0]._id,
                                        value,
                                        value === "None" ? 0 : changeVal
                                    );
                                    changeTaskStatus(
                                        selectedHabitData.prevRecord[0]._id,
                                        value,
                                        value === "None" ? 0 : changeVal
                                    );
                                }}
                            >
                                <Select.Option value="Done">Done</Select.Option>
                                <Select.Option value="Not Done">Not Done</Select.Option>
                                <Select.Option value="None">None</Select.Option>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="previous-data">
                    <h2>Previous Habit Record</h2>
                    <div className="previous-record">
                        {selectedHabitData ? (
                            selectedHabitData.prevRecord.map((prevDays, index) => {
                                if (index > 0) {
                                    return (
                                        <PrevDays
                                            prevDays={prevDays}
                                            key={index}
                                            totalIterationCount={totalIterationCount}
                                        />
                                    );
                                    // Will make sure that latest task should not be present in the list of previous days
                                    // return (
                                    //     <div className="previous-day" key={index}>
                                    //         <div className="prev-record-data">
                                    //         <h3 className="previous-date">{prevDays.date}</h3>
                                    //         <div className="previous-habit-status-cont">
                                    //             Status:
                                    //             <Select
                                    //                 defaultValue={prevDays.status}
                                    //                 className="previous-habit-status"
                                    //                 onChange={(value) => {
                                    //                     changeTaskStatus(prevDays._id, value);
                                    //                 }}
                                    //             >
                                    //                 <Select.Option value="Done">Done</Select.Option>
                                    //                 <Select.Option value="Not Done">
                                    //                     Not Done
                                    //                 </Select.Option>
                                    //                 <Select.Option value="None">None</Select.Option>
                                    //             </Select>
                                    //         </div>
                                    //         </div>

                                    //         <div className="prevrecord-antDProgress">
                                    //         <Progress type="circle" percent={100} className="antD-progress"/>
                                    //         </div>
                                    //     </div>
                                    // );
                                }
                            })
                        ) : (
                            <h1>Not Found! or Error</h1>
                        )}
                    </div>
                </div>
                <div
                    className="delete-habit"
                    onClick={() => {
                        deleteHabit(selectedHabitData._id);
                    }}
                >
                    Delete Habit
                </div>
            </div>
        </div>
    );
};

export default HabitDetail;
