import userModel from '../models/userModel.js';
import bcrypt from "bcrypt";
import { ApiError } from "../utils/apieroor.js";
import jwt from "jsonwebtoken"

import validator from "validator"



export const register = async (req, res, next) => {
try {
const {name , email, password } = req.body;

console.log("Register body:", req.body);
if (!email || !password) throw new ApiError(400, "Email and password are required");


const exists = await userModel.findOne({ email });
if (exists) throw new ApiError(409, "Email already registered");

// validating password and email
if(!validator.isEmail(email)) throw new ApiError("Enter valid email")

if(password.length<8) throw new ApiError("Enter strong password")



const passwordHashed = await bcrypt.hash(password, 10);
const user = await userModel.create({ name ,email,password: passwordHashed });


// genrate token

const token = user.generateAccessToken();
// optionally create refresh token and save
const refreshToken = user.generateRefreshToken();
user.refreshToken = refreshToken;
await user.save({ validateBeforeSave: false });


return res.json({ 
    message:"Register succesfully",
    
    token });
} catch (err) {
next(err);
}
}


export const login = async (req, res, next) => {
try {
const { email, password } = req.body;
if (!email || !password) throw new ApiError(400, "Email and password are required");


const user = await userModel.findOne({ email });
if (!user) throw new ApiError(401, "Invalid credentials");

// compare password
const ok = await user.verifyPassword(password);
if (!ok) throw new ApiError(401, "Invalid credentials");


const token = user.generateAccessToken();
return res.json({ 
    message:"Login Sucessfully",
    token });
} catch (err) {
next(err);
}
}

