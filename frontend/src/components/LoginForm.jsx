import { useEffect, useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

import { login, removeErrors, removeSuccess } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function LoginForm({ onSwitchToRegister }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { success, error } = useSelector((state) => state.user);
  console.log(success, "success");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    // Handle login logic here
    console.log("Email:", email);
    console.log("Password:", password);
    dispatch(login({ email: email, password: password })).then((data) => {
      console.log(data);
    });
  }
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(removeErrors());
    }
  }, [dispatch, error]);
  useEffect(() => {
    if (success) {
      toast.success("Login Successful");
      navigate("/dashboard");
      dispatch(removeSuccess());
    }
  }, [dispatch, success]);
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email Field */}
      <div className="space-y-1.5">
        <label
          htmlFor="login-email"
          className="text-xs font-semibold text-[#2d5a00] uppercase tracking-wide"
        >
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6CBB00]" />
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full pl-10 pr-3 py-2.5 text-sm rounded-lg border-2 border-[#e0f0cc] bg-[#fafff5] text-[#1a1a1a] placeholder:text-[#999999] focus:border-[#6CBB00] focus:ring-2 focus:ring-[#6CBB00]/20 outline-none transition-all"
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="space-y-1.5">
        <label
          htmlFor="login-password"
          className="text-xs font-semibold text-[#2d5a00] uppercase tracking-wide"
        >
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6CBB00]" />
          <input
            id="login-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full pl-10 pr-10 py-2.5 text-sm rounded-lg border-2 border-[#e0f0cc] bg-[#fafff5] text-[#1a1a1a] placeholder:text-[#999999] focus:border-[#6CBB00] focus:ring-2 focus:ring-[#6CBB00]/20 outline-none transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999999] hover:text-[#6CBB00] transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Forgot Password */}
      <div className="flex justify-end">
        <button
          type="button"
          className="text-xs text-[#6CBB00] hover:text-[#2d5a00] font-medium transition-colors"
        >
          Forgot Password?
        </button>
      </div>

      {/* Login Button */}
      <button
        type="submit"
        className="w-full py-2.5 rounded-lg bg-[#6CBB00] text-[#ffffff] font-bold text-sm hover:bg-[#5aaa00] active:bg-[#4a9000] transition-all shadow-md hover:shadow-lg"
      >
        Sign In
      </button>

      {/* Divider */}
      <div className="relative my-3">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#e0f0cc]" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-[#ffffff] px-3 text-xs text-[#999999]">or</span>
        </div>
      </div>

      {/* Switch to Register */}
      <p className="text-center text-xs text-[#666666]">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-[#6CBB00] hover:text-[#2d5a00] font-bold transition-colors"
        >
          Create Account
        </button>
      </p>
    </form>
  );
}
