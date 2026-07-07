//add products to user cart
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import { processCart } from "../services/cartServices.js";
import logger from "../utils/logger.js";

const addToCart = async (req, res) => {

    try {
        const { userId, itemId, size } = req.body;
            const product = await productModel.findById(itemId);

if (!product) {
    return res.json({
        success: false,
        message: "Product not found"
    });
}

if (product.stock <= 0) {
    return res.json({
        success: false,
        message: "Product is out of stock"
    });
}
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        logger.error(error);
        res.json({ success: false, message: error.message });
    }
}

//Update User Cart
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;
        cartData[itemId][size] = quantity;
        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Cart Updated" });
    } catch (error) {
        logger.error(error);
        res.json({ success: false, message: error.message });
    }
}

//get user cart data
const getUserCart = async (req, res) => {
    try {

        const { userId } = req.body;

        const userData = await userModel.findById(userId);

        const cartData = userData.cartData;

        const processedCart = await processCart(cartData);

        res.json({
            success: true,
            cartData,
            ...processedCart
        });

    } catch (error) {

        logger.error(error);

        res.json({
            success: false,
            message: error.message
        });

    }
}

export { addToCart, updateCart, getUserCart };