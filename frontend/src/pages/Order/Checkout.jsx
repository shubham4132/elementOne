// import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { clearCart } from "../../features/cart/cartSlice";
import {
  ChevronLeft,
  ShieldCheck,
  Truck,
  Tag,
  MapPin,
  User,
  Phone,
  Mail,
  Home,
  CheckCircle2,
  Package,
  CreditCard,
  Banknote,
  Loader2,
  Leaf,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { createOrder } from "../../features/order/orderSlice";
import { useState } from "react";

const STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu & Kashmir",
];

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const { loading } = useSelector((state) => state.order);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    address2: "",
    city: "",
    state: "Delhi",
    pincode: "",
  });
  const [errors, setErrors] = useState({});

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal > 999 ? 0 : 49;
  const total = subtotal - discount + shipping;

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Valid email required";
    if (!form.phone.trim() || form.phone.length < 10)
      e.phone = "Valid phone required";
    if (!form.address.trim()) e.address = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.pincode.trim() || form.pincode.length < 6)
      e.pincode = "Valid pincode required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── PAYMENT HANDLER — UNTOUCHED ──
  const handlePlaceOrder = async () => {
    if (!validate()) return;

    if (paymentMethod === "cod") {
      const result = await dispatch(
        createOrder({
          shippingInfo: form,
          orderItems: cartItems.map((i) => ({
            product: i.product,
            name: i.name,
            image: i.image,
            price: i.price,
            quantity: i.quantity,
          })),
          paymentMethod: "cod",
          subtotal,
          discount,
          shippingPrice: shipping,
          totalAmount: total,
        }),
      );

      if (result.meta.requestStatus === "fulfilled") {
        setOrderPlaced(true);
        dispatch(clearCart());
        setTimeout(() => navigate("/"), 4000);
      } else {
        alert("Order failed! Please try again.");
      }
      return;
    }

    try {
      const [{ data: keyData }, { data: orderData }] = await Promise.all([
        axios.get("/api/v1/getKey", { withCredentials: true }),
        axios.post(
          "/api/v1/payment/process",
          { amount: total },
          { withCredentials: true },
        ),
      ]);

      sessionStorage.setItem(
        "pendingOrder",
        JSON.stringify({
          shippingInfo: form,
          orderItems: cartItems.map((i) => ({
            product: i.product,
            name: i.name,
            image: i.image,
            price: i.price,
            quantity: i.quantity,
          })),
          paymentMethod: "razorpay",
          subtotal,
          discount,
          shippingPrice: shipping,
          totalAmount: total,
        }),
      );

      const options = {
        key: keyData.key,
        amount: orderData.order.amount,
        currency: "INR",
        name: "Element One Nutrition",
        description: "Order Payment",
        order_id: orderData.order.id,
        prefill: {
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: "#a3e635" },
        handler: async (response) => {
          try {
            const { data } = await axios.post(
              "/api/v1/paymentVerification",
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              },
              { withCredentials: true },
            );
            if (data.success) {
              navigate(`/order/success?reference=${data.reference}`);
            } else {
              alert("Payment verification failed! Contact support.");
            }
          } catch (err) {
            alert("Verification error! Contact support.");
          }
        },
        modal: { ondismiss: () => console.log("Payment cancelled by user") },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Payment initialization failed! Please try again.");
    }
  };

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "GET10") {
      setCouponApplied(true);
    } else {
      alert("Invalid coupon code!");
    }
  };

  // ── ORDER SUCCESS SCREEN ──
  if (orderPlaced) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{
          background:
            "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #f0fdf4 100%)",
        }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600&display=swap');
          .success-wrap * { font-family: 'DM Sans', sans-serif; }
          @keyframes popIn { from { transform: scale(0) rotate(-10deg); opacity: 0; } to { transform: scale(1) rotate(0deg); opacity: 1; } }
          @keyframes fadeUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
          @keyframes pulse-ring { 0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(163,230,53,0.5); } 70% { transform: scale(1); box-shadow: 0 0 0 20px rgba(163,230,53,0); } 100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(163,230,53,0); } }
        `}</style>
        <div className="success-wrap text-center max-w-sm w-full">
          <div
            style={{
              animation: "popIn 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards",
            }}
            className="w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #a3e635, #65a30d)",
              animation:
                "popIn 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards, pulse-ring 2s ease-in-out 0.6s infinite",
            }}
          >
            <CheckCircle2 size={52} className="text-white" strokeWidth={2} />
          </div>
          <div style={{ animation: "fadeUp 0.5s ease 0.3s both" }}>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-lime-600 mb-2">
              Order Confirmed
            </p>
            <h1
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "2.4rem",
                lineHeight: 1.1,
                color: "#1a2e05",
              }}
              className="mb-3"
            >
              Thank you!
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Your order has been placed successfully.
              <br />
              We'll send you a confirmation shortly.
            </p>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-green-100 mb-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-lime-50 flex items-center justify-center flex-shrink-0">
                <Truck size={18} className="text-lime-600" />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-400 mb-0.5">
                  Estimated delivery
                </p>
                <p className="text-sm font-semibold text-gray-800">
                  3–5 business days
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-xs">Redirecting to home...</p>
          </div>
        </div>
      </div>
    );
  }

  // ── MAIN CHECKOUT ──
  return (
    <div className="min-h-screen" style={{ background: "#f8faf5" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
        .co * { font-family: 'DM Sans', sans-serif; }
        .co-title { font-family: 'DM Serif Display', serif; }
        .fi {
          width: 100%; padding: 11px 14px; border-radius: 10px; font-size: 14px;
          border: 1.5px solid #e2e8d5; outline: none;
          background: #fff; color: #1c2b0a; font-family: 'DM Sans', sans-serif;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .fi:focus { border-color: #84cc16; box-shadow: 0 0 0 3px rgba(132,204,22,0.12); }
        .fi-err { border-color: #ef4444 !important; }
        .fi::placeholder { color: #aab89a; }
        .section-card {
          background: #fff;
          border-radius: 20px;
          border: 1px solid #e8f0de;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(40,80,10,0.06);
        }
        .section-head {
          padding: 18px 24px;
          border-bottom: 1px solid #f0f7e6;
          display: flex; align-items: center; gap: 12px;
        }
        .section-icon {
          width: 36px; height: 36px; border-radius: 10px;
          background: linear-gradient(135deg, #d9f99d, #a3e635);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .pay-option {
          border: 1.5px solid #e8f0de;
          border-radius: 14px;
          padding: 16px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex; align-items: center; gap: 14px;
          background: #fff;
        }
        .pay-option:hover { border-color: #a3e635; background: #f9ffe6; }
        .pay-option.active { border-color: #84cc16; background: #f0fdf0; box-shadow: 0 0 0 3px rgba(132,204,22,0.1); }
        .radio-dot {
          width: 20px; height: 20px; border-radius: 50%;
          border: 2px solid #d1e0b8; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          transition: border-color 0.2s;
        }
        .pay-option.active .radio-dot { border-color: #84cc16; }
        .order-btn {
          width: 100%;
          padding: 16px;
          border-radius: 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          background: linear-gradient(135deg, #a3e635 0%, #65a30d 100%);
          color: #1a2e05;
          box-shadow: 0 4px 20px rgba(101,163,13,0.3);
          transition: all 0.2s;
          letter-spacing: -0.01em;
        }
        .order-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 24px rgba(101,163,13,0.4); }
        .order-btn:active { transform: translateY(0); }
        .order-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .summary-card {
          background: #fff;
          border-radius: 20px;
          border: 1px solid #e8f0de;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(40,80,10,0.06);
        }
        select.fi { cursor: pointer; }
        .badge-pill {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 3px 10px; border-radius: 20px;
          font-size: 11px; font-weight: 600; letter-spacing: 0.02em;
        }
      `}</style>

      <div className="co">
        {/* ── HEADER ── */}
        <div
          style={{
            background: "#fff",
            borderBottom: "1px solid #e8f0de",
            position: "sticky",
            top: 0,
            zIndex: 50,
          }}
        >
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            {/* Back */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm font-medium transition-colors"
              style={{ color: "#4a7c15" }}
            >
              <div
                style={{
                  background: "#f0fdf0",
                  borderRadius: 8,
                  padding: "6px 10px",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  border: "1px solid #d9f99d",
                }}
              >
                <ChevronLeft size={15} strokeWidth={2.5} />
                <span>Back</span>
              </div>
            </button>

            {/* Logo */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div
                style={{
                  background: "linear-gradient(135deg, #a3e635, #65a30d)",
                  borderRadius: 10,
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Leaf size={18} className="text-white" />
              </div>
              <div>
                <p
                  className="co-title"
                  style={{
                    fontSize: "1.1rem",
                    color: "#1a2e05",
                    lineHeight: 1,
                  }}
                >
                  Element One
                </p>
                <p
                  style={{
                    fontSize: 10,
                    color: "#78a832",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Secure Checkout
                </p>
              </div>
            </div>

            {/* Trust */}
            <div
              className="flex items-center gap-1.5"
              style={{ color: "#65a30d" }}
            >
              <ShieldCheck size={16} strokeWidth={2} />
              <span
                className="text-xs font-medium hidden sm:inline"
                style={{ color: "#4a7c15" }}
              >
                100% Secure
              </span>
            </div>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* ── LEFT COLUMN ── */}
            <div className="lg:col-span-2 space-y-5">
              {/* Shipping Details */}
              <div className="section-card">
                <div className="section-head">
                  <div className="section-icon">
                    <MapPin size={16} style={{ color: "#3f6212" }} />
                  </div>
                  <div>
                    <p
                      className="font-semibold text-sm"
                      style={{ color: "#1a2e05" }}
                    >
                      Delivery Details
                    </p>
                    <p className="text-xs" style={{ color: "#78a832" }}>
                      Where should we send your order?
                    </p>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {/* Name row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-xs font-semibold mb-1.5"
                        style={{
                          color: "#4a7c15",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        First Name *
                      </label>
                      <input
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="Rahul"
                        className={`fi ${errors.firstName ? "fi-err" : ""}`}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        className="block text-xs font-semibold mb-1.5"
                        style={{
                          color: "#4a7c15",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        Last Name *
                      </label>
                      <input
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Sharma"
                        className={`fi ${errors.lastName ? "fi-err" : ""}`}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Contact row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-xs font-semibold mb-1.5"
                        style={{
                          color: "#4a7c15",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        Email *
                      </label>
                      <div className="relative">
                        <input
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="rahul@email.com"
                          type="email"
                          className={`fi ${errors.email ? "fi-err" : ""}`}
                          style={{ paddingLeft: 38 }}
                        />
                        <Mail
                          size={14}
                          className="absolute left-3 top-3.5"
                          style={{ color: "#aab89a" }}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        className="block text-xs font-semibold mb-1.5"
                        style={{
                          color: "#4a7c15",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        Phone *
                      </label>
                      <div className="relative">
                        <input
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="9876543210"
                          type="tel"
                          maxLength={10}
                          className={`fi ${errors.phone ? "fi-err" : ""}`}
                          style={{ paddingLeft: 38 }}
                        />
                        <Phone
                          size={14}
                          className="absolute left-3 top-3.5"
                          style={{ color: "#aab89a" }}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label
                      className="block text-xs font-semibold mb-1.5"
                      style={{
                        color: "#4a7c15",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Street Address *
                    </label>
                    <div className="relative mb-2">
                      <input
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="House No, Street Name"
                        className={`fi ${errors.address ? "fi-err" : ""}`}
                        style={{ paddingLeft: 38 }}
                      />
                      <Home
                        size={14}
                        className="absolute left-3 top-3.5"
                        style={{ color: "#aab89a" }}
                      />
                    </div>
                    <input
                      name="address2"
                      value={form.address2}
                      onChange={handleChange}
                      placeholder="Apartment, Colony (optional)"
                      className="fi"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  {/* City / State / PIN */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label
                        className="block text-xs font-semibold mb-1.5"
                        style={{
                          color: "#4a7c15",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        City *
                      </label>
                      <input
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        placeholder="New Delhi"
                        className={`fi ${errors.city ? "fi-err" : ""}`}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.city}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        className="block text-xs font-semibold mb-1.5"
                        style={{
                          color: "#4a7c15",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        State *
                      </label>
                      <select
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        className="fi"
                      >
                        {STATES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        className="block text-xs font-semibold mb-1.5"
                        style={{
                          color: "#4a7c15",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        PIN Code *
                      </label>
                      <input
                        name="pincode"
                        value={form.pincode}
                        onChange={handleChange}
                        placeholder="110001"
                        maxLength={6}
                        type="tel"
                        className={`fi ${errors.pincode ? "fi-err" : ""}`}
                      />
                      {errors.pincode && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.pincode}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="section-card">
                <div className="section-head">
                  <div className="section-icon">
                    <CreditCard size={16} style={{ color: "#3f6212" }} />
                  </div>
                  <div>
                    <p
                      className="font-semibold text-sm"
                      style={{ color: "#1a2e05" }}
                    >
                      Payment Method
                    </p>
                    <p className="text-xs" style={{ color: "#78a832" }}>
                      Choose how you'd like to pay
                    </p>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  {/* COD */}
                  <div
                    className={`pay-option ${paymentMethod === "cod" ? "active" : ""}`}
                    onClick={() => setPaymentMethod("cod")}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background:
                          paymentMethod === "cod" ? "#f0fdf0" : "#f8faf5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        border: "1px solid #e8f0de",
                      }}
                    >
                      <Banknote size={20} style={{ color: "#65a30d" }} />
                    </div>
                    <div className="flex-1">
                      <p
                        className="font-semibold text-sm"
                        style={{ color: "#1a2e05" }}
                      >
                        Cash on Delivery
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "#78a832" }}
                      >
                        Pay when your order arrives
                      </p>
                    </div>
                    <div className="radio-dot">
                      {paymentMethod === "cod" && (
                        <div
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            background: "#84cc16",
                          }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Razorpay */}
                  <div
                    className={`pay-option ${paymentMethod === "razorpay" ? "active" : ""}`}
                    onClick={() => setPaymentMethod("razorpay")}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background:
                          paymentMethod === "razorpay" ? "#eff6ff" : "#f8faf5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        border: "1px solid #e8f0de",
                      }}
                    >
                      <CreditCard size={20} style={{ color: "#3b82f6" }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p
                          className="font-semibold text-sm"
                          style={{ color: "#1a2e05" }}
                        >
                          Pay Online
                        </p>
                        <span
                          className="badge-pill"
                          style={{ background: "#eff6ff", color: "#1d4ed8" }}
                        >
                          Razorpay
                        </span>
                      </div>
                      <p className="text-xs" style={{ color: "#78a832" }}>
                        UPI · Card · NetBanking · Wallet
                      </p>
                    </div>
                    <div className="radio-dot">
                      {paymentMethod === "razorpay" && (
                        <div
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            background: "#84cc16",
                          }}
                        />
                      )}
                    </div>
                  </div>

                  {paymentMethod === "razorpay" && (
                    <div className="flex flex-wrap gap-2 pt-1 px-1">
                      {[
                        "UPI",
                        "PhonePe",
                        "GPay",
                        "Paytm",
                        "Visa",
                        "Mastercard",
                        "RuPay",
                        "NetBanking",
                      ].map((p) => (
                        <span
                          key={p}
                          className="badge-pill"
                          style={{
                            background: "#f0f7e6",
                            color: "#4a7c15",
                            border: "1px solid #d9f99d",
                          }}
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="order-btn"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    <Package size={18} />
                    {paymentMethod === "cod"
                      ? "Place Order"
                      : "Pay with Razorpay"}
                    <span style={{ margin: "0 4px", opacity: 0.5 }}>·</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                    <ArrowRight size={16} style={{ marginLeft: "auto" }} />
                  </>
                )}
              </button>

              {/* Trust strip */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    icon: (
                      <ShieldCheck size={15} style={{ color: "#65a30d" }} />
                    ),
                    label: "100% Secure",
                    sub: "SSL Encrypted",
                  },
                  {
                    icon: <Truck size={15} style={{ color: "#3b82f6" }} />,
                    label: "Fast Delivery",
                    sub: "3–5 business days",
                  },
                  {
                    icon: <Package size={15} style={{ color: "#f97316" }} />,
                    label: "Easy Returns",
                    sub: "Hassle-free policy",
                  },
                ].map((b) => (
                  <div
                    key={b.label}
                    style={{
                      background: "#fff",
                      border: "1px solid #e8f0de",
                      borderRadius: 14,
                      padding: "12px 14px",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {b.icon}
                      <span
                        className="text-xs font-semibold"
                        style={{ color: "#1a2e05" }}
                      >
                        {b.label}
                      </span>
                    </div>
                    <p className="text-xs" style={{ color: "#9cb87a" }}>
                      {b.sub}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: ORDER SUMMARY ── */}
            <div className="space-y-4 lg:sticky lg:top-24">
              {/* Items */}
              <div className="summary-card">
                <div
                  style={{
                    background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
                    padding: "16px 20px",
                    borderBottom: "1px solid #e8f0de",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    className="font-semibold text-sm"
                    style={{ color: "#1a2e05" }}
                  >
                    Order Summary
                  </p>
                  <span
                    className="badge-pill"
                    style={{
                      background: "#fff",
                      color: "#4a7c15",
                      border: "1px solid #d9f99d",
                    }}
                  >
                    {cartItems.length}{" "}
                    {cartItems.length === 1 ? "item" : "items"}
                  </span>
                </div>
                <div style={{ maxHeight: 280, overflowY: "auto" }}>
                  {cartItems.map((item) => (
                    <div
                      key={item.product}
                      style={{
                        display: "flex",
                        gap: 12,
                        padding: "14px 20px",
                        borderBottom: "1px solid #f0f7e6",
                      }}
                    >
                      <div
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: 10,
                          overflow: "hidden",
                          background: "#f0f7e6",
                          flexShrink: 0,
                          border: "1px solid #e8f0de",
                        }}
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Package size={18} style={{ color: "#a3e635" }} />
                          </div>
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p
                          className="text-sm font-medium"
                          style={{
                            color: "#1a2e05",
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {item.name}
                        </p>
                        <p
                          className="text-xs mt-0.5"
                          style={{ color: "#9cb87a" }}
                        >
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <p
                          className="text-sm font-semibold"
                          style={{ color: "#1a2e05" }}
                        >
                          ₹
                          {(item.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                        <p className="text-xs" style={{ color: "#9cb87a" }}>
                          ₹{item.price} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coupon */}
              <div className="summary-card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Tag size={14} style={{ color: "#65a30d" }} />
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "#1a2e05" }}
                  >
                    Have a coupon?
                  </span>
                </div>
                {couponApplied ? (
                  <div
                    style={{
                      background: "#f0fdf0",
                      border: "1px solid #bbf7d0",
                      borderRadius: 10,
                      padding: "10px 14px",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Sparkles size={14} style={{ color: "#16a34a" }} />
                    <span
                      className="text-sm font-semibold"
                      style={{ color: "#16a34a" }}
                    >
                      GET10 applied — 10% off!
                    </span>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Enter coupon code"
                      className="fi flex-1"
                      style={{ textTransform: "uppercase" }}
                    />
                    <button
                      onClick={applyCoupon}
                      style={{
                        background: "#a3e635",
                        color: "#1a2e05",
                        fontWeight: 600,
                        fontSize: 13,
                        padding: "0 16px",
                        borderRadius: 10,
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "'DM Sans', sans-serif",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="summary-card p-5">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "#6b8f4a" }}>Subtotal</span>
                    <span className="font-medium" style={{ color: "#1a2e05" }}>
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span style={{ color: "#16a34a" }}>Discount (10%)</span>
                      <span
                        className="font-medium"
                        style={{ color: "#16a34a" }}
                      >
                        –₹{discount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span
                      className="flex items-center gap-1.5"
                      style={{ color: "#6b8f4a" }}
                    >
                      <Truck size={13} /> Shipping
                    </span>
                    <span
                      className="font-medium"
                      style={{ color: shipping === 0 ? "#16a34a" : "#1a2e05" }}
                    >
                      {shipping === 0 ? "FREE" : `₹${shipping}`}
                    </span>
                  </div>
                  {shipping === 0 && (
                    <p
                      className="text-xs"
                      style={{
                        background: "#f0fdf0",
                        border: "1px solid #bbf7d0",
                        borderRadius: 8,
                        padding: "8px 12px",
                        color: "#16a34a",
                      }}
                    >
                      🎉 Free shipping on orders above ₹999!
                    </p>
                  )}
                  <div
                    style={{
                      borderTop: "1.5px dashed #e8f0de",
                      paddingTop: 12,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      className="font-semibold text-sm"
                      style={{ color: "#1a2e05" }}
                    >
                      Total
                    </span>
                    <span
                      className="co-title"
                      style={{
                        fontSize: "1.6rem",
                        color: "#1a2e05",
                        lineHeight: 1,
                      }}
                    >
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Delivery note */}
              <div
                style={{
                  background: "#f0fdf0",
                  border: "1px solid #d9f99d",
                  borderRadius: 14,
                  padding: "14px 16px",
                  display: "flex",
                  gap: 10,
                }}
              >
                <MapPin
                  size={15}
                  style={{ color: "#65a30d", flexShrink: 0, marginTop: 1 }}
                />
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "#1a2e05" }}
                  >
                    Delivering across India
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#78a832" }}>
                    Estimated: 3–5 business days
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
