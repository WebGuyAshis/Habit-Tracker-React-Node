import { Select, Progress } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { userHabits } from "../../../actions";
import axios from "axios";
import { useState } from "react";
import { getConfig } from "../../../config.js";


const PrevDays = ({prevDays, totalIterationCount}) => {
    let baseUrl = getConfig();

    const [dayPercent, setDayPercent] = useState(prevDays.status==="Done"?100: Math.round((prevDays.countCompleted/totalIterationCount)*100))
    const dispatch = useDispatch()
    const selectedHabitData = useSelector((state) => state.selectedHabitDetail);
    // const changeTaskStatus = useSelector((state)=>state.)
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
                console.log("Update the Status----------------------------------------------------------------------------");
                setDayPercent(status==="Done"?100: Math.round((prevDays.countCompleted/totalIterationCount)*100))
                dispatch(userHabits(response.data));
            }
            // calculateFinishedCount()
        } catch (error) {
            console.log("Error Updating Habit!");
        }
        // Update Finished Tasks Count
        return;
    }
    return (
        <div className="previous-day">
            <div className="prev-record-data">
                <h3 className="previous-date">{prevDays.date}</h3>
                <div className="previous-habit-status-cont">
                    Status:
                    <Select
                        defaultValue={prevDays.status}
                        className="previous-habit-status"
                        onChange={(value) => {
                            changeTaskStatus(prevDays._id, value);
                        }}
                    >
                        <Select.Option value="Done">Done</Select.Option>
                        <Select.Option value="Not Done">Not Done</Select.Option>
                        <Select.Option value="None">None</Select.Option>
                    </Select>
                </div>
            </div>

            <div className="prevrecord-antDProgress">
                <Progress type="circle" percent={dayPercent} className="antD-progress" />
            </div>
        </div>
    );
};

export default PrevDays;
