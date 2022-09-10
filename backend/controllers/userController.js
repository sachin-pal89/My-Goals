import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// @desc Register new User
// @route POST /api/users
// @access Public
const registerUser = asyncHandler( async (req, res) => {

    const { name, email, password } = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please fill all field")
    }

    // Check if User Exist
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error("User Already Exists")
    }
    
    //Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create User
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error("Invalid user data")
    }
})

// @desc Authenticate new User
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler( async (req, res) => {

    const { email, password } = req.body

    const user = await User.findOne({email})

    const passwordCheck = await bcrypt.compare(password, user.password)

    if(user && passwordCheck)
    {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } 
    else {
        res.status(400)
        throw new Error("Invalid creddentials")
    }
})

// @desc Get User data
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler( async (req, res) => {
    res.status(200).json(req.user)
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

export {registerUser, loginUser, getMe};