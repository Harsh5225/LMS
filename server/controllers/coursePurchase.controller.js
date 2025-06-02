import paypal from "@paypal/checkout-server-sdk";
import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/purchaseCourse.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

// PayPal environment setup
const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_CLIENT_SECRET
);
const client = new paypal.core.PayPalHttpClient(environment);

export const createPaypalOrder = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.body;
    console.log("Cookies:", req.cookies);

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found!" });

    const newPurchase = new CoursePurchase({
      courseId,
      userId,
      amount: course.coursePrice,
      status: "pending",
    });

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");

    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: course.coursePrice.toFixed(2),
          },
          description: course.courseTitle,
        },
      ],
      application_context: {
        return_url: `http://localhost:5173/verify-payment/${courseId}`,
        cancel_url: `http://localhost:5173/course-detail/${courseId}`,
      },
    });

    const order = await client.execute(request); // This should come AFTER requestBody

    const approvalUrl = order.result.links.find(
      (link) => link.rel === "approve"
    )?.href;

    newPurchase.paymentId = order.result.id;
    await newPurchase.save();

    return res.status(200).json({
      success: true,
      orderID: order.result.id,
      approvalUrl,
    });
  } catch (error) {
    console.error("PayPal Order Error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating order",
      error,
    });
  }
};

// In your purchase controller
export const verifyPaypalPayment = async (req, res) => {
  const { orderID } = req.body;
  const userId = req.id;

  if (!orderID) {
    return res.status(400).json({
      success: false,
      message: "Order ID is required",
    });
  }

  try {
    // 1. Find and update the purchase record (without transaction)
    const purchase = await CoursePurchase.findOneAndUpdate(
      { paymentId: orderID, userId },
      {
        status: "completed",
        completedAt: new Date(),
        paymentDetails: { bypassed: true },
      },
      { new: true }
    ).populate("courseId");

    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: "Purchase record not found - create an order first",
      });
    }

    // 2. Update user's enrolled courses (simple update)
    await User.updateOne(
      { _id: userId },
      { $addToSet: { enrolledCourses: purchase.courseId._id } }
    );

    // 3. Update course's enrolled students (simple update)
    await Course.updateOne(
      { _id: purchase.courseId._id },
      { $addToSet: { enrolledStudents: userId } }
    );

    return res.status(200).json({
      success: true,
      message: "Payment verification bypassed successfully",
      courseId: purchase.courseId._id,
      bypassed: true,
    });
  } catch (error) {
    console.error("Simple Bypass Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error while bypassing payment verification",
      error: error.message,
    });
  }
};

export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id; // This might be undefined for unauthenticated users

    const course = await Course.findById(courseId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" });

    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    // If user is not authenticated, return course without purchase status
    if (!userId) {
      return res.status(200).json({
        course,
        purchased: false,
      });
    }

    // Check purchase status for authenticated users
    const purchased = await CoursePurchase.findOne({ userId, courseId });
    console.log("purchased", purchased);

    return res.status(200).json({
      course,
      purchased: !!purchased,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get course details",
    });
  }
};

export const getAllPurchasedCourse = async (_, res) => {
  try {
    const purchasedCourse = await CoursePurchase.find({
      status: "completed",
    }).populate("courseId");

    if (!purchasedCourse || purchasedCourse.length === 0) {
      return res.status(404).json({
        purchasedCourse: [],
      });
    }

    return res.status(200).json({
      purchasedCourse,
    });
  } catch (error) {
    console.log(error);
  }
};
