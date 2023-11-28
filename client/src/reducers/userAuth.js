let initialState = null

const userAuth = (state=initialState, action)=>{
    switch (action.type) {
        case "LOGIN":
            return action.payload
        
        case "LOGOUT":
            return null

        case "USER_DATA":
            return action.payload
        default:
            return state;
    }
}

export default userAuth;