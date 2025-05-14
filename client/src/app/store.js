import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer.js";
import { authApi } from "@/features/api/authapi.js";
import { courseApi } from "@/features/api/courseApi.js";
import { paypalApi } from "@/features/api/paypalApi.js";
import { courseProgressApi } from "@/features/api/courseApiProgress.js";

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(
      authApi.middleware,
      courseApi.middleware,
      paypalApi.middleware,
      courseProgressApi.middleware
    ),
});
// middleware is used to add custom functionality to the store, such as logging actions, handling asynchronous requests, or modifying the state before it reaches the reducers.
// In this case, we are adding the authApi and courseApi middleware to the default middleware provided by Redux Toolkit. This allows us to use the endpoints defined in those APIs within our Redux store.

const initializeApp = async () => {
  await appStore.dispatch(
    authApi.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};
initializeApp();
