import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    habitList:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Habit"
    }],
    memberSince:{
        type:String,
        required:true
    },
    rank:{
        type:Number,
        required: true
    },
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }],
    totalPoints:{
        type:Number,
        default:0
    }
},{
    timestamps:true
});

const User = mongoose.model('User',userSchema);

export default User;