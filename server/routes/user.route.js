import express from "express";
import {
  getUserProfile,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

import upload from "../utils/multer.js";
const router = express.Router();

// eg. http://localhost:8000/api/v1/user/register
router.route("/register").post(register);
// eg. http://localhost:8000/api/v1/user/login
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile").get(isAuthenticated, getUserProfile);
router
  .route("/profile/update/")
  .put(isAuthenticated, upload.single("profilePhoto"), updateProfile);

export default router;
