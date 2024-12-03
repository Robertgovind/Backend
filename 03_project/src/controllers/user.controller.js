import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, fullName, password } = req.body;

  if (
    [username, email, fullName, password].some((data) => data?.trim() === "")
  ) {
    throw new ApiError(400, "All the fields are required");
  }

  const existingUser = User.findOne({
    $or: [{ username }, { email }],
  });
  if (existingUser) {
    throw new ApiError(409, "User with email or usrename already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverIamgeLocalPath = req.files?.avatar[0].path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar image is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverIamgeLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar image is required");
  }
  const userResponse = await User.create({
    username: username,
    fullName: fullName,
    email: email,
    password: password,
    avatar: avatar.url,
    coverImage: coverImage?.rul || "",
  });
  // '-' sign used to remove the fields form the selected fields
  const createdUser = await User.findById(userResponse._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "An error occured while registering user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export { registerUser };
