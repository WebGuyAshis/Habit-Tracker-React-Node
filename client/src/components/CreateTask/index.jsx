import React from "react";
import { CloseOutlined } from "@ant-design/icons";

// import { Select, Space } from "antd";
import {
    Button,
    // Cascader,
    // Checkbox,
    // DatePicker,
    Form,
    Input,
    InputNumber,
    //   Radio,
    Select,
    // Slider,
    Space,
    Switch,
    // TreeSelect,
    // Upload,
} from "antd";
import "./createTask.styles.css";
// import FormItem from "antd/es/form/FormItem";

const CreateTask = () => {
    return (
        <div className="createTask-container">
            <div className="createTask-body">
                <h1>Create Habit</h1>
                <CloseOutlined className="close-create_box" />
                <Form>

                    <div className="form-item">
                        <label htmlFor="habit-name-input" className="form-item-label">Habit Name:</label>
                        <Input className="form-data" id="create-select-category" />
                    </div>
                    {/* </Form.Item> */}

                    {/* Category */}
                    <div className="form-item">
                        <label htmlFor="habit-name-input" className="form-item-label">Category:</label>
                        <Select defaultValue="Select" id="create-select-category" className="form-data">
                            <Select.Option value="Select">Select</Select.Option>
                            <Select.Option value="Sports">Sports</Select.Option>
                            <Select.Option value="School">School</Select.Option>
                            <Select.Option value="Work">Work</Select.Option>
                        </Select>
                    </div>

                    {/* Repeat Habit */}

                    {/* <Form.Item className="form-item" label="Repeat Habit"> */}
                    <div className="form-item">
                        <label htmlFor="repHabit" className="form-item-label">Repeat:</label>
                        <Select defaultValue="Select" id="create-select-repHabit" className="form-data">
                            <Select.Option value="Select">Select</Select.Option>
                            <Select.Option value="Sports">Everyday</Select.Option>
                            <Select.Option value="School">Weekly</Select.Option>
                        </Select>
                    </div>
                    {/* </Form.Item> */}

                    <div className="will-do-at">
                        <label htmlFor="repHabit" className="form-item-label">Habit Time:</label>
                        <div className="time-options-container">
                            <div className="time-options">
                                <img src="" alt="" className="anytime" />
                                Anytime
                            </div>
                            <div className="time-options">
                                <img src="" alt="" className="morning" />
                                Morning
                            </div>
                            <div className="time-options">
                                <img src="" alt="" className="afternoon" />
                                Afternoon
                            </div>
                            <div className="time-options">
                                <img src="" alt="" className="evening" />
                                Evening
                            </div>
                        </div>
                    </div>


                    {/* Goal */}
                    <div className="form-item">
                        <label htmlFor="create-goal" className="form-item-label">Goal:</label>
                        <Select defaultValue="Off" id="create-goal" className="form-data">
                            <Select.Option value="off">Off</Select.Option>
                            <Select.Option value="duration">Duration</Select.Option>
                            <Select.Option value="count">Count</Select.Option>
                        </Select>
                    </div>

                    {/* If duration is selected */}
                    <div className="form-item">
                        <label htmlFor="create-duration" className="form-item-label">Duration:</label>
                        <InputNumber defaultValue= "0"/>
                        <Select defaultValue="min" id="create-duration" className="form-data">
                            <Select.Option value="min">Minute</Select.Option>
                            <Select.Option value="hour">Hour</Select.Option>
                        </Select>
                    </div>

                    {/* if Count is selected */}
                    <div className="form-item">
                        <label htmlFor="create-count" className="form-item-label">Count:</label>
                        <InputNumber defaultValue= "0" id="create-count"/>
                    </div>

                    {/* <Form.Item
                        className="form-item"
                        label="Alert:"
                        valuePropName="checked"
                    > */}
                    <div className="form-item">
                        <label htmlFor="create-alert" className="form-item-label">Alert: </label>
                        <Switch defaultChecked id="create-alert" />
                    </div>
                    {/* </Form.Item> */}

                    <div className="create-btn">
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default CreateTask;
