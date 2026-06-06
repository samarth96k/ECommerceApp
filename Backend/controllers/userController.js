import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const createToken = (id)=>{
    return jwt.sign({id},process.env.jwt_Secret);
}

import {
    generateAuthToken,
    validateRegistrationData,
    createUserAccount,
    authenticateUser,
    authenticateAdmin
} from "./userControllerAddedFunc.js";

// USER LOGIN

const loginUser = async (req, res) => {

    try {

        const { email, password } =
            req.body;

        const user =
            await authenticateUser(
                email,
                password
            );

        const token =
            generateAuthToken(
                user._id
            );

        return res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {

        return res.json({
            success: false,
            message: error.message
        });
    }
};

// USER REGISTER

const registerUser = async (
    req,
    res
) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;

        validateRegistrationData(
            name,
            email,
            password
        );

        const user =
            await createUserAccount(
                name,
                email,
                password
            );

        const token =
            generateAuthToken(
                user._id
            );

        return res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {

        return res.json({
            success: false,
            message: error.message
        });
    }
};

// ADMIN LOGIN

const adminLogin = async (
    req,
    res
) => {

    try {

        const {
            email,
            password
        } = req.body;

        const token =
            authenticateAdmin(
                email,
                password
            );

        return res.json({
            success: true,
            token
        });

    } catch (error) {

        return res.json({
            success: false,
            message: error.message
        });
    }
};

export {
    loginUser,
    registerUser,
    adminLogin
};
//route for admin login
const adminLogin = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.jwt_Secret);
            res.json({success:true,token});
        }else{
            res.json({success:false,message:"Invalid Crednetials"});
        }
    }catch(error){
        res.json({success:false,message:error.message});
    }
}

export {loginUser,registerUser,adminLogin} ;
