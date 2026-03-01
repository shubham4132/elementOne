import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import adminReducer from "../features/admin/adminSlice";
import productReducer from "../features/products/productSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    product: productReducer,
  },
});
