import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axiosInstance";

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
  async ({ keyword, category, page = 1 } = {}, { rejectWithValue }) => {
    try {
      let link = `/api/v1/products?page=${page}`; // ✅ page hamesha bhejo

      if (keyword) link += `&keyword=${keyword}`; // ✅ & use karo, ? nahi
      if (category) link += `&category=${category}`; // ✅ & use karo, ? nahi

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
        state.productCount = action.payload.productCount;
        state.resultsPerPage = action.payload.resultsPerPage;
        state.totalPages = action.payload.totalPages;
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
