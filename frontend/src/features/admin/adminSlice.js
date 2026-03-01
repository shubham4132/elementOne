import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Create Products
// export const createProduct = createAsyncThunk(
//   "admin/createProduct",
//   async (productData, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       };

//       const { data } = await axios.post(
//         "/api/v1/admin/product/create",
//         productData,
//         config,
//       );
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Product Creation Failed");
//     }
//   },
// );
export const createProduct = createAsyncThunk(
  "admin/createProduct",
  async (formData, { rejectWithValue }) => {
    for (let [key, value] of formData.entries()) {
      console.log(key, "→", value);
    }
    try {
      const response = await axios.post(
        "/api/v1/admin/product/create",
        formData,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const fetchAdminProducts = createAsyncThunk(
  "admin/fetchAdminProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/admin/products");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error While Fetching the products",
      );
    }
  },
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    success: false,
    loading: false,
    error: null,
    message: null,
    products1: [],
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.success = false;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        // state.products.push(action.payload.product);
      })
      .addCase(createProduct.rejected, (state, action) => {
        ((state.loading = false),
          (state.error = action.payload?.message || "Product Creation Failed"));
      });

    builder
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products1 = action.payload.products;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        ((state.loading = false),
          (state.error =
            action.payload?.message || "Error While Fetching the products"));
      });
  },
});
export const { removeErrors, removeSuccess, clearMessage } = adminSlice.actions;
export default adminSlice.reducer;
