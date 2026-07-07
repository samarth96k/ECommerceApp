import express from "express";
import { loginUser,adminLogin,registerUser,googleLogin, getUserProfile ,updateUserProfile,addAddress,setDefaultAddress,updateAddress, deleteAddress} from "../controllers/userController.js";
import authUser from "../middleware/auth.js";
import profileAuth from "../middleware/profileAuth.js";
import {
    generalLimiter,
    authLimiter,
    orderLimiter
} from "../middleware/rateLimiter.js";

const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.post("/admin",adminLogin);
userRouter.post("/google-login",googleLogin);
userRouter.post("/profile", profileAuth, getUserProfile);
userRouter.post("/update-profile",profileAuth,updateUserProfile);
userRouter.post("/add-address",profileAuth,addAddress);
userRouter.post("/set-default-address",profileAuth,setDefaultAddress);
userRouter.post("/update-address",profileAuth,updateAddress);
userRouter.post("/delete-address",profileAuth,deleteAddress);
export default userRouter;