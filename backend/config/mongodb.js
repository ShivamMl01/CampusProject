import mongoose from 'mongoose';



const connectDb =  async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`);
            
    
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit process with failure
    }

    console.log("MongoDB connection function executed");

};export default connectDb;