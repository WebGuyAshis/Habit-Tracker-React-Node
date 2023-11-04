let initialState = [];

const userHabitData = (state = initialState,action)=>{
    switch (action.type) {
        case "USER_HABIT":
            console.log("UserHabits from Reducerasjdksajdksa:", action.payload);
            return [...action.payload];
        default:
            return state;
    }
}


export default userHabitData;