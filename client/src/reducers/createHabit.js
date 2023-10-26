const initialState =  []; // Initialize the state as an empty array

const createHabit = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_HABIT":
      // Append the new habit object to the array
      return [...state, action.payload];

    default:
      return state;
  }
};

export default createHabit;

