import React, { useState } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Progress, Select } from "antd";

import "./habitDetail.styles.css";
const HabitDetail = () => {
    // For Ant D chart
    const [percent, setPercent] = useState(0);
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
    return (
        <div className="habitDetail-container">
            <div className="back-icon">
                Back
            </div>
            <div className="habit-details">
                <h1>Habit Name</h1>
                <div className="habit-detail-cat-time">
                    <div className="habit-time-anytime">AnyTime</div>
                    <div className="habit-time-everyday">Everyday</div>
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
                            {/* <Progress percent={percent} /> */}
                            <Progress type="circle" percent={percent} format={() => percent === 0 ? "Not Started" : percent === 100 ? "Done" : `${percent}%`} />
                        </div>
                        {/* <Button.Group style={{textAlign:"center"}}>5 */}
                        <Button onClick={decline} icon={<MinusOutlined />} />
                        <span>Completed: 0/10</span>
                        <Button onClick={increase} icon={<PlusOutlined />} />
                        {/* </Button.Group> */}

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
                        <div className="previous-day">
                            <h3 className="previous-date">
                                31st October, 2023
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

                        <div className="previous-day">
                            <h3 className="previous-date">
                                31st October, 2023
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

                        <div className="previous-day">
                            <h3 className="previous-date">
                                31st October, 2023
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

                    </div>
                </div>
                <div className="delete-habit">
                    Delete Habit
                </div>
            </div>
        </div>
    );
};

export default HabitDetail;
