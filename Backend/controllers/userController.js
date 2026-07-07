import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import logger from "../utils/logger.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const createToken = (id)=>{
    return jwt.sign({id},process.env.jwt_Secret,{expiresIn:"30m"});
}

//route for User Login
const loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User does not Exist"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(isMatch){
            const token  = createToken(user._id);
            const safeUser = await userModel
                                    .findById(user._id)
                                    .select("-password");
            res.json({success:true,token,"user":safeUser});
            console.log(user)
        }else{
            res.json({success:false,message:"Invalid credentials"});
        }
    } catch (error) {
        logger.error(error);
        res.json({success:false,message:error.message});
    }
}

//route for User Registration
const registerUser = async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        //checking user already exists or not
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User Already Exists"});
        }
        //validate email forward and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email."});
        }
        if(password.length<8 ){
            return res.json({success:false,message:"Please enter a strong password."});
        }
        //Hashing User Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new userModel({
            name,email,password:hashedPassword
        })
        const user = await newUser.save();
        const token = createToken(user._id);
        const safeUser = await userModel
                              .findById(user._id)
                                .select("-password");
        res.json({success:true,token,"user":safeUser});
    }catch(error){
        logger.error(error);
        res.json({success:false,message:error.message});
    }
}

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

export const googleLogin = async(req,res) => {
    const {token:googleToken } = req.body;
    console.log("Google Login Hit");
    if(!googleToken){
        return res.json({
            success:false,
            message:"Google token missing"
        });
    }
    const ticket = await client.verifyIdToken({idToken:googleToken,audience:process.env.GOOGLE_CLIENT_ID});
    const payload = ticket.getPayload();
    const {email,name,picture,sub} = payload;
    let user = await userModel.findOne({email});
    if(!user){
        user = await userModel.create({
            name,email,googleId:sub,image:picture
        });
    }
    console.log(user);
    const token = createToken(user._id);
    const safeUser = await userModel
                     .findById(user._id)
                     .select("-password");
    return res.json({success:true,token,"user":safeUser});
    
}

const getUserProfile = async (req, res) => {

    try {

        const userId = req.profileUserId;

        console.log("Profile User ID:", userId);

        const user = await userModel
            .findById(userId)
            .select("-password");

        console.log("User Found:", user);

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        return res.json({
            success: true,
            user
        });

    } catch (error) {

        logger.error(error);

        return res.json({
            success: false,
            message: error.message
        });

    }

}



//for profile changes
const updateUserProfile = async (req, res) => {

    try {

        const userId = req.profileUserId;

        const {
            name,
            phone,
            age,
            gender
        } = req.body;

        const user = await userModel.findById(userId);

        if (!user) {

            return res.json({

                success: false,

                message: "User not found"

            });

        }

        if (name !== undefined)
            user.name = name;

        if (phone !== undefined)
            user.phone = phone;

        if (age !== undefined)
            user.age = age;

        if (gender !== undefined)
            user.gender = gender;

        await user.save();

        const safeUser =
            await userModel.findById(userId)
            .select("-password");

        return res.json({

            success: true,

            message: "Profile Updated",

            user: safeUser

        });

    } catch (error) {

        logger.error(error);

        return res.json({

            success: false,

            message: error.message

        });

    }

}

const addAddress = async (req, res) => {

    try {

        const userId = req.profileUserId;

        const {

            fullName,
            phone,
            houseNo,
            street,
            landmark,
            city,
            state,
            country,
            pincode,
            addressType

        } = req.body;

        const user = await userModel.findById(userId);

        if (!user) {

            return res.json({

                success: false,
                message: "User not found"

            });

        }

        const newAddress = {

            fullName,
            phone,
            houseNo,
            street,
            landmark,
            city,
            state,
            country,
            pincode,
            addressType,

            isDefault: user.addresses.length === 0

        };

        user.addresses.push(newAddress);

        await user.save();

        const safeUser = await userModel
            .findById(userId)
            .select("-password");

        return res.json({

            success: true,

            message: "Address Added",

            user: safeUser

        });

    } catch (error) {

        logger.error(error);

        return res.json({

            success: false,

            message: error.message

        });

    }

}

const setDefaultAddress = async (req, res) => {

    try {

        const userId = req.profileUserId;

        const { addressId } = req.body;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        // Remove previous default

        user.addresses.forEach(address => {

            address.isDefault = false;

        });

        // Find selected address

        const selectedAddress = user.addresses.id(addressId);

        if (!selectedAddress) {

            return res.json({
                success: false,
                message: "Address not found"
            });

        }

        selectedAddress.isDefault = true;

        await user.save();

        const safeUser = await userModel
            .findById(userId)
            .select("-password");

        return res.json({

            success: true,

            message: "Default address updated",

            user: safeUser

        });

    } catch (error) {

        logger.error(error);

        return res.json({

            success: false,

            message: error.message

        });

    }

}

const updateAddress = async (req, res) => {

    try {

        const userId = req.profileUserId;

        const {

            addressId,

            fullName,
            phone,
            houseNo,
            street,
            landmark,
            city,
            state,
            country,
            pincode,
            addressType

        } = req.body;

        const user = await userModel.findById(userId);

        if (!user) {

            return res.json({

                success: false,

                message: "User not found"

            });

        }

        const address = user.addresses.id(addressId);

        if (!address) {

            return res.json({

                success: false,

                message: "Address not found"

            });

        }

        address.fullName = fullName;
        address.phone = phone;
        address.houseNo = houseNo;
        address.street = street;
        address.landmark = landmark;
        address.city = city;
        address.state = state;
        address.country = country;
        address.pincode = pincode;
        address.addressType = addressType;

        await user.save();

        const safeUser = await userModel
            .findById(userId)
            .select("-password");

        return res.json({

            success: true,

            message: "Address Updated",

            user: safeUser

        });

    } catch (error) {

        logger.error(error);

        return res.json({

            success: false,

            message: error.message

        });

    }

}


const deleteAddress = async (req, res) => {

    try {

        const userId = req.profileUserId;

        const { addressId } = req.body;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        // Find address to delete

        const address = user.addresses.id(addressId);

        if (!address) {
            return res.json({
                success: false,
                message: "Address not found"
            });
        }

        const wasDefault = address.isDefault;

        // Remove address

        user.addresses.pull(addressId);

        // If default was deleted
        // and addresses still exist

        if (wasDefault && user.addresses.length > 0) {

            user.addresses[0].isDefault = true;

        }

        await user.save();

        const safeUser = await userModel
            .findById(userId)
            .select("-password");

        return res.json({

            success: true,

            message: "Address Deleted",

            user: safeUser

        });

    } catch (error) {

        logger.error(error);

        return res.json({

            success: false,

            message: error.message

        });

    }

}
export {loginUser,registerUser,adminLogin, getUserProfile, updateUserProfile, addAddress, updateAddress, setDefaultAddress, deleteAddress} ;