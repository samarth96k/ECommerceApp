import mongoose from "mongoose";
import logger from "../utils/logger.js";
const connectDB = async()=>{
    mongoose.connection.on("connected",()=>{
       logger.debug("DB Connected");
    });
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`);
}

export default connectDB;