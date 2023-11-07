let initialState = null;

const selectedHabitDetail = (state = initialState, action)=>{
    switch (action.type) {
        case "SELECTED_HABIT_DETAIL":
            console.log("Selected Habit Detail!", action.payload);
           return action.payload;
    
        default:
            return state;
    }
}


export default selectedHabitDetail;