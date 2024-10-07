import { configureStore } from "@reduxjs/toolkit";
import { baseAPI } from "../api/baseAPI.js";
import authReducer from "./features/authSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseAPI.reducerPath]: baseAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseAPI.middleware),
});
