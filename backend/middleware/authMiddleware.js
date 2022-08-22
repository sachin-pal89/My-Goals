import jwt from "jsonwebtoken";
import asynceHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asynceHandler( async (req, res, next) => {

    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get User from the token
            req.user = await User.findById(decoded.id).select('-password')

            //next middleware
            next()
        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error("Not Authorized")
        }
    }

    if(!token) {
        res.status(401)
        throw new Error("Not authorized, no token")
    }
})

export default protect;