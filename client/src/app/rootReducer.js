// import { combineReducers } from "@reduxjs/toolkit";
// import authReducer from "../features/Authslice.js";
// import { authApi } from "@/features/api/authapi.js";
// import { courseApi } from "@/features/api/courseApi.js";

// const rootReducer = combineReducers({
//   [authApi.reducerPath]: authApi.reducer,
//   [courseApi.reducerPath]: courseApi.reducer,
//   auth: authReducer,
//   // auth ke andar jo bhi reducers hain unko combine karega
//   // course ke andar jo bhi reducers hain unko combine karega

//   // course:courseReducer
// });

// export default rootReducer;

// // rootReducer.js file Redux ke andar saare reducers ko combine karne ka kaam karti hai. Iska kaam hai Redux store ko ek jagah pe maintain karna

import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/Authslice.js";

// RTK Query APIs import
import { authApi } from "@/features/api/authapi.js";
import { courseApi } from "@/features/api/courseApi.js";
import { paypalApi } from "@/features/api/paypalApi.js";
import { courseProgressApi } from "@/features/api/courseApiProgress.js";

const rootReducer = combineReducers({
  // RTK Query reducers
  [authApi.reducerPath]: authApi.reducer,
  [courseApi.reducerPath]: courseApi.reducer,
  [paypalApi.reducerPath]: paypalApi.reducer,
  [courseProgressApi.reducerPath]: courseProgressApi.reducer,

  // Normal reducers
  auth: authReducer,
  // course: courseReducer (if you have it later)
});

export default rootReducer;
