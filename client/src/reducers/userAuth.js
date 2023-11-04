// let initialState = {
//     user:null
// }

let initialState = null

const userAuth = (state=initialState, action)=>{
    console.log("Reducer---------------------------------------------:", action.payload);
    switch (action.type) {
        case "LOGIN":
            console.log("Logging User In:", action.payload);
            return action.payload
        
        case "LOGOUT":
            return null

        case "USER_DATA":
            console.log("Setting USer Data****:", action.payload);
            return action.payload
        default:
            console.log("Default User Auth", state);
            return state;
    }
}

export default userAuth;