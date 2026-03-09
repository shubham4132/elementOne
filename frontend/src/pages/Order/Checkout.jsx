import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { clearCart } from "../../features/cart/cartSlice";
import {
  ChevronRight,
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
} from "lucide-react";

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

const STEPS = ["Cart", "Billing", "Payment", "Confirm"];

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handlePlaceOrder = async () => {
    if (!validate()) return;

    // ✅ COD — seedha order place
    if (paymentMethod === "cod") {
      setOrderPlaced(true);
      dispatch(clearCart());
      setTimeout(() => navigate("/"), 4000);
      return;
    }

    // ✅ Razorpay — online payment
    try {
      setLoading(true);

      const { data } = await axios.post(
        "/api/v1/payment/razorpay",
        { amount: total },
        { withCredentials: true },
      );

      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: "INR",
        name: "Element One Nutrition",
        description: "Order Payment",
        order_id: data.order.id,
        prefill: {
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: "#a3e635" },
        handler: () => {
          setLoading(false);
          setOrderPlaced(true);
          dispatch(clearCart());
          setTimeout(() => navigate("/"), 4000);
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      setLoading(false);
      alert("Payment failed! Please try again.");
    }
  };

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "GET10") {
      setCouponApplied(true);
    } else {
      alert("Invalid coupon code!");
    }
  };

  // ✅ Order Success Screen
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div
            className="w-24 h-24 bg-lime-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
            style={{ animation: "popIn 0.5s ease-out" }}
          >
            <CheckCircle2 size={48} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Order Placed!
          </h1>
          <p className="text-gray-500 mb-6">
            Thank you for your order. We'll send you a confirmation shortly.
          </p>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Truck size={18} className="text-lime-500" />
              <span>
                Estimated delivery:{" "}
                <strong className="text-gray-800">3-5 business days</strong>
              </span>
            </div>
          </div>
          <p className="text-gray-400 text-sm">Redirecting to home...</p>
          <style>{`@keyframes popIn { from { transform: scale(0); } to { transform: scale(1); } }`}</style>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Outfit', sans-serif; }
        .input-field {
          width: 100%; padding: 11px 14px; border-radius: 10px; font-size: 14px;
          border: 1.5px solid #e5e7eb; outline: none; transition: border 0.2s, box-shadow 0.2s;
          background: white;
        }
        .input-field:focus { border-color: #a3e635; box-shadow: 0 0 0 3px rgba(163,230,53,0.15); }
        .input-error { border-color: #ef4444 !important; }
      `}</style>

      {/* ── Header ── */}
      <div className="bg-lime-400 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm">
              <span className="text-lime-600 font-black text-sm">E1</span>
            </div>
            <span className="font-bold text-gray-800 text-lg">Element One</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-1">
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all
                  ${
                    i === step
                      ? "bg-white text-green-700 shadow-sm"
                      : i < step
                        ? "bg-green-700 text-white"
                        : "bg-lime-300 text-gray-600"
                  }`}
                >
                  {i < step ? <CheckCircle2 size={12} /> : <span>{i + 1}</span>}
                  {s}
                </div>
                {i < STEPS.length - 1 && (
                  <ChevronRight size={14} className="text-lime-600" />
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-700 font-medium">
            <ShieldCheck size={15} className="text-green-700" />
            Secure Checkout
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* ── LEFT ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Billing Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-lime-400 to-lime-300 px-6 py-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <User size={15} className="text-green-700" />
                </div>
                <h2 className="font-bold text-gray-800 text-base">
                  Billing Details
                </h2>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
                      First Name *
                    </label>
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="Rahul"
                      className={`input-field ${errors.firstName ? "input-error" : ""}`}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
                      Last Name *
                    </label>
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Sharma"
                      className={`input-field ${errors.lastName ? "input-error" : ""}`}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
                      Email *
                    </label>
                    <div className="relative">
                      <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="rahul@email.com"
                        type="email"
                        className={`input-field pl-9 ${errors.email ? "input-error" : ""}`}
                      />
                      <Mail
                        size={14}
                        className="absolute left-3 top-3.5 text-gray-400"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
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
                        className={`input-field pl-9 ${errors.phone ? "input-error" : ""}`}
                      />
                      <Phone
                        size={14}
                        className="absolute left-3 top-3.5 text-gray-400"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
                    Street Address *
                  </label>
                  <div className="relative">
                    <input
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="House No, Street Name"
                      className={`input-field pl-9 mb-2 ${errors.address ? "input-error" : ""}`}
                    />
                    <Home
                      size={14}
                      className="absolute left-3 top-3.5 text-gray-400"
                    />
                  </div>
                  <input
                    name="address2"
                    value={form.address2}
                    onChange={handleChange}
                    placeholder="Apartment, Colony (optional)"
                    className="input-field"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
                      City *
                    </label>
                    <input
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="New Delhi"
                      className={`input-field ${errors.city ? "input-error" : ""}`}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
                      State *
                    </label>
                    <select
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      className="input-field"
                      style={{ cursor: "pointer" }}
                    >
                      {STATES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
                      PIN Code *
                    </label>
                    <input
                      name="pincode"
                      value={form.pincode}
                      onChange={handleChange}
                      placeholder="110001"
                      maxLength={6}
                      type="tel"
                      className={`input-field ${errors.pincode ? "input-error" : ""}`}
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

            {/* ✅ Payment Method */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-lime-400 to-lime-300 px-6 py-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <CreditCard size={15} className="text-green-700" />
                </div>
                <h2 className="font-bold text-gray-800 text-base">
                  Payment Method
                </h2>
              </div>

              <div className="p-6 space-y-3">
                {/* COD Option */}
                <div
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all
                    ${paymentMethod === "cod" ? "border-lime-400 bg-lime-50" : "border-gray-100 hover:border-lime-200 hover:bg-gray-50"}`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0
                    ${paymentMethod === "cod" ? "bg-lime-100" : "bg-gray-100"}`}
                  >
                    <Banknote size={20} className="text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm">
                      Cash on Delivery
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      Pay when your order arrives at your door
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                    ${paymentMethod === "cod" ? "border-lime-500" : "border-gray-300"}`}
                  >
                    {paymentMethod === "cod" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-lime-500" />
                    )}
                  </div>
                </div>

                {/* Razorpay Option */}
                <div
                  onClick={() => setPaymentMethod("razorpay")}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all
                    ${paymentMethod === "razorpay" ? "border-lime-400 bg-lime-50" : "border-gray-100 hover:border-lime-200 hover:bg-gray-50"}`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0
                    ${paymentMethod === "razorpay" ? "bg-lime-100" : "bg-gray-100"}`}
                  >
                    <CreditCard size={20} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-800 text-sm">
                        Pay Online
                      </p>
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
                        Razorpay
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs mt-0.5">
                      UPI • Card • NetBanking • Wallet
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                    ${paymentMethod === "razorpay" ? "border-lime-500" : "border-gray-300"}`}
                  >
                    {paymentMethod === "razorpay" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-lime-500" />
                    )}
                  </div>
                </div>

                {/* Supported logos when razorpay selected */}
                {paymentMethod === "razorpay" && (
                  <div className="flex items-center gap-2 px-2 pt-1 flex-wrap">
                    {[
                      "UPI",
                      "PhonePe",
                      "GPay",
                      "Paytm",
                      "Visa",
                      "Mastercard",
                      "RuPay",
                      "NetBanking",
                    ].map((logo) => (
                      <span
                        key={logo}
                        className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-lg font-medium"
                      >
                        {logo}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full bg-lime-400 hover:bg-lime-500 disabled:opacity-60 disabled:cursor-not-allowed text-gray-800 font-bold py-4 rounded-2xl flex items-center justify-center gap-3 text-base transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Opening Razorpay...
                </>
              ) : (
                <>
                  <Package size={20} />
                  {paymentMethod === "cod"
                    ? "Place Order"
                    : "Pay with Razorpay"}{" "}
                  — ₹{total.toLocaleString("en-IN")}
                  <ChevronRight size={18} />
                </>
              )}
            </button>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  icon: <ShieldCheck size={16} className="text-green-600" />,
                  text: "100% Secure",
                },
                {
                  icon: <Truck size={16} className="text-blue-500" />,
                  text: "Fast Delivery",
                },
                {
                  icon: <Package size={16} className="text-orange-500" />,
                  text: "Easy Returns",
                },
              ].map((b) => (
                <div
                  key={b.text}
                  className="bg-white rounded-xl p-3 flex items-center gap-2 border border-gray-100 shadow-sm"
                >
                  {b.icon}
                  <span className="text-xs font-semibold text-gray-600">
                    {b.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Order Summary ── */}
          <div className="space-y-4 lg:sticky lg:top-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-lime-400 to-lime-300 px-5 py-4 flex items-center justify-between">
                <h2 className="font-bold text-gray-800">Your Order</h2>
                <span className="bg-white text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">
                  {cartItems.length} items
                </span>
              </div>
              <div className="divide-y divide-gray-50 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.product} className="flex gap-3 px-5 py-4">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-lime-50 flex items-center justify-center">
                          <Package size={18} className="text-lime-300" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-gray-800">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </p>
                      <p className="text-xs text-gray-400">
                        ₹{item.price} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coupon */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Tag size={15} className="text-lime-600" />
                <span className="font-semibold text-gray-700 text-sm">
                  Have a coupon?
                </span>
              </div>
              {couponApplied ? (
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                  <CheckCircle2 size={16} className="text-green-600" />
                  <span className="text-green-700 text-sm font-semibold">
                    GET10 applied! 10% off
                  </span>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter coupon code"
                    className="input-field flex-1"
                  />
                  <button
                    onClick={applyCoupon}
                    className="bg-lime-400 hover:bg-lime-500 text-gray-800 font-bold px-4 rounded-xl text-sm transition-colors"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-800">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">Discount (10%)</span>
                  <span className="text-green-600 font-semibold">
                    - ₹{discount.toLocaleString("en-IN")}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Truck size={13} /> Shipping
                </span>
                <span
                  className={`font-semibold ${shipping === 0 ? "text-green-600" : "text-gray-800"}`}
                >
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </span>
              </div>
              {shipping === 0 && (
                <p className="text-xs text-green-600 bg-green-50 rounded-lg px-3 py-2">
                  🎉 Free shipping on orders above ₹999!
                </p>
              )}
              <div className="border-t border-gray-100 pt-3 flex justify-between">
                <span className="font-bold text-gray-800">Total</span>
                <span className="font-black text-xl text-gray-900">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-lime-50 border border-lime-200 rounded-2xl p-4 flex items-start gap-3">
              <MapPin
                size={16}
                className="text-lime-600 mt-0.5 flex-shrink-0"
              />
              <div>
                <p className="text-sm font-semibold text-gray-700">
                  Delivering to India
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Estimated delivery: 3-5 business days
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
