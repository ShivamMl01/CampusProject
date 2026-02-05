import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const userSchema = new mongoose.Schema({
    name:{type:String , require:true},
    email:{type:String , require:true,unique:true},
    password:{type:String , require:true},
},{minimize:false})


userSchema.methods.generateAccessToken = function(){
    return jwt.sign({sub: this._id, email: this.email }, process.env.JWT_ACCESS_TOKEN_SECRET, )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({sub: this._id, email: this.email }, process.env.JWT_ACCESS_TOKEN_SECRET)
}

userSchema.methods.verifyPassword = function(password){
    return bcrypt.compare(password ,this.password)
}







const User = mongoose.models.User || mongoose.model("User",userSchema)

export default User;