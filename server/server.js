import express, { urlencoded } from "express";
import cors from 'cors';

import route from './routes/index.js'

const app = express();

app.use(cors());
// we basically dont need urlencoded because we are parsing data usn=ing express.json
// app.use(urlencoded({extended:true}))
app.use(express.json())

// Setting route
app.use('/',route)

app.listen(8080, (err)=>{
    if(err){
        console.log("Error Connecting to Server! ",err);
        return;
    }
    console.log("Successfully Connected to Port : 8080!");
})