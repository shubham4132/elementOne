import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Camera,
  CheckCircle,
  ArrowLeft,
  Edit3,
  Save,
  X,
  ShoppingBag,
  Heart,
  Download,
  Star,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ── Stats shown at top of profile ─────────────────────────────────────────────
const stats = [
  {
    label: "Orders",
    value: "0",
    icon: ShoppingBag,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    label: "Wishlist",
    value: "0",
    icon: Heart,
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
  {
    label: "Downloads",
    value: "0",
    icon: Download,
    color: "text-lime-700",
    bg: "bg-lime-50",
  },
  {
    label: "Reviews",
    value: "0",
    icon: Star,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

// ── Reusable input field ───────────────────────────────────────────────────────
function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  icon: Icon,
  editing,
  placeholder,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 flex-shrink-0"
          />
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          disabled={!editing}
          placeholder={placeholder}
          className={`
            w-full ${Icon ? "pl-10" : "pl-4"} pr-4 py-3 rounded-xl text-sm font-medium
            border transition-all duration-200 outline-none
            ${
              editing
                ? "border-lime-400 bg-white text-gray-800 focus:ring-2 focus:ring-lime-300 focus:border-lime-500"
                : "border-gray-100 bg-gray-50 text-gray-700 cursor-default"
            }
          `}
        />
      </div>
    </div>
  );
}

// ── Main Profile Page ──────────────────────────────────────────────────────────
export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("profile"); // profile | security

  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    address: user?.address ?? "",
    city: user?.city ?? "",
    pincode: user?.pincode ?? "",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const initials = form.name
    ? form.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handlePassChange = (e) =>
    setPasswords((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = () => {
    // dispatch(updateUser(form)); // ← apna Redux action yahan add karo
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCancel = () => {
    setForm({
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      address: user?.address ?? "",
      city: user?.city ?? "",
      pincode: user?.pincode ?? "",
    });
    setEditing(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* ── Back button ── */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-lime-700 transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>

        {/* ── HERO CARD ── */}
        <div className="relative bg-gradient-to-br from-[#1B5E87] via-[#0f4a6e] to-[#0c2f40] rounded-3xl overflow-hidden shadow-xl">
          {/* decorative circles */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-lime-400/10 rounded-full" />
          <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-white/5 rounded-full" />
          <div className="absolute top-4 right-32 w-20 h-20 bg-lime-400/5 rounded-full" />

          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-end gap-5 px-7 pt-10 pb-7">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 rounded-full bg-lime-400 flex items-center justify-center text-3xl font-extrabold text-gray-900 border-4 border-white/30 shadow-lg">
                {initials}
              </div>
              {/* Camera overlay */}
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-lime-400 border-2 border-white flex items-center justify-center shadow hover:bg-lime-500 transition-colors">
                <Camera size={13} className="text-gray-900" />
              </button>
            </div>

            {/* Name & email */}
            <div className="text-center sm:text-left flex-1 pb-1">
              <h1 className="text-2xl font-extrabold text-white leading-tight">
                {form.name || "Your Name"}
              </h1>
              <p className="text-white/60 text-sm mt-0.5">{form.email}</p>
              <span className="inline-flex items-center gap-1 mt-2 text-[11px] font-bold text-lime-300 bg-lime-400/10 border border-lime-400/20 px-2.5 py-0.5 rounded-full">
                <CheckCircle size={10} /> Verified Account
              </span>
            </div>

            {/* Edit / Save buttons */}
            <div className="flex gap-2 pb-1">
              {editing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all"
                  >
                    <X size={13} /> Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-lime-400 hover:bg-lime-500 text-gray-900 text-xs font-bold shadow transition-all"
                  >
                    <Save size={13} /> Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-lime-400 hover:text-gray-900 text-white text-xs font-bold border border-white/20 transition-all"
                >
                  <Edit3 size={13} /> Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Stats row */}
          <div className="relative z-10 grid grid-cols-4 border-t border-white/10">
            {stats.map(({ label, value, icon: Icon }, i) => (
              <div
                key={label}
                className={`flex flex-col items-center py-4 ${i < 3 ? "border-r border-white/10" : ""}`}
              >
                <Icon size={16} className="text-lime-400 mb-1" />
                <span className="text-xl font-extrabold text-white">
                  {value}
                </span>
                <span className="text-[10px] text-white/50 font-medium">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── SUCCESS TOAST ── */}
        {saved && (
          <div className="flex items-center gap-3 bg-lime-50 border border-lime-300 text-lime-800 text-sm font-semibold px-5 py-3 rounded-xl shadow-sm">
            <CheckCircle size={16} className="text-lime-600" />
            Profile updated successfully!
          </div>
        )}

        {/* ── TABS ── */}
        <div className="flex gap-1 bg-white rounded-2xl p-1.5 shadow-sm border border-gray-100 w-fit">
          {["profile", "security"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl text-xs font-bold capitalize transition-all duration-200
                ${
                  activeTab === tab
                    ? "bg-lime-400 text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
            >
              {tab === "profile" ? "👤 Profile Info" : "🔒 Security"}
            </button>
          ))}
        </div>

        {/* ── PROFILE TAB ── */}
        {activeTab === "profile" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Personal info */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="font-extrabold text-gray-800 text-base">
                  Personal Information
                </h2>
                {editing && (
                  <span className="text-[10px] bg-lime-100 text-lime-700 font-bold px-2.5 py-0.5 rounded-full border border-lime-200">
                    Editing mode ON
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Full Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  icon={User}
                  editing={editing}
                  placeholder="Your full name"
                />
                <Field
                  label="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  icon={Mail}
                  editing={editing}
                  placeholder="your@email.com"
                />
                <Field
                  label="Phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  icon={Phone}
                  editing={editing}
                  placeholder="+91 XXXXX XXXXX"
                />
                <Field
                  label="City"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  icon={MapPin}
                  editing={editing}
                  placeholder="Your city"
                />
                <Field
                  label="Pincode"
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  editing={editing}
                  placeholder="110001"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1.5">
                  Full Address
                </label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  disabled={!editing}
                  rows={3}
                  placeholder="House no, Street, Area..."
                  className={`
                    w-full px-4 py-3 rounded-xl text-sm font-medium resize-none
                    border transition-all duration-200 outline-none
                    ${
                      editing
                        ? "border-lime-400 bg-white text-gray-800 focus:ring-2 focus:ring-lime-300"
                        : "border-gray-100 bg-gray-50 text-gray-700 cursor-default"
                    }
                  `}
                />
              </div>

              {/* Save / Edit buttons inside card too */}
              {editing && (
                <div className="flex gap-3 pt-1">
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition"
                  >
                    <X size={14} /> Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-lime-400 hover:bg-lime-500 text-gray-900 text-sm font-bold shadow transition"
                  >
                    <Save size={14} /> Save Changes
                  </button>
                </div>
              )}
            </div>

            {/* Quick links card */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-extrabold text-gray-800 text-sm mb-4">
                  Quick Access
                </h3>
                <div className="space-y-2">
                  {[
                    {
                      label: "My Orders",
                      icon: ShoppingBag,
                      href: "/orders",
                      color: "text-blue-600",
                      bg: "bg-blue-50",
                    },
                    {
                      label: "My Wishlist",
                      icon: Heart,
                      href: "/wishlist",
                      color: "text-pink-600",
                      bg: "bg-pink-50",
                    },
                    {
                      label: "Downloads",
                      icon: Download,
                      href: "/downloads",
                      color: "text-lime-700",
                      bg: "bg-lime-50",
                    },
                  ].map(({ label, icon: Icon, href, color, bg }) => (
                    <a
                      key={label}
                      href={href}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
                    >
                      <div
                        className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon size={15} className={color} />
                      </div>
                      <span className="text-sm font-semibold text-gray-600 group-hover:text-gray-800">
                        {label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Member since */}
              <div className="bg-gradient-to-br from-lime-400 to-green-500 rounded-2xl p-5 text-gray-900">
                <p className="text-xs font-bold opacity-70 mb-1">
                  MEMBER SINCE
                </p>
                <p className="text-lg font-extrabold">February 2026</p>
                <p className="text-xs mt-2 opacity-70">
                  Thanks for being with us! 🌿
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── SECURITY TAB ── */}
        {activeTab === "security" && (
          <div className="max-w-lg">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
              <h2 className="font-extrabold text-gray-800 text-base">
                Change Password
              </h2>

              <Field
                label="Current Password"
                name="current"
                type="password"
                value={passwords.current}
                onChange={handlePassChange}
                icon={Lock}
                editing={true}
                placeholder="Enter current password"
              />
              <Field
                label="New Password"
                name="newPass"
                type="password"
                value={passwords.newPass}
                onChange={handlePassChange}
                icon={Lock}
                editing={true}
                placeholder="Enter new password"
              />
              <Field
                label="Confirm New Password"
                name="confirm"
                type="password"
                value={passwords.confirm}
                onChange={handlePassChange}
                icon={Lock}
                editing={true}
                placeholder="Confirm new password"
              />

              {/* Password strength indicator */}
              {passwords.newPass && (
                <div>
                  <p className="text-xs text-gray-500 font-semibold mb-1.5">
                    Password Strength
                  </p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-300
                        ${
                          passwords.newPass.length >= i * 3
                            ? i <= 1
                              ? "bg-red-400"
                              : i <= 2
                                ? "bg-amber-400"
                                : i <= 3
                                  ? "bg-lime-400"
                                  : "bg-green-500"
                            : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1">
                    {passwords.newPass.length < 4
                      ? "Weak"
                      : passwords.newPass.length < 7
                        ? "Fair"
                        : passwords.newPass.length < 10
                          ? "Good"
                          : "Strong"}
                  </p>
                </div>
              )}

              <button
                disabled={
                  !passwords.current ||
                  !passwords.newPass ||
                  passwords.newPass !== passwords.confirm
                }
                className="w-full py-3 rounded-xl bg-lime-400 hover:bg-lime-500 text-gray-900 font-bold text-sm
                           disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow"
              >
                Update Password
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
