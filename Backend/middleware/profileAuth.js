
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";
const profileAuth = async (req, res, next) => {

    try {

        const { token } = req.headers;

        if (!token) {
            return res.json({
                success: false,
                message: "Not Authorized. Login Again."
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.jwt_Secret
        );
        console.log("Decoded Token:", decoded);
        // Notice this is NOT req.body
        req.profileUserId = decoded.id;

        next();

    } catch(error){

    logger.error(error);

    if(error.name === "TokenExpiredError"){
        return res.status(401).json({
            success:false,
            expired:true,
            message:"Session expired. Please login again."
        });
    }

    return res.status(401).json({
        success:false,
        message:"Invalid token. Please login again."
    });

}

}

export default profileAuth;