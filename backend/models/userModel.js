import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String }  // Added this field
}, { minimize: false });

userSchema.methods.generateAccessToken = function() {
  return jwt.sign(
    { sub: this._id, email: this.email },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }  
  );
};

userSchema.methods.generateRefreshToken = function() {
  return jwt.sign(
    { sub: this._id, email: this.email },
    process.env.JWT_REFRESH_TOKEN_SECRET,  
    { expiresIn: '7d' }  
  );
};

userSchema.methods.verifyPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;