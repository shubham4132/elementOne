import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./User/userDashboard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./features/user/userSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

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
        />{" "}
      </Routes>
    </Router>
  );
}
