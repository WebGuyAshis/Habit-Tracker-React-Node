let initialState = null;

const selectedHabitDetail = (state = initialState, action)=>{
    switch (action.type) {
        case "SELECTED_HABIT_DETAIL":
           return action.payload;
    
        default:
            return state;
    }
}


export default selectedHabitDetail;