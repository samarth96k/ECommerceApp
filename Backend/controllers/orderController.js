import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import razorpay from "razorpay";
//global variables
const currency = 'USD';
const deliveryCharge = 10;

//gateway intitilaise
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpayInstance = new razorpay({
    key_id : process.env.Razorpay_Test_API_Key,
    key_secret : process.env.Razorpay_Test_Key_Secret
})

// =========================
// Repository Layer
// =========================

class OrderRepository {
    static async create(orderData) {
        const order = new orderModel(orderData);
        return await order.save();
    }

    static async getAll() {
        return await orderModel.find({}).sort({ date: -1 }).lean();
    }

    static async getByUser(userId) {
        return await orderModel.find({ userId }).sort({ date: -1 }).lean();
    }

    static async updatePayment(orderId, paymentStatus) {
        return await orderModel.findByIdAndUpdate(orderId, {
            payment: paymentStatus
        });
    }
}

// =========================
// Payment Providers
// =========================

class CODProvider {
    async process(order) {
        return {
            success: true,
            message: "COD Order Placed",
            orderId: order._id
        };
    }
}

class StripeProvider {
    async process(order, origin) {

        const line_items = order.items.map(item => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery"
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        });

        const session =
            await stripe.checkout.sessions.create({
                line_items,
                mode: "payment",
                success_url:
                    `${origin}/verify?success=true&orderId=${order._id}`,
                cancel_url:
                    `${origin}/verify?success=false&orderId=${order._id}`
            });

        return {
            success: true,
            session_url: session.url
        };
    }
}

class RazorpayProvider {
    async process(order) {

        const options = {
            amount: order.amount * 100,
            currency: currency.toUpperCase(),
            receipt: order._id.toString()
        };

        return new Promise((resolve, reject) => {

            razorpayInstance.orders.create(
                options,
                (error, razorpayOrder) => {

                    if (error) {
                        return reject(error);
                    }

                    resolve({
                        success: true,
                        order: razorpayOrder
                    });
                }
            );
        });
    }
}

// =========================
// Factory Pattern
// =========================

class PaymentFactory {

    static getProvider(method) {

        switch (method) {

            case "COD":
                return new CODProvider();

            case "Stripe":
                return new StripeProvider();

            case "Razorpay":
                return new RazorpayProvider();

            default:
                throw new Error("Unsupported Payment Method");
        }
    }
}

// =========================
// Service Layer
// =========================

class OrderService {

    static async createOrder({
        userId,
        items,
        amount,
        address,
        paymentMethod,
        origin
    }) {

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod,
            payment: false,
            date: Date.now()
        };

        const order =
            await OrderRepository.create(orderData);

        const provider =
            PaymentFactory.getProvider(paymentMethod);

        const result =
            await provider.process(order, origin);

        if (paymentMethod === "COD") {

            await userModel.findByIdAndUpdate(
                userId,
                {
                    cartData: {}
                }
            );
        }

        return result;
    }

    static async verifyRazorpay(
        userId,
        razorpay_order_id
    ) {

        const orderInfo =
            await razorpayInstance.orders.fetch(
                razorpay_order_id
            );

        if (orderInfo.status === "paid") {

            await OrderRepository.updatePayment(
                orderInfo.receipt,
                true
            );

            await userModel.findByIdAndUpdate(
                userId,
                {
                    cartData: {}
                }
            );

            return {
                success: true,
                message: "Payment Successful"
            };
        }

        return {
            success: false,
            message: "Payment Failed"
        };
    }
}

// =========================
// Controllers
// =========================

// COD

const placeOrder = async (req, res) => {

    try {

        const result =
            await OrderService.createOrder({
                ...req.body,
                paymentMethod: "COD"
            });

        res.json(result);

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: error.message
        });
    }
};

// Stripe

const placeOrderStripe = async (req, res) => {

    try {

        const result =
            await OrderService.createOrder({
                ...req.body,
                paymentMethod: "Stripe",
                origin: req.headers.origin
            });

        res.json(result);

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: error.message
        });
    }
};

// Razorpay

const placeOrderRazorpay = async (req, res) => {

    try {

        const result =
            await OrderService.createOrder({
                ...req.body,
                paymentMethod: "Razorpay"
            });

        res.json(result);

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: error.message
        });
    }
};

// Verify Razorpay

const verifyRazorpay = async (req, res) => {

    try {

        const { userId, razorpay_order_id } =
            req.body;

        const result =
            await OrderService.verifyRazorpay(
                userId,
                razorpay_order_id
            );

        res.json(result);

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: error.message
        });
    }
};

// Admin Orders

const allOrders = async (req, res) => {

    try {

        const orders =
            await OrderRepository.getAll();

        res.json({
            success: true,
            orders
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: error.message
        });
    }
};

// User Orders

const userOrders = async (req, res) => {

    try {

        const { userId } = req.body;

        const orders =
            await OrderRepository.getByUser(
                userId
            );

        res.json({
            success: true,
            orders
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: error.message
        });
    }
};

export {
    placeOrder,
    placeOrderStripe,
    placeOrderRazorpay,
    verifyRazorpay,
    allOrders,
    userOrders
};
//update order status
const updateStatus = async (req,res)=>{
    try {
        // const {orderId,status} = req.body;
        // await orderModel.findByIdAndUpdate(orderId,{status});
        // res.json({success:true,message:"Status Updated"})
    } catch (error) {
         console.log(error);
        res.json({success:false,error:error.message});       
    }
}

export {verifyRazorpay,verifyStripe,placelaceOrderStripe,placeOrderRazorpay,allOrdeOrder,prs,userOrders,updateStatus};
