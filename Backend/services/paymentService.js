import mongoose from "mongoose";
import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";

export const processSuccessfulPayment = async (
    orderId,
    userId,
    paymentDetails
) => {
    console.log("Processing Order:", orderId);
    const session = await mongoose.startSession();

    try {

        session.startTransaction();

        // STEP 2 (I mentioned earlier)
        const order = await orderModel
            .findById(orderId)
            .session(session);

        if (!order) {
            throw new Error("Order not found");
        }

        // STEP 3 (I mentioned earlier)
        if (order.payment) {
            await session.commitTransaction();
            return;
        }
        for (const item of order.items) {

            const updatedProduct = await productModel.findOneAndUpdate(
                {
                    _id: item.productId,
                    stock: { $gte: item.quantity } // Enough stock?
                },
                {
                    $inc: {
                        stock: -item.quantity
                    }
                },
                {
                    new: true,
                    session
                }
            );

            if (!updatedProduct) {
                throw new Error(
                    `Insufficient stock for ${item.name}`
                );
            }

        }
        console.log("Stock Updated");      // WE WILL WRITE STOCK DEDUCTION HERE NEXT
        order.payment = true;
        order.status = "Confirmed";
        order.paidAt = new Date();
        order.paymentDetails = paymentDetails;

        await order.save({ session });
        console.log("Order Updated");
        const user = await userModel
            .findById(userId)
            .session(session);

        const cartData = structuredClone(user.cartData);
        for (const item of order.items) {

            const productId = item.productId.toString();

            const size = item.size;

            if (!cartData[productId]) {
                continue;
            }

            if (!cartData[productId][size]) {
                continue;
            }

            cartData[productId][size] -= item.quantity;

            if (cartData[productId][size] <= 0) {
                delete cartData[productId][size];
            }

            if (Object.keys(cartData[productId]).length === 0) {
                delete cartData[productId];
            }

        }
        user.cartData = cartData;

        await user.save({ session });

        console.log("Remaining Cart Saved");
        // console.log("Cart Cleared");      
        await session.commitTransaction();
        console.log("Transaction Committed");

    } catch (error) {

        await session.abortTransaction();
        throw error;

    } finally {

        session.endSession();

    }

}

export const processCODOrder = async(
    orderId,
    userId
)=>{
    
    console.log("Processing Order:", orderId);
    const session = await mongoose.startSession();

    try {

        session.startTransaction();

        // STEP 2 (I mentioned earlier)
        const order = await orderModel
            .findById(orderId)
            .session(session);

        if (!order) {
            throw new Error("Order not found");
        }

        // STEP 3 (I mentioned earlier)
        if (order.payment) {
            await session.commitTransaction();
            return;
        }
        for (const item of order.items) {

            const updatedProduct = await productModel.findOneAndUpdate(
                {
                    _id: item.productId,
                    stock: { $gte: item.quantity } // Enough stock?
                },
                {
                    $inc: {
                        stock: -item.quantity
                    }
                },
                {
                    new: true,
                    session
                }
            );

            if (!updatedProduct) {
                throw new Error(
                    `Insufficient stock for ${item.name}`
                );
            }

        }
        console.log("Stock Updated");      // WE WILL WRITE STOCK DEDUCTION HERE NEXT
      
        order.status = "Confirmed";
        await order.save({ session });
        console.log("Order Updated");
        const user = await userModel
            .findById(userId)
            .session(session);

        const cartData = structuredClone(user.cartData);
        for (const item of order.items) {
            const productId = item.productId.toString();
            const size = item.size;
            if (!cartData[productId]) {
                continue;
            }
            if (!cartData[productId][size]) {
                continue;
            }
            cartData[productId][size] -= item.quantity;

            if (cartData[productId][size] <= 0) {
                delete cartData[productId][size];
            }

            if (Object.keys(cartData[productId]).length === 0) {
                delete cartData[productId];
            }

        }
        user.cartData = cartData;

        await user.save({ session });

        console.log("Remaining Cart Saved");
        await session.commitTransaction();
        console.log("Transaction Committed");

    } catch (error) {

        await session.abortTransaction();
        throw error;

    } finally {

        session.endSession();

    }
}