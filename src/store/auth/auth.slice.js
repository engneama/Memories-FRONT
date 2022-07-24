import { createSlice } from "@reduxjs/toolkit";
import * as thunk from "./auth.thunk";
import notifications from "components/common/Notifications";

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      //REGISTER
      .addCase(thunk.register.pending, (state, action) => {
        notifications.Pending(
          "auth/register",
          "Hold on",
          "Please wait while we handle your registration..."
        );
      })
      .addCase(thunk.register.rejected, (state, action) => {
        console.log(action);
        notifications.Failure(
          "auth/register",
          "Uh Oh!",
          action.payload.message || "Something went wrong. Please try again."
        );
      })
      .addCase(thunk.register.fulfilled, (state, action) => {
        console.log(action);
        notifications.Success("auth/register", "Done!", action.payload.message);
      })
      //REGISTER
      //LOGIN
      .addCase(thunk.login.pending, (state, action) => {
        notifications.Pending(
          "auth/login",
          "Hold on",
          "Please wait while we handle your loggin..."
        );
      })
      .addCase(thunk.login.rejected, (state, action) => {
        console.log(action);
        notifications.Failure(
          "auth/login",
          "Uh Oh!",
          action.payload.response.data.message ||
            "Something went wrong. Please try again."
        );
      })
      .addCase(thunk.login.fulfilled, (state, action) => {
        state.user = action.payload;
        console.log(action);
        notifications.Success("auth/login", "Done!", "Welcome home ❤️");
      })
      //LOGIN
      //VERIFY TOKEN
      .addCase(thunk.verifyToken.rejected, (state, action) => {
        state.user = null;
      })
      .addCase(thunk.verifyToken.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      //VERIFY TOKEN
      //LOGOUT
      .addCase(thunk.logout.rejected, (state, action) => {
        state.user = null;
      })
      .addCase(thunk.logout.fulfilled, (state, action) => {
        state.user = null;
      });
    //LOGOUT
  },
});

const { reducer } = authSlice;

export default reducer;
