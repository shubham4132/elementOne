import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ShoppingBag,
  Heart,
  Gift,
  Star,
  ChevronRight,
  CheckCircle,
  Truck,
  Clock,
  MapPin,
  Settings,
  ArrowLeft,
} from "lucide-react";

// Replace with Redux orders data
const recentOrders = [
  {
    id: "#AYU-2841",
    name: "Ashwagandha Root Powder",
    date: "15 Mar 2025",
    status: "Delivered",
    amount: "₹649",
    img: "🌿",
  },
  {
    id: "#AYU-2756",
    name: "Triphala Churna 500g",
    date: "02 Mar 2025",
    status: "In Transit",
    amount: "₹399",
    img: "🍃",
  },
  {
    id: "#AYU-2690",
    name: "Brahmi Hair Oil",
    date: "18 Feb 2025",
    status: "Processing",
    amount: "₹299",
    img: "🌱",
  },
];

const statusConfig = {
  Delivered: {
    icon: CheckCircle,
    cls: "text-green-700 bg-green-50 border-green-200",
  },
  "In Transit": {
    icon: Truck,
    cls: "text-blue-700 bg-blue-50 border-blue-200",
  },
  Processing: {
    icon: Clock,
    cls: "text-amber-700 bg-amber-50 border-amber-200",
  },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const firstName = user?.name?.split(" ")[0] ?? "User";
  const avatar = user?.name?.charAt(0).toUpperCase() ?? "U";
  const email = user?.email ?? "";

  const stats = [
    {
      label: "Orders",
      value: "12",
      icon: ShoppingBag,
      bg: "bg-lime-100",
      color: "text-lime-700",
      path: "/orders",
    },
    {
      label: "Wishlist",
      value: "5",
      icon: Heart,
      bg: "bg-rose-100",
      color: "text-rose-600",
      path: "/wishlist",
    },
    {
      label: "Reward Points",
      value: "340",
      icon: Gift,
      bg: "bg-amber-100",
      color: "text-amber-600",
      path: null,
    },
    {
      label: "Reviews",
      value: "8",
      icon: Star,
      bg: "bg-violet-100",
      color: "text-violet-600",
      path: null,
    },
  ];

  const quickActions = [
    {
      label: "My Orders",
      icon: ShoppingBag,
      path: "/orders",
      bg: "bg-lime-50",
      color: "text-lime-700",
    },
    {
      label: "Wishlist",
      icon: Heart,
      path: "/wishlist",
      bg: "bg-rose-50",
      color: "text-rose-600",
    },
    {
      label: "Addresses",
      icon: MapPin,
      path: "/addresses",
      bg: "bg-sky-50",
      color: "text-sky-600",
    },
    {
      label: "Settings",
      icon: Settings,
      path: "/profile",
      bg: "bg-violet-50",
      color: "text-violet-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Top Bar ── */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <button
          onClick={() => navigate("/")}
          className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-lime-100 flex items-center justify-center transition-colors"
        >
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <h1 className="font-bold text-gray-800 text-base">My Dashboard</h1>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
        {/* ── Welcome Card ── */}
        <div className="bg-gradient-to-r from-lime-400 to-green-500 rounded-2xl p-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-green-900/60 text-xs font-semibold">
              Namaste 🙏
            </p>
            <h2 className="text-xl font-extrabold text-green-950 mt-0.5">
              {firstName}
            </h2>
            <p className="text-green-900/50 text-xs mt-0.5">{email}</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white/25 border-2 border-white/30 flex items-center justify-center text-green-950 text-2xl font-extrabold flex-shrink-0">
            {avatar}
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map(({ label, value, icon: Icon, bg, color, path }) => (
            <div
              key={label}
              onClick={() => path && navigate(path)}
              className={`bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ${path ? "cursor-pointer" : ""}`}
            >
              <div
                className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mb-3`}
              >
                <Icon size={16} className={color} />
              </div>
              <p className="text-2xl font-extrabold text-gray-900 leading-none">
                {value}
              </p>
              <p className="text-xs text-gray-400 font-medium mt-1">{label}</p>
              {path && (
                <ChevronRight size={12} className="text-gray-300 mt-1.5" />
              )}
            </div>
          ))}
        </div>

        {/* ── Recent Orders ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-50">
            <p className="text-sm font-bold text-gray-800">Recent Orders</p>
            <button
              onClick={() => navigate("/orders")}
              className="text-xs font-bold text-green-600 hover:text-green-700 flex items-center gap-1"
            >
              View All <ChevronRight size={12} />
            </button>
          </div>

          <div className="divide-y divide-gray-50">
            {recentOrders.map((order) => {
              const cfg =
                statusConfig[order.status] ?? statusConfig["Processing"];
              const StatusIcon = cfg.icon;
              return (
                <div
                  key={order.id}
                  onClick={() => navigate("/orders")}
                  className="flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-lime-50 flex items-center justify-center text-lg flex-shrink-0">
                    {order.img}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">
                      {order.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {order.id} · {order.date}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <span className="font-bold text-gray-900 text-sm">
                      {order.amount}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${cfg.cls}`}
                    >
                      <StatusIcon size={10} />
                      {order.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Quick Actions ── */}
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
            Quick Actions
          </p>
          <div className="grid grid-cols-4 gap-2.5">
            {quickActions.map(({ label, icon: Icon, path, bg, color }) => (
              <button
                key={label}
                onClick={() => navigate(path)}
                className="flex flex-col items-center gap-2 py-4 bg-white rounded-2xl border border-gray-100 hover:border-lime-300 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}
                >
                  <Icon size={18} className={color} />
                </div>
                <span className="text-[11px] font-semibold text-gray-600 text-center leading-tight px-1">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
