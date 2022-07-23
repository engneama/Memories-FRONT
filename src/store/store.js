import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";

const ENV = process.env.NODE_ENV === "development";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: ENV ? true : false,
});

export default store;
