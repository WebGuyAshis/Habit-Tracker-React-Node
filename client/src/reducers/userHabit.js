let initialState = [];

const userHabitData = (state = initialState,action)=>{
    console.log("UserHabits from Reducerasjdksajdksa:", action.payload);
    switch (action.type) {
        case "USER_HABIT":
            return [...action.payload];
        default:
            return state;
    }
}


export default userHabitData;