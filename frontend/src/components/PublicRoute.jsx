import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Loader } from "./Loader";

export default function PublicRoute({ element }) {
  const { isAuthenticated, loading } = useSelector((state) => state.user);

  if (loading) return <Loader />;

  if (isAuthenticated) return <Navigate to="/dashboard" />;

  return element;
}
