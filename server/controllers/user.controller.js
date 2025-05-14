import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // it checks, some input is not empty
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const userExist = await User.findOne({ email });
    // checks if user already exists already in the database
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }
    // bcrypt use for hasing the password to make it more secure and encrypted
    const hashedPassword = await bcrypt.hash(password, 10);
    // it create a object, save in the db

    // await User.create({
    //   name,
    //   email,
    //   password: hashedPassword,
    // });
    console.log(hashedPassword);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(200).json({
      success: true,
      message: "Account create successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "internal Server Error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // checks for input field
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // checks email whether it is present in the db, if it is not in db how user can login in the application
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({
        success: false,
        message: "User not registered in  platform",
      });
    }

    // it compare the input password with User password which is saved in db
    const isPasswordMatch = await bcrypt.compare(password, userExist.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Email or Password",
      });
    }
    //we are creating token.
    // it helps to user to use the application everytime for provided specific period.
    // once provide time is over you logout from our platform
    generateToken(res, userExist, `Welcome back ${userExist.name}`);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "internal Server Error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        success: true,
        message: "Logout successfully",
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "internal Server Error",
    });
  }
};

// usser ko profile tabhi dikhaenge jab wo login hoga
// isliye hum token ko verify karenge ki wo login hai ya nahi
// ek middleware create karenge
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.id;
    // it will get the user id from the token
    const user = await User.findById(userId)
      .select("-password")
      .populate("enrolledCourses"); // it will select all the data from the user except password
    // it will select all the data from the user except password
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "internal Server Error",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name } = req.body;
    const profilePhoto = req.file;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    //* yaha cloudinary use karenge jo uski public url bheje gai;

    // extract the public id of old image from the url if it exists;
    // if exists first destroy before updating
    if (user.photoUrl) {
      const publicId = user.photoUrl.split("/").pop().split(".")[0]; // extract public id;
      deleteMediaFromCloudinary(publicId);
    }

    const cloudResponse = await uploadMedia(profilePhoto.path);
    const photoUrl = cloudResponse.secure_url;
    const updatedData = { name, photoUrl };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updatedData,
      { new: true, runValidators: true } // Added runValidators
    ).select("-password");

    return res.status(200).json({
      success: true,
      user: updatedUser,
      message: "Profile change successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to edit profile",
    });
  }
};
