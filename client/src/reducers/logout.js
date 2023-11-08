let initialState = null;

const logoutUser = (state = initialState,action)=>{
    switch (action.type) {
        case "LOGOUT_USER":
            console.log("Logout Function from Reducer:", action.payload);
            return action.payload
    
        default:
            return state;
    }
}

export default logoutUser;