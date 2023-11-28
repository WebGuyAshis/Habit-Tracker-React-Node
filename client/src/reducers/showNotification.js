let initialState = null;

const showNotification = (state = initialState, action)=>{
    switch (action.type) {
        case "SHOW_NOTIFICATION":
            return action.payload
    
        default:
            return state;
    }
}

export default showNotification;