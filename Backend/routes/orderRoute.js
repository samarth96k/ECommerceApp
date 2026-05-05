import express from "express";
import {verifyStripe,placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus, verifyRazorpay} from "../controllers/orderController.js";
import adminAuth from "../middleware/admin_auth.js";
import authUser from "../middleware/auth.js";


const orderRouter = express.Router();

//admin features
orderRouter.post("/list",adminAuth,allOrders);
orderRouter.post("/status",adminAuth,updateStatus);

//payment features
orderRouter.post("/place",authUser,placeOrder);
orderRouter.post("/stripe",authUser,placeOrderStripe);
orderRouter.post("/razorpay",authUser,placeOrderRazorpay);

//userfeature
orderRouter.post("/userOrders",authUser,userOrders);

orderRouter.post("/verifyStripe",authUser,verifyStripe);
orderRouter.post("/verifyRazorpay",authUser,verifyRazorpay);
export default orderRouter;