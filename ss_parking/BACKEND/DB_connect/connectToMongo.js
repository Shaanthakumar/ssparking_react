import mongoose from "mongoose";

const connectToMongoDB = async ()=>
{
    try{
        await mongoose.connect("mongodb+srv://sanvanthjr:admin123@cluster0.011su.mongodb.net/ss_parking?retryWrites=true&w=majority&appName=Cluster0");
        console.log("DB Connection Successfull");
    }catch(error)
    {
        console.log("Error in Connecting MONGODB",error.message);
    }
}

export default connectToMongoDB;