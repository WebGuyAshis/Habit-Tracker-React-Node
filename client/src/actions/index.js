// export const incHabitTarget = ()=>{
//     return{
//         type:"INCREMENT"
//     }
// }

// export const decHabitTarget = ()=>{
//     return{
//         type:"DECREMENT"
//     }
// }

// For Habit Creation
export const createHabit = (habitData) => {
  return {
    type: "CREATE_HABIT",
    payload: habitData,
  };
};
// Opening Closing habit dialogue box
export const openCreateHabit = () => {
  console.log("Open Box");

  return {
    type: "OPEN_CREATE_HABIT",
  };
};

export const closeCreateHabit = () => {
  console.log("Close BOx");
  return {
    type: "CLOSE_CREATE_HABIT",
  };
};

// Login Logout
export const userLogin = (user) => {
  console.log("User From Actions:", user);
  return {
    type: "LOGIN",
    payload: user,
  };
};

export const userLogout = () => {
  return {
    type: "LOGOUT",
  };
};

export const setUserData = (userData) => {
  return {
    type: "USER_DATA",
    payload: userData,
  };
};

export const userHabits = (userHabit) => {
  console.log("User Habit from Action:", userHabit);
  return {
    type: "USER_HABIT",
    payload: userHabit,
  };
};

export const selectedHabitDetail = (habitDetail) => {
  console.log("Selected Habit Detail! actions", habitDetail);
  return {
    type: "SELECTED_HABIT_DETAIL",
    payload: habitDetail,
  };
};


export const fetchUserHabitsFunction = (func)=>{
    console.log("Function Recieved:", func);
    return{
        type: "FETCH_HABITS_FUNCTION",
        payload: func
    }
}