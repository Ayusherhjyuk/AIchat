import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// --- async thunks ---
export const signup = createAsyncThunk("auth/signup", async (userData) => {
  const res = await axios.post(`${API_URL}/signup`, userData);
  return res.data;
});

export const signin = createAsyncThunk("auth/signin", async (userData) => {
  const res = await axios.post(`${API_URL}/signin`, userData);
  return res.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, loading: false, error: null },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // signup
      .addCase(signup.pending, (state) => { state.loading = true; })
      .addCase(signup.fulfilled, (state) => { state.loading = false; })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // signin
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.username;
        state.token = action.payload.token;
      });
  },
});

export const { logout } = authSlice.actions;

// ✅ default export reducer
export default authSlice.reducer;
