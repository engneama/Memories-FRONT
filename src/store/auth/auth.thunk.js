import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "services";
import { cookieExtractor, cookieDestroyer } from "helpers";

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const { data } = await auth.login(userData);
      const decodedValue = await cookieExtractor(data.data.accessToken);
      return decodedValue;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      console.log(userData);
      const { data } = await auth.register(userData);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await cookieDestroyer();
    const { data } = await auth.logout();
    return data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const verifyToken = createAsyncThunk(
  "auth/verifyToken",
  async (_, thunkAPI) => {
    try {
      const { data } = await auth.verifyToken();
      const decodedValue = await cookieExtractor(data.data.accessToken);
      return decodedValue;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
