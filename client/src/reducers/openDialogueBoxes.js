let initialState = false;

const openDialogueBoxes = (state=initialState, action)=>{
    console.log("Action BOXES:", action);
    switch (action.type) {
        case "OPEN_CREATE_HABIT":
            return true;
    
        case "CLOSE_CREATE_HABIT":
            return false;

        default:
            return state;
    }
}


export default openDialogueBoxes;