import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import adminReducer from "../features/admin/adminSlice";
import productReducer from "../features/products/productSlice";
import cartReducer from "../features/cart/cartSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    admin: adminReducer,
  },
});
