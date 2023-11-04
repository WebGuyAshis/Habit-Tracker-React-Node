let initialState = null;

const userHabits = (state = initialState, action) => {
    console.log("Lets see our Saved Function", action.payload);
    switch (action.type) {
        case "FETCH_HABITS_FUNCTION":
            console.log("Lets see our Normal Saved Function", action.payload);
            return action.payload;
        default:
            console.log("Lets see our Default Saved Function", state);
            return state;
    }
};

export default userHabits;
