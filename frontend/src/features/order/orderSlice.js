import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (order, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("/api/v1/order/cod", order, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Order Creating Failed");
    }
  },
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    success: false,
    loading: false,
    error: null,
    orders: [],
    order: {},
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
        state.success = action.payload.success;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Order Creating Failed";
      }); // ← yahan semicolon, comma nahi
  },
});
export const { removeErrors, removeSuccess } = orderSlice.actions;
export default orderSlice.reducer;
