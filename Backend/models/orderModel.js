import mongoose from "mongoose";
//acct_1TpuEkPl6CzDH6bh stripe
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
                required: true
            },

            name: String,

            image: {
                type: [String],
                required: true
            },

            size: String,

            quantity: Number,

            price: Number
        }
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, required: true, default: "Order Placed" },
    payment: { type: Boolean, required: true, default: false },
    paymentDetails: {
        transactionId: String,
        providerOrderId: String,
        providerPaymentId: String,
        providerSignature: String,
        verified: { type: Boolean, default: false }
    },
    paidAt: Date,
    date: { type: Number, required: true, default: Date.now }
})

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);
export default orderModel;