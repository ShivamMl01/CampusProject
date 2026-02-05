
import { ApiError } from "../utils/apieroor.js"

import {userModel} from "../models/userModel.js"


//how to create tokens

const genrateAcessandrefrshToken = async(userId)=>{
//select user by his id
try {
    const user = await userModel.findById(userId)
    if(!user){
        throw new ApiError(400,"user not found")
    }

    const acessToken =user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({validateBeforeSave:false})
    return {acessToken,refreshToken}
} catch (error) {
    throw new ApiError(400,"something went wrong while generating tokens");
}
}