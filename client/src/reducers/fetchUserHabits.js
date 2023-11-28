let initialState = null;

const userHabits = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_HABITS_FUNCTION":
            return action.payload;
        default:
            return state;
    }
};

export default userHabits;
