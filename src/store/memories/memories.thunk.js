import { createAsyncThunk } from "@reduxjs/toolkit";
import { memory } from "services";
import { addUser, removeUser } from "../auth/auth.slice";
import { cookieExtractor, cookieDestroyer } from "helpers";

export const getAll = createAsyncThunk(
  "memories/getAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await memory.getAll();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const create = createAsyncThunk(
  "memories/create",
  async (memoryData, thunkAPI) => {
    try {
      const { data } = await memory.create(memoryData);
      const userData = await cookieExtractor(data.accessToken.data.accessToken);
      thunkAPI.dispatch(addUser(userData));
      return data;
    } catch (error) {
      if (
        error.response.data?.accessToken ||
        error.response.data?.refreshToken
      ) {
        thunkAPI.dispatch(removeUser());
        await cookieDestroyer();
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
