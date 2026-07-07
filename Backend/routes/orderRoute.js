import express from "express";
import {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus, verifyRazorpay,stripeWebhook, cancelOrder} from "../controllers/orderController.js";
import adminAuth from "../middleware/admin_auth.js";
import authUser from "../middleware/auth.js";
import { getDashboardData,updateCODPayment } from "../controllers/adminController.js";
import {
    generalLimiter,
    authLimiter,
    orderLimiter
} from "../middleware/rateLimiter.js";

const orderRouter = express.Router();
orderRouter.post("/webhook",express.raw({ type: "application/json" }),stripeWebhook);
//admin features
orderRouter.post("/list",adminAuth,allOrders);
orderRouter.post("/status",adminAuth,updateStatus);
orderRouter.post("/updateCODPayment", adminAuth, updateCODPayment);
orderRouter.post("/admin/dashboard",adminAuth,getDashboardData);
orderRouter.post("/cancel", adminAuth, cancelOrder);

//userfeature
orderRouter.post("/userOrders",authUser,userOrders);

//payment features

orderRouter.post(
    "/place",
    authUser,
    orderLimiter,
    placeOrder
);

orderRouter.post(
    "/stripe",
    authUser,
    orderLimiter,
    placeOrderStripe
);

orderRouter.post(
    "/razorpay",
    authUser,
    orderLimiter,
    placeOrderRazorpay
);

orderRouter.post(
    "/verifyRazorpay",
    authUser,
    orderLimiter,
    verifyRazorpay
);
export default orderRouter;