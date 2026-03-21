import {
  LayoutDashboard,
  ShoppingBag,
  MapPin,
  Settings,
  Heart,
  LogOut,
  X,
} from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../features/user/userSlice";
import { useEffect, useRef } from "react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: ShoppingBag, label: "Orders", href: "/order" },
  { icon: MapPin, label: "Addresses", href: "#" },
  { icon: Settings, label: "Account Details", href: "#" },
  { icon: Heart, label: "Wishlist", href: "/wishlist" },
];

export default function Sidebar({ isOpen, onClose, user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarRef = useRef(null);

  const handleLogout = async (e) => {
    e.stopPropagation();
    await dispatch(logout());
    toast.success("Logout Successful! 👋", {
      position: "top-right",
      autoClose: 1500,
    });
    onClose();
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`
          fixed inset-0 z-40 bg-[#0c2f40]/40
          transition-all duration-300 ease-in-out lg:hidden
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />

      <aside
        ref={sidebarRef}
        style={{ height: "100dvh" }}
        className={`
          fixed top-0 left-0 z-50 w-64
          bg-white flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.06)] 
          transition-transform duration-300 ease-out border-r border-slate-100
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Close btn */}
        <button
          onClick={onClose}
          aria-label="Close sidebar"
          className="absolute top-4 right-4 w-8 h-8 rounded-full z-20
                     bg-white/10 hover:bg-white/25 flex items-center justify-center
                     text-white transition-all duration-200 lg:hidden"
        >
          <X size={18} />
        </button>

        {/* User profile header */}
        <div className="relative bg-gradient-to-br from-[#1B5E87] via-[#154868] to-[#0c2f40] px-6 pt-10 pb-8 flex-shrink-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <div
              className="w-20 h-20 rounded-full bg-white/10 border-[3px] border-white/30
                            flex items-center justify-center mb-4 shadow-[0_8px_16px_rgba(0,0,0,0.2)] ring-4 ring-black/5"
            >
              <span className="text-4xl select-none drop-shadow-md">👤</span>
            </div>
            <h3 className="font-bold text-white text-[15px] tracking-wide truncate w-full drop-shadow-sm">
              {user?.name ?? "Guest User"}
            </h3>
            <p className="text-white/70 text-xs mt-1 font-medium truncate w-full hover:text-white transition-colors">
              {user?.email ?? "guest@example.com"}
            </p>
          </div>
        </div>

        {/* Nav menu */}
        <nav className="flex-1 min-h-0 overflow-y-auto p-4 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <button
                key={item.label}
                onClick={() => {
                  onClose();
                  navigate(item.href);
                }}
                className={`
                  w-full relative flex items-center gap-3.5 py-3 px-4 rounded-xl group
                  text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-gradient-to-r from-[#1B5E87]/10 to-transparent text-[#1B5E87] shadow-[inset_3px_0_0_#1B5E87]"
                      : "text-slate-500 border border-transparent hover:bg-slate-50 hover:text-slate-800 hover:shadow-[inset_3px_0_0_#cbd5e1]"
                  }
                `}
              >
                <Icon
                  size={18}
                  className={`flex-shrink-0 transition-all duration-300 ${isActive ? "" : "group-hover:scale-110 group-hover:-translate-y-0.5"}`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className="tracking-wide">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="flex-shrink-0 p-4 border-t border-slate-100 bg-slate-50/50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2.5 text-sm font-medium
                       text-slate-500 hover:text-red-600 hover:bg-red-50 hover:shadow-sm group
                       border border-transparent hover:border-red-100
                       py-3 rounded-xl transition-all duration-200"
          >
            <LogOut
              size={18}
              strokeWidth={2.2}
              className="transition-transform duration-200 group-hover:-translate-x-1"
            />
            <span className="tracking-wide">Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
