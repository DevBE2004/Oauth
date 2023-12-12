import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetCurrent } from "../../apis/auth";
import { login } from "./authSlice";
export const getCurrent = createAsyncThunk(
  "auth/current",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await apiGetCurrent(data);
      if (!response?.data?.success) return rejectWithValue(response);
      dispatch(login({ isLogin: true, token: response.data.accesstoken }));
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
