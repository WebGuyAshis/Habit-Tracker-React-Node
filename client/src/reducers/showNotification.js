let initialState = null;

const showNotification = (state = initialState, action)=>{
    switch (action.type) {
        case "SHOW_NOTIFICATION":
            console.log("Showing Notification from reducer!", action.payload);
            return action.payload
    
        default:
            return state;
    }
}

export default showNotification;