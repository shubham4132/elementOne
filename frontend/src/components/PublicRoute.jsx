import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Loader } from "./Loader";

export default function PublicRoute({ element }) {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);

  if (loading) return <Loader />;

  if (isAuthenticated) {
    // Admin ko admin dashboard pe bhejo
    if (user?.role === "admin") return <Navigate to="/admin/dashboard" />;
    // Normal user ko user dashboard pe bhejo
    return <Navigate to="/dashboard" />;
  }

  return element;
}
