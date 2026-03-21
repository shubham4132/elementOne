import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./features/user/userSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./User/UserDashboard";
import AdminDashboard from "./Admin/pages/AdminDashboard";
import AdminCreateProduct from "./Admin/pages/AdminCreateProduct";
import AdminProducts from "./Admin/pages/AdminProducts";
import ProductDetails from "./pages/Product/ProductDetails";
import Products from "./pages/Product/Products";
import AdminEditProduct from "./Admin/pages/AdminEditProduct";
import Checkout from "./pages/Order/checkout";
import OrderSuccess from "./pages/Order/OrderSuccess";
import Order from "./pages/Order/Order";
import AdminOrders from "./Admin/pages/AdminOrders";
import Wishlist from "./pages/Wish/wishlist";
import NotFound from "./pages/Notfound/NotFound";

function PageTitle() {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      "/": "Home - Element One Nutrition",
      "/checkout": "Checkout - Element One Nutrition",
      "/dashboard": "Dashboard - Element One Nutrition",
      "/order": "Orders - Element One Nutrition",
      "/wishlist": "Wishlist - Element One Nutrition",
      "/admin/dashboard": "Admin Dashboard - Element One Nutrition",
      "/admin/products": "Admin Products - Element One Nutrition",
      "/admin/orders": "Admin Orders - Element One Nutrition",
    };
    document.title = titles[location.pathname] || "Element One Nutrition";
  }, [location.pathname]);

  return null;
}

export default function App() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <PageTitle />
      <ToastContainer position="top-right" autoClose={1500} />
      <Routes>
        {/* ── Public Routes — sabke liye ── */}
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />

        {/* ── User Routes — sirf logged in normal user ── */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard user={user} />} />}
        />
        <Route
          path="/checkout"
          element={<ProtectedRoute element={<Checkout />} />}
        />
        <Route path="/order" element={<ProtectedRoute element={<Order />} />} />
        <Route
          path="/order/success"
          element={<ProtectedRoute element={<OrderSuccess />} />}
        />
        <Route
          path="/wishlist"
          element={<ProtectedRoute element={<Wishlist />} />}
        />

        {/* ── Admin Routes — sirf admin ── */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute
              adminOnly
              element={<AdminDashboard user={user} />}
            />
          }
        />
        <Route
          path="/admin/products/create"
          element={
            <ProtectedRoute adminOnly element={<AdminCreateProduct />} />
          }
        />
        <Route
          path="/admin/products"
          element={<ProtectedRoute adminOnly element={<AdminProducts />} />}
        />
        <Route
          path="/admin/product/edit/:id"
          element={<ProtectedRoute adminOnly element={<AdminEditProduct />} />}
        />
        <Route
          path="/admin/orders"
          element={<ProtectedRoute adminOnly element={<AdminOrders />} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
