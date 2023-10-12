import express from "express";
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/',(req,res)=>{
    res.json({message:"Successfully Connected!"})
})

app.get('/api', (req,res)=>{
    res.send("React Node Bridge Established!")
})

app.listen(8080, (err)=>{
    if(err){
        console.log("Error Connecting to Server! ",err);
        return;
    }
    console.log("Successfully Connected to Port : 8080!");
})