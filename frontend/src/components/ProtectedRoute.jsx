import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { Loader } from "./Loader";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function ProtectedRoute({ element, adminOnly = false }) {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const location = useLocation();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      if (location.pathname === "/checkout") {
        toast.error("Please login to checkout! 🔐", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    }
  }, [loading, isAuthenticated, location.pathname]);

  if (loading) return <Loader />;

  if (!isAuthenticated) return <Navigate to="/" />;

  if (user?.role === "admin" && !adminOnly)
    return <Navigate to="/admin/dashboard" />;

  if (adminOnly && user?.role !== "admin") return <Navigate to="/dashboard" />;

  return element;
}
