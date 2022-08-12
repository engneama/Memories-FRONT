import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import memoriesReducer from "./memories/memories.slice";

const ENV = process.env.NODE_ENV === "development";

const store = configureStore({
  reducer: {
    auth: authReducer,
    memories: memoriesReducer,
  },
  devTools: ENV,
});

export default store;
