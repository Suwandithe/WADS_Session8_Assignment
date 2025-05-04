import { createError } from "../utils/error.js";
import { connectToDB } from "../utils/connection.js ";
import User from "../models/user.Model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { sendVerificationEmail } from "./sendVerificationEmail.js";

export async function register(req, res, next) {
    const {name, email, password} = req.body;
    if( !name ||!email || !password) {
        return next(createError(400, "Missing fields"))
    }
    await connectToDB()
    const alreadyRegistered = await User.exists({email:email})

    if (alreadyRegistered) return next(createError(400, "user alreayd exist"))

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()

    const newUser = new User({...req.body, password: hash, verificationCode})
    await newUser.save();
    sendVerificationEmail(newUser.email, verificationCode)

    res.status(201).json({ 
        message: "User created successfully",
        newUser:{
            ...newUser._doc,
            password: hash, 
            verificationCode: verificationCode,
        }
    })
}

export async function login(req, res, next) {
    const {email, password} = req.body;

    if(!email || !password) {
        return next(createError(400, "Missing fields"))
    }
    await connectToDB()
    
    const user = await User.findOne({email})
    if(!user) return next(createError(400, "Invalid credentials "))
    const passwordIsCorrect = await bcrypt.compare(password, user.password)
    if(!passwordIsCorrect) return next(createError(400,"Invalid credentials"))
    const token = jwt.sign({id: user._id}, process.env.JWT)
    res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "Production",
        sameSite: "strict", 
        maxAge: 24 * 60 * 60 * 1000, 
    }).status(200).json({
        message: "user logged in successfully",
        user: {
            id: user._id,
            email: user.email
        }
    })

}

export async function logout(req, res, next) {
    res.clearCookie("access_token", {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "Production",
    }).status(200).json({
        message: "user logged out succesfully",
    })
}

export async function verifyEmail(req,res){
    try {
        const {code} = req.body
        const user = await User.findOne({verificationCode:code}) 

        if (!user) {
            return res.status(400).json({
                success: false, 
                message: "Invalid or expired code"
            })
        }
        user.isVerified = true;
        user.verificationCode = undefined;
        await user.save()

        return res.status(200).json({
            success:true,
            message: "Email verified successfully",
            user: {
                _id: user.id,
                email: user.email,
            }
        })

    } catch (error) {
        console.log(error);
        
    }

}