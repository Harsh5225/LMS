import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paypalApi = createApi({
  reducerPath: "paypalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.PROD 
      ? `${import.meta.env.VITE_API_URL}/purchase`
      : "http://localhost:8000/api/v1/purchase",
    credentials: "include",
  }), // your backend API URL
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (courseId) => ({
        url: "paypal/create-order",
        method: "POST",
        body: { courseId },
      }),
    }),
    verifyPayment: builder.mutation({
      query: (orderID) => ({
        url: "paypal/verify-payment",
        method: "POST",
        body: { orderID },
        // This will be serialized to { orderID: "value" }
        // tis
      }),
    }),
    // New endpoint to get course details with purchase status
    getCourseDetailWithPurchaseStatus: builder.query({
      query: (courseId) => ({
        url: `course/${courseId}/detail-with-status`,
        method: "GET",
      }),
    }),
    // New endpoint to get all purchased courses
    getAllPurchasedCourse: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useVerifyPaymentMutation,
  useGetCourseDetailWithPurchaseStatusQuery, // hook for getting course details with purchase status
  useGetAllPurchasedCourseQuery, // hook for getting all purchased courses
} = paypalApi;
