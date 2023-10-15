import User from '../model/User.js'


export const createUser = async(req,res)=>{
    try {
        let userExists = await User.findOne({email:req.body.email});
        if(userExists){
           return res.status(409).json({ error: 'User with this email already exists.' });
        }

        let user = await User.create(req.body);
        if(user){
            return res.status(200).json({message:"User Created Successfully!"})
        }
    } catch (error) {
        console.log("Error while registering User!", error);
        return res.status(500).json({message:"Error while registering User!"})
    }
}

export const createSession = async (req,res)=>{
    try {
        let user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(404).json({ error: 'Please Create Account!' });
        }

        if(user.password === req.body.password){
            return res.status(200).json({message:"Sign In Successfull!"})
        }
        return res.status(401).json({error: "Password mismatch. Authentication failed."})
    } catch (error) {
        console.log("Error while Signin In User!", error);
        return res.status(500).json({message:"Error while Signin In User!"})
    }
}