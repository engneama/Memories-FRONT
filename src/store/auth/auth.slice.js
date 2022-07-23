import { createSlice } from "@reduxjs/toolkit";
import * as thunk from "./auth.thunk";

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
        console.log("register pending", action.payload);
      })
      .addCase(thunk.register.rejected, (state, action) => {
        console.log("register rejected", action.payload);
      })
      .addCase(thunk.register.fulfilled, (state, action) => {
        console.log("register fulfilled", action.payload);
      })
      //REGISTER
      //LOGIN
      .addCase(thunk.login.pending, (state, action) => {})
      .addCase(thunk.login.rejected, (state, action) => {})
      .addCase(thunk.login.fulfilled, (state, action) => {
        state.user = action.payload;
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
