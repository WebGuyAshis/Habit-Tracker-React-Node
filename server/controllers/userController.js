export const user = (req,res)=>{
    console.log("Req.body:", req.body);
    res.status(200).json({message:"Data Received!"})
}