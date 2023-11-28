let initialState = null;

const logoutUser = (state = initialState,action)=>{
    switch (action.type) {
        case "LOGOUT_USER":
            return action.payload
    
        default:
            return state;
    }
}

export default logoutUser;