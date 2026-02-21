import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Loader } from "./Loader";

export default function ProtectedRoute({ element }) {
  const { isAuthenticated, loading } = useSelector((state) => state.user);

  if (loading) return <Loader />;

  if (!isAuthenticated) return <Navigate to="/" />;

  return element;
}
