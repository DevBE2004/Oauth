import { createSlice } from "@reduxjs/toolkit";
import { getCurrent } from "./asyncAction";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
    token: null,
    current: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLogin = action.payload.isLogin;
      state.token = action.payload.token;
      // state.current = action.payload.token;
    },
    logout: (state, action) => {
      state.isLogin = false;
      state.token = null;
      // state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCurrent.fulfilled, (state, action) => {
      state.isLogin = true;
      state.token = action.payload.data.accesstoken;
      state.isLoading = false;
      // state.current = action.payload.data.token;
    });
    builder.addCase(getCurrent.rejected, (state, action) => {
      state.isLogin = false;
      state.token = null;
      state.isLoading = false;
      // state.current = null;
      // state.mes = "Phiên đăng nhập đã hết hạn! hãy đăng nhập lại";
    });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
