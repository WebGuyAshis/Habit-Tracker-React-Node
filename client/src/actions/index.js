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

export const createHabit = (habitData)=>{

    return{
        type:"CREATE_HABIT",
        payload: habitData,
    }
}


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