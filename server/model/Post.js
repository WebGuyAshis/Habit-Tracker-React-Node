import mongoose from "mongoose";
import User from "./User.js";

const postSchema = new mongoose.Schema({
    postStatus:{
        type:String,
        required:true
    },
    userData: {
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    }
},{
    timestamps:true
})

const Post = mongoose.model("Post",postSchema);

export default Post;