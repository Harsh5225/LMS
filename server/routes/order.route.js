import express from "express";
import {
  createPaypalOrder,
  getAllPurchasedCourse,
  getCourseDetailWithPurchaseStatus,
  verifyPaypalPayment,
} from "../controllers/coursePurchase.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();

// Make this route public (no authentication required)
router.get("/course/:courseId/detail-with-status", getCourseDetailWithPurchaseStatus);

// Keep these routes protected
router.post("/paypal/create-order", isAuthenticated, createPaypalOrder);
router.post("/paypal/verify-payment", isAuthenticated, verifyPaypalPayment);
router.get("/", isAuthenticated, getAllPurchasedCourse);

export default router;
