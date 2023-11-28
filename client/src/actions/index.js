export const createHabit = (habitData) => {
  return {
    type: "CREATE_HABIT",
    payload: habitData,
  };
};
// Opening Closing habit dialogue box
export const openCreateHabit = () => {

  return {
    type: "OPEN_CREATE_HABIT",
  };
};

export const closeCreateHabit = () => {
  return {
    type: "CLOSE_CREATE_HABIT",
  };
};

// Login Logout
export const userLogin = (user) => {
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
  return {
    type: "USER_HABIT",
    payload: userHabit,
  };
};

export const selectedHabitDetail = (habitDetail) => {
  return {
    type: "SELECTED_HABIT_DETAIL",
    payload: habitDetail,
  };
};


export const fetchUserHabitsFunction = (func)=>{
    return{
        type: "FETCH_HABITS_FUNCTION",
        payload: func
    }
}



// Show Notification

export const showNotification = (func)=>{
  return{
    type:"SHOW_NOTIFICATION",
    payload: func
  }
}


export const logoutUser = (func)=>{

  return {
    type:"LOGOUT_USER",
    payload: func
  }
}