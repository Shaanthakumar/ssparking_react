import mongoose from "mongoose";

const connectToMongoDB = async ()=>
{
    try{
        await mongoose.connect("mongodb://localhost:27017/trial");
        console.log("DB Connection Successfull");
    }catch(error)
    {
        console.log("Error in Connecting MONGODB",error.message);
    }
}

export default connectToMongoDB;