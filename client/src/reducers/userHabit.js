let initialState = [];

const userHabitData = (state = initialState,action)=>{
    switch (action.type) {
        case "USER_HABIT":
            return [...action.payload];
        default:
            return state;
    }
}


export default userHabitData;