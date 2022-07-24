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
      //REGISTER
      //LOGIN
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
