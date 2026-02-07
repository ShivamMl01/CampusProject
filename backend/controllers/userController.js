import userModel from "../models/userModel.js";
import { ApiError } from "../utils/apieroor.js";

// create access & refresh tokens
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await userModel.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };

  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

export default generateAccessAndRefreshToken;
