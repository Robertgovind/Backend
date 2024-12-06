import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

// res is not used so it is written as _
export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      throw new ApiError(401, "Invalid access token");
    }

    if (!decodedToken?._id) {
      throw new ApiError(401, "Malformed token");
    }

    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "User not found for this token");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message); // Optional logging
    throw new ApiError(401, error?.message || "Unauthorized request");
  }
});
