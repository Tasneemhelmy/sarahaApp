import mongoose from "mongoose";

const connected=()=>{
    mongoose.connect(process.env.DB_CONNECTION).then(()=>{
        console.log("Connected to Database");
    }).catch(()=>{
        console.log("Error connecting to Database");
    })
    
}

export default connected