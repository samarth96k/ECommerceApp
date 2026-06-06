import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const generateAuthToken = (userId, role = "user") => {
    return jwt.sign(
        {
            id: userId,
            role
        },
        process.env.jwt_Secret,
        {
            expiresIn: "7d"
        }
    );
};

export const validateRegistrationData = (
    name,
    email,
    password
) => {

    if (!name || !email || !password) {
        throw new Error("All fields are required");
    }

    if (!validator.isEmail(email)) {
        throw new Error("Invalid email format");
    }

    if (!validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1
    })) {
        throw new Error(
            "Password must contain uppercase, lowercase and number"
        );
    }
};

export const createUserAccount = async (
    name,
    email,
    password
) => {

    const existingUser =
        await userModel.findOne({ email });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword =
        await bcrypt.hash(password, 12);

    const user =
        await userModel.create({
            name,
            email,
            password: hashedPassword
        });

    return user;
};

export const authenticateUser = async (
    email,
    password
) => {

    const user =
        await userModel.findOne({ email });

    if (!user) {
        throw new Error("User not found");
    }

    const passwordMatched =
        await bcrypt.compare(
            password,
            user.password
        );

    if (!passwordMatched) {
        throw new Error("Invalid credentials");
    }

    return user;
};

export const authenticateAdmin = (
    email,
    password
) => {

    const isAdmin =
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD;

    if (!isAdmin) {
        throw new Error("Invalid credentials");
    }

    return generateAuthToken(
        "admin",
        "admin"
    );
};
