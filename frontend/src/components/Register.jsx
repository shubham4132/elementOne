import { useEffect, useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  register,
  removeErrors,
  removeSuccess,
} from "../features/user/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function RegisterForm({ onSwitchToLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // ✅ New state
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "", // ✅ Added confirmPassword
  });
  const { success, error } = useSelector((state) => state.user);

  function handleSubmit(e) {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    dispatch(register(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success("Registration Successful! 🎉");
        onSwitchToLogin();
      }
    });
  }

  function updateField(field, value) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      {/* Full Name */}
      <div className="space-y-1.5">
        <label
          htmlFor="register-name"
          className="text-xs font-semibold text-[#2d5a00] uppercase tracking-wide"
        >
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6CBB00]" />
          <input
            id="register-name"
            type="text"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Enter your full name"
            required
            className="w-full pl-10 pr-3 py-2.5 text-sm rounded-lg border-2 border-[#e0f0cc] bg-[#fafff5] text-[#1a1a1a] placeholder:text-[#999999] focus:border-[#6CBB00] focus:ring-2 focus:ring-[#6CBB00]/20 outline-none transition-all"
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <label
          htmlFor="register-email"
          className="text-xs font-semibold text-[#2d5a00] uppercase tracking-wide"
        >
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6CBB00]" />
          <input
            id="register-email"
            type="email"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full pl-10 pr-3 py-2.5 text-sm rounded-lg border-2 border-[#e0f0cc] bg-[#fafff5] text-[#1a1a1a] placeholder:text-[#999999] focus:border-[#6CBB00] focus:ring-2 focus:ring-[#6CBB00]/20 outline-none transition-all"
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <label
          htmlFor="register-password"
          className="text-xs font-semibold text-[#2d5a00] uppercase tracking-wide"
        >
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6CBB00]" />
          <input
            id="register-password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => updateField("password", e.target.value)}
            placeholder="Create a password"
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

      {/* ✅ Confirm Password - NEW */}
      <div className="space-y-1.5">
        <label
          htmlFor="register-confirm-password"
          className="text-xs font-semibold text-[#2d5a00] uppercase tracking-wide"
        >
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6CBB00]" />
          <input
            id="register-confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) => updateField("confirmPassword", e.target.value)}
            placeholder="Re-enter your password"
            required
            className="w-full pl-10 pr-10 py-2.5 text-sm rounded-lg border-2 border-[#e0f0cc] bg-[#fafff5] text-[#1a1a1a] placeholder:text-[#999999] focus:border-[#6CBB00] focus:ring-2 focus:ring-[#6CBB00]/20 outline-none transition-all"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999999] hover:text-[#6CBB00] transition-colors"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Register Button */}
      <button
        type="submit"
        className="w-full py-2.5 rounded-lg bg-[#2d5a00] text-[#ffffff] font-bold text-sm hover:bg-[#3d7000] active:bg-[#1e3d00] transition-all shadow-md hover:shadow-lg"
      >
        Create Account
      </button>

      {/* Switch to Login */}
      <p className="text-center text-xs text-[#666666]">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-[#6CBB00] hover:text-[#2d5a00] font-bold transition-colors"
        >
          Sign In
        </button>
      </p>
    </form>
  );
}
