
import jwt from "jsonwebtoken";

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

    } catch (error) {

        console.log(error);

        return res.json({
            success: false,
            message: error.message
        });

    }

}

export default profileAuth;