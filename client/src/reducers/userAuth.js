let initialState = {
    user:null
}

const userAuth = (state=initialState, action)=>{
    console.log("Reducer:", action.payload);
    switch (action.type) {
        case "LOGIN":
            return {...state, user:action.payload}
        
        case "LOGOUT":
            return{...state, user:null}
        default:
            return state;
    }
}

export default userAuth;