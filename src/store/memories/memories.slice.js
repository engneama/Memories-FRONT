import { createSlice } from "@reduxjs/toolkit";
import * as thunk from "./memories.thunk";

const initialState = {
  memories: null,
  totalNumberOfPages: null,
};

const memoriesSlice = createSlice({
  name: "memories",
  initialState,
  extraReducers: (builder) => {
    builder
      //GET ALL
      .addCase(thunk.getAll.fulfilled, (state, action) => {
        state.memories = action.payload.data.memories;
        state.totalNumberOfPages = action.payload.data.totalNumberOfPages;
      })
      //GET ALL
      //CREATE
      .addCase(thunk.create.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(thunk.create.rejected, (state, action) => {
        console.log(action.payload);
      });
    //CREATE
  },
});

const { reducer } = memoriesSlice;

export default reducer;
