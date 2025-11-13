import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const AI_API = import.meta.env.PROD
  ? `${import.meta.env.VITE_API_URL}/ai`
  : "http://localhost:8000/api/v1/ai";

export const aiApi = createApi({
  reducerPath: "aiApi",
  baseQuery: fetchBaseQuery({
    baseUrl: AI_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getRoadmap: builder.mutation({
      query: (data) => ({
        url: "/roadmap",
        method: "POST",
        body: data,
      }),
    }),
    chatWithAI: builder.mutation({
      query: (data) => ({
        url: "/chat",
        method: "POST",
        body: data,
      }),
    }),
    generateDescription: builder.mutation({
      query: (data) => ({
        url: "/generate-description",
        method: "POST",
        body: data,
      }),
    }),
    generateQuiz: builder.mutation({
      query: (data) => ({
        url: "/generate-quiz",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetRoadmapMutation,
  useChatWithAIMutation,
  useGenerateDescriptionMutation,
  useGenerateQuizMutation,
} = aiApi;

