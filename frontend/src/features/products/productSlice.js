import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// export const getProduct = createAsyncThunk(
//   "product/getProduct",
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.get("/api/v1/products");
//       return data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || "Error While Fetching the products",
//       );
//     }
//   },
// );

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async ({ keyword, category }, { rejectWithValue }) => {
    try {
      let link = "/api/v1/products";

      if (keyword) {
        link += `?keyword=${keyword}`;
      }
      if (category) {
        link += `?category=${category}`;
      }

      const { data } = await axios.get(link);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  },
);
const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productCount: 0,
    loading: false,
    error: null,
    product: null,
    resultsPerPage: 4,
    totalPages: 0,
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.reviewSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = action.payload.products;
        // state.productCount = action.payload.productCount;
        // state.resultsPerPage = action.payload.resultsPerPage;
        // state.totalPages = action.payload.totalPages;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
        state.products = [];
      });
  },
});
export const { removeErrors, removeSuccess } = productSlice.actions;
export default productSlice.reducer;
