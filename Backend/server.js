import express from "express";
import cors from "cors";
import "dotenv/config";
import { connect } from "mongoose";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoute.js";
import helmet from "helmet";
import logger from "./utils/logger.js";

//App Config
const app = express();
app.use(helmet());
const port = process.env.PORT||4000;
const allowedOrigins = [
    process.env.FRONTEND_URL,
    process.env.FRONTEND_PRODUCTION_URL,
    process.env.FRONTEND_ADMIN_URL
];
connectDB();
connectCloudinary();
// middlewares
app.use((req, res, next) => {
    if (req.originalUrl === "/api/order/webhook") {return next();}
    express.json()(req, res, next);
});
app.use(cors({origin: allowedOrigins}));

//api endpoints
app.use("/api/user",userRouter);
app.use("/api/product",productRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);
app.get("/",(req,res)=>{res.send("API Working");})

logger.info("Server Started");
app.listen(port,()=>console.log("PORT STARTED"));