import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { userLoggedIn, userLoggedOut } from "../Authslice";

// Replace hardcoded URL with environment variable
const USER_API = import.meta.env.PROD 
  ? `${import.meta.env.VITE_API_URL}/user/`
  : "http://localhost:8000/api/v1/user/";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // we use "mutation" when we have to post the data
    //  we use "query" when we fetch the data
    registerUser: builder.mutation({
      query: (inputData) => ({
        url: "register", // => http://localhost:8000/api/v1/user/register  add url in end
        method: "POST",
        body: inputData,
      }),
    }),
    loginUser: builder.mutation({
      query: (inputData) => ({
        url: "login",
        method: "POST",
        body: inputData,
      }),
      // onQueryStarted: Runs after the request is initiated.
      // queryFulfilled: Resolves when the request succeeds.
      // dispatch(userLoggedIn(...)): Updates Redux state with logged-in user details.
      // _ || arg
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // Debugging: Check the actual response structure
          console.log("Response:", result, "hello its corrected no error");

          // Ensure result.data exists before accessing user
          if (result?.data?.user) {
            dispatch(userLoggedIn({ user: result.data.user }));
          } else {
            console.error("Unexpected response structure:", result);
          }
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "GET",
      }),
      // eslint-disable-next-line no-unused-vars
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          dispatch(userLoggedOut({ user: null }));
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),
    loadUser: builder.query({
      query: () => ({
        url: "profile",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // Debugging: Check the actual response structure
          console.log("Response:", result, "hello its corrected no error");

          // Ensure result.data exists before accessing user
          if (result?.data?.user) {
            dispatch(userLoggedIn({ user: result.data.user }));
          } else {
            console.error("Unexpected response structure:", result);
          }
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),
    updateUser: builder.mutation({
      query: (formData) => ({
        url: "profile/update",
        method: "PUT",
        body: formData,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLoadUserQuery,
  useUpdateUserMutation,
  useLogoutUserMutation,
} = authApi;

// useRegisterUserMutation,useLoginUserMutation  hook
// jab get karte hai to hum query use karte hai
