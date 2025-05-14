import express from "express";
import {
  createPaypalOrder,
  getAllPurchasedCourse,
  getCourseDetailWithPurchaseStatus,
  verifyPaypalPayment,
} from "../controllers/coursePurchase.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.post("/paypal/create-order", createPaypalOrder);

router.post("/paypal/verify-payment", verifyPaypalPayment);
router.get("/course/:courseId/detail-with-status", getCourseDetailWithPurchaseStatus);
router.get("/", getAllPurchasedCourse);

export default router;
