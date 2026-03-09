import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./features/user/userSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./User/UserDashboard";
import PublicRoute from "./components/PublicRoute";
import AdminDashboard from "./Admin/pages/AdminDashboard";
import AdminCreateProduct from "./Admin/pages/AdminCreateProduct";
import AdminProducts from "./Admin/pages/AdminProducts";
import ProductDetails from "./pages/Product/ProductDetails";
import Products from "./pages/Product/Products";
import AdminEditProduct from "./Admin/pages/AdminEditProduct";
import Checkout from "./pages/Order/checkout";

export default function App() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicRoute element={<Home />} />} />{" "}
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard user={user} />} />}
        />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard user={user} />}
        />
        <Route path="/admin/products/create" element={<AdminCreateProduct />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/product/edit/:id" element={<AdminEditProduct />} />
      </Routes>
    </Router>
  );
}
