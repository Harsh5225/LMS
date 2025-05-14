import mongoose from "mongoose";

const coursePurchaseSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true, // Added for better query performance
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    paymentId: {
      type: String,
      required: true,
      unique: true, // Ensure no duplicate payments
    },
    paymentGateway: {
      type: String,
      default: "paypal",
    },
    paymentDetails: {
      type: Object, // Store raw PayPal response for debugging
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Compound index for frequent queries
coursePurchaseSchema.index({ userId: 1, courseId: 1 });

export const CoursePurchase = mongoose.model(
  "CoursePurchase",
  coursePurchaseSchema
);
