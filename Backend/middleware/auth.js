import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

const authUser = async (req, res, next) => {

    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: "Not Authorised Login Again" });
    }
    try {
        const token_decode = jwt.verify(token, process.env.jwt_Secret);
        req.body.userId = token_decode.id;
        next();

    } catch (error) {

logger.error(error);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                expired: true,
                message: "Session expired. Please login again."
            });
        }

        return res.status(401).json({
            success: false,
            message: "Invalid token. Please login again."
        });

    }
}

export default authUser;