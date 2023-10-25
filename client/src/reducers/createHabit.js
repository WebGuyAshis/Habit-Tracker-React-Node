// const initialState = {
//   habitName: "",
//   habitCategory: "Not Set",
//   habitRepeat: "Everyday",
//   habitTimeOptions: "Anytime",
//   habitGoal: "off",
//   habitGoalDurationNum: 0,
//   habitGoalDurationFormmat: "min",
//   habitGoalCount: 0,
//   habitAlert: true,
// };

// const createHabit = (state = initialState, action) => {
//     console.log("Action from reducer:",action);
//   switch (action.type) {
//     case "CREATE_HABIT": 
//     return {
//         ...state,
//         habitName: action.payload.habitName,
//         habitCategory: action.payload.habitCategory,
//         habitRepeat: action.payload.habitRepeat,
//         habitTimeOptions: action.payload.habitTimeOptions,
//         habitGoal: action.payload.habitGoal,
//         habitGoalDurationNum: action.payload.habitGoalDurationNum,
//         habitGoalDurationFormmat: action.payload.habitGoalDurationFormmat,
//         habitGoalCount: action.payload.habitGoalCount,
//         habitAlert: action.payload.habitAlert,
//       };

//     default:
//       return state;
//   }
// };

// export default createHabit;

const initialState = []; // Initialize the state as an empty array

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

