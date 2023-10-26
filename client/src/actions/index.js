export const incHabitTarget = ()=>{
    return{
        type:"INCREMENT"
    }
}

export const decHabitTarget = ()=>{
    return{
        type:"DECREMENT"
    }
}

// For Habit Creation
export const createHabit = (habitData)=>{

    return{
        type:"CREATE_HABIT",
        payload: habitData,
    }
}
// Opening Closing habit dialogue box
export const openCreateHabit = ()=>{
    console.log("Open Box");

    return {
        type: "OPEN_CREATE_HABIT"
    }
}

export const closeCreateHabit = ()=>{
    console.log("Close BOx");
    return {
        type: "CLOSE_CREATE_HABIT"
    }
}

// Login Logout
export const userLogin = (user)=>{
    return{
        type: "LOGIN",
        payload:user
    }
}

export const userLogout = ()=>{
    return{
        type:"LOGOUT"
    }
}