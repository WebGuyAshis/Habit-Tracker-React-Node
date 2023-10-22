import React from "react";
import { PlusOutlined } from "@ant-design/icons";

// import { Select, Space } from "antd";
import {
    Button,
    Cascader,
    Checkbox,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Slider,
    Space,
    Switch,
    TreeSelect,
    Upload,
} from "antd";
import "./createTask.styles.css";
import FormItem from "antd/es/form/FormItem";

const CreateTask = () => {
    return (
        <div className="createTask-container">
            <div className="createTask-body">
            <Form
            breakpoint={200}
      layout="horizontal"
      labelCol={{ span: 6 }} // Set the number of columns for the labe// Set the number of columns for the form control
    >
                    <Form.Item className="custom-form-style" label="Habit Name:" labelCol={{ span: 6 }}>
                        <Input />
                    </Form.Item>

                    <Form.Item  label="Category">
                        <Select>
                            <Select.Option value="Select">Select</Select.Option>
                            <Select.Option value="Sports">Sports</Select.Option>
                            <Select.Option value="School">School</Select.Option>
                            <Select.Option value="Work">Work</Select.Option>
                        </Select>

                    </Form.Item>
                    {/* Repeat Habit */}

                    <Form.Item label="Repeat Habit">
                        <Radio.Group>
                            <Radio value="everyday"> Everyday </Radio>
                            <Radio value="weekly"> Weekly </Radio>
                        </Radio.Group>
                    </Form.Item>

                    <div className="will-do-at">
                        <label htmlFor="habit-time">Will Do At</label>
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


                    <Form.Item label="Goal">
                        <Space wrap>

                            <Select id="goal"
                                defaultValue="Off"
                                style={{
                                    width: 120,
                                }}
                                allowClear
                                options={[
                                    {
                                        value: "off",
                                        label: "Off",
                                    },
                                    {
                                        value: "duration",
                                        label: "Duration",
                                    },
                                    {
                                        value: "count",
                                        label: "Count",
                                    },
                                ]}
                            />
                        </Space>
                    </Form.Item>

                    {/* If duration is selected */}

                    <Form.Item label="Duration">
                        <InputNumber />
                        <Space wrap>
                            <Select id="goal"
                                defaultValue="Minute"
                                style={{
                                    width: 120,
                                }}
                                allowClear
                                options={[
                                    {
                                        value: "min",
                                        label: "Minute",
                                    },
                                    {
                                        value: "hour",
                                        label: "Hour",
                                    },
                                ]}
                            />
                        </Space>
                    </Form.Item>

                    {/* if Count is selected */}
                    <Form.Item label="Count">
                        <InputNumber />
                    </Form.Item>

                    <Form.Item label="Alert:" valuePropName="checked">
                        <Switch />
                    </Form.Item>


                    <Form.Item label=" ">
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        </div>
    );
};

export default CreateTask;
