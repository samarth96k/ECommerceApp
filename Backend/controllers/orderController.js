import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import Stripe from "stripe";
import razorpay from "razorpay";
import mongoose from "mongoose";
import crypto from "crypto";
import logger from "../utils/logger.js";
import { processSuccessfulPayment,processCODOrder } from "../services/paymentService.js";
//global variables
const currency = 'USD';
const deliveryCharge = 10;

//gateway intitilaise
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpayInstance = new razorpay({
    key_id: process.env.Razorpay_Test_API_Key,
    key_secret: process.env.Razorpay_Test_Key_Secret
})

//placing order using COD Method
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const orderData = {
            userId, items, address, amount, paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save();
        await processCODOrder(newOrder._id,userId);
        return res.json({ success: true, message: "Order Placed" });

    } catch (error) {
       logger.error(error);
        res.json({ success: false, message: error.message });
    }
}

//placing order using Stripe Method
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

        const orderData = {
            userId, items, address, amount, paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))
        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery",
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })
        const session = await stripe.checkout.sessions.create({

            success_url: `${origin}/orders`,
            cancel_url: `${origin}/cart`,

            payment_method_types: ["card"],

            line_items,

            mode: "payment",

            metadata: {

                orderId: newOrder._id.toString(),

                userId: userId.toString()

            }

        });
        res.json({ success: true, session_url: session.url });
    } catch (error) {
       logger.error(error);
        res.json({ success: false, message: error.message });
    }
}



const verifyRazorpay = async (req, res) => {
    try {
        const {
            userId,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;
        const generatedSignature = crypto
            .createHmac(
                "sha256",
                process.env.Razorpay_Test_Key_Secret
            )
            .update(
                razorpay_order_id + "|" + razorpay_payment_id
            )
            .digest("hex");
        if (generatedSignature !== razorpay_signature) {

            return res.json({

                success: false,

                message: "Invalid Payment Signature"

            });

        }
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        if (orderInfo.status !== "paid") {

            return res.json({

                success: false,

                message: "Payment Failed"

            });

        }

        await processSuccessfulPayment(
            orderInfo.receipt,
            userId,
            {
                transactionId: razorpay_payment_id,
                providerOrderId: razorpay_order_id,
                providerPaymentId: razorpay_payment_id,
                providerSignature: razorpay_signature,
                verified: true
            }
        );

        return res.json({
            success: true,
            message: "Payment Successful"
        });
    } catch (error) {
       logger.error(error);
        res.json({ success: false, message: error.message });
    }
}

//placing order using Razorpay Method
const placeOrderRazorpay = async (req, res) => {
   logger.debug("Razorpay API Hit");
    try {
        const { userId, items, amount, address } = req.body;
        const orderData = {
            userId, items, address, amount, paymentMethod: "Razorpay",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save();
     logger.debug("Order saved:", newOrder._id);
        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }
        await razorpayInstance.orders.create(options, (error, order) => {
            logger.error(error);
    console.log(order);
            if (error) {
               logger.error(error);
                return res.json({ success: false, message: error });
            }
            res.json({ success: true, order });
        })
    } catch (error) {
       logger.error(error);
        res.json({ success: false, message: error.message });
    }
}

const cancelOrder = async (req, res) => {

    const session = await mongoose.startSession();

    try {

        session.startTransaction();

        const { orderId } = req.body;

        const order = await orderModel
            .findById(orderId)
            .session(session);

        if (!order) {
            throw new Error("Order not found");
        }

        if (order.status === "Cancelled") {
            throw new Error("Order already cancelled.");
        }

        if (    order.status === "Shipping" ||
    order.status === "Out For Delivery" ||
    order.status === "Delivered") {
            throw new Error( "This order can no longer be cancelled.");
        }

        for (const item of order.items) {

            await productModel.findByIdAndUpdate(
                item.productId,
                {
                    $inc: {
                        stock: item.quantity
                    }
                },
                {
                    session
                }
            );

        }

        order.status = "Cancelled";

        await order.save({ session });

        await session.commitTransaction();

        return res.json({
            success: true,
            message: "Order cancelled successfully."
        });

    } catch (error) {

        await session.abortTransaction();

       logger.error(error);

        return res.json({
            success: false,
            message: error.message
        });

    } finally {

        session.endSession();

    }

};
//aLL ORDERS DATA FOR ADMIN PANEL

const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, orders })
    } catch (error) {
       logger.error(error);
        res.json({ success: false, error: error.message });
    }
}

//user order data for frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders });
    } catch (error) {
       logger.error(error);
        res.json({ success: false, error: error.message });
    }
}

//update order status
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
       logger.error(error);
        res.json({ success: false, error: error.message });
    }
}

const stripeWebhook = async (req, res) => {

    const signature = req.headers["stripe-signature"];

    let event;

    try {

        event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );

    } catch (error) {

        console.log("Webhook Signature Failed");

        return res.status(400).send(
            `Webhook Error: ${error.message}`
        );

    }

    switch (event.type) {

        case "checkout.session.completed": {
            try {

                const checkoutSession = event.data.object;

                console.log("========== WEBHOOK ==========");
                console.log(checkoutSession);
                console.log("=============================");

                if (checkoutSession.payment_status !== "paid") {
                    break;
                }

                await processSuccessfulPayment(
                    checkoutSession.metadata.orderId,
                    checkoutSession.metadata.userId,
                    {
                        transactionId: checkoutSession.payment_intent,
                        providerOrderId: checkoutSession.id,
                        providerPaymentId: checkoutSession.payment_intent,
                        verified: true
                    }
                );

                console.log("✅ Payment processed successfully");

            } catch (error) {

                console.error(error);

                return res.status(500).send("Webhook Processing Failed");
            }

            break;
        }

        default:

            console.log(`Unhandled Event: ${event.type}`);

    }

    return res.json({
        received: true
    });

}

export { verifyRazorpay, cancelOrder, placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, stripeWebhook };