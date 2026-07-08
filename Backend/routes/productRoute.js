import express from "express";
import  {singleProduct,removeProduct,listProduct,addProduct, addOrUpdateReview, deleteReview,getReviewSummary} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/admin_auth.js";
import userModel from "../models/userModel.js";
import profileAuth from "../middleware/profileAuth.js";
import {
    generalLimiter,
    authLimiter,
    orderLimiter
} from "../middleware/rateLimiter.js";

const productRouter = express.Router();
productRouter.post("/single",singleProduct);
productRouter.get("/list",listProduct);
productRouter.post("/review-summary", getReviewSummary);

//rate limited routes
productRouter.post(
    "/add",
    adminAuth,
    generalLimiter,
    upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]),
    addProduct
);
productRouter.post(
    "/remove",
    adminAuth,
    generalLimiter,
    removeProduct
);
productRouter.post(
    "/review",
    profileAuth,
    generalLimiter,
    addOrUpdateReview
);

productRouter.post(
    "/delete-review",
    profileAuth,
    generalLimiter,
    deleteReview
);
export default productRouter;