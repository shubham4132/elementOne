import {
  LayoutDashboard,
  ShoppingBag,
  Download,
  MapPin,
  Settings,
  Heart,
  Scale,
  LogOut,
  X,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../features/user/userSlice";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "#" },
  { icon: ShoppingBag, label: "Orders", href: "#" },
  { icon: Download, label: "Downloads", href: "#" },
  { icon: MapPin, label: "Addresses", href: "#" },
  { icon: Settings, label: "Account Details", href: "#" },
  { icon: Heart, label: "Wishlist", href: "#" },
  { icon: Scale, label: "Compare", href: "#" },
];

export default function Sidebar({ isOpen, onClose, user }) {
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(logout());

  return (
    <>
      {/* Backdrop — mobile only */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`
          fixed inset-0 z-40 bg-black/50
          transition-opacity duration-300 ease-in-out lg:hidden
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />

      {/*
        Sidebar — fixed position (document flow se bahar hai)
        Wrapper div Dashboard mein w-64/w-0 se space handle karti hai
      */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64
          bg-white flex flex-col shadow-2xl
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Close btn */}
        <button
          onClick={onClose}
          aria-label="Close sidebar"
          className="absolute top-3 right-3 w-8 h-8 rounded-lg z-10
                     bg-white/10 hover:bg-white/25 flex items-center justify-center
                     text-white transition-colors"
        >
          <X size={16} />
        </button>

        {/* User profile header */}
        <div className="bg-gradient-to-br from-[#1B5E87] to-[#0c2f40] px-5 pt-8 pb-6 flex-shrink-0">
          <div className="flex flex-col items-center text-center">
            <div
              className="w-20 h-20 rounded-full bg-white/20 border-2 border-white/40
                            flex items-center justify-center mb-3 shadow-lg"
            >
              <span className="text-4xl select-none">👤</span>
            </div>
            <h3 className="font-bold text-white text-sm truncate w-full">
              {user?.name ?? "Guest User"}
            </h3>
            <p className="text-white/60 text-xs mt-0.5 truncate w-full">
              {user?.email ?? "guest@example.com"}
            </p>
          </div>
        </div>

        {/* Nav menu */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = index === 0;
            return (
              <a
                key={item.label}
                href={item.href}
                className={`
                  flex items-center gap-3 py-2.5 px-3.5 rounded-xl
                  text-sm font-semibold transition-all duration-150
                  ${
                    isActive
                      ? "bg-[#1B5E87]/10 text-[#1B5E87] border-l-2 border-[#1B5E87]/60"
                      : "text-gray-500 border-l-2 border-transparent hover:bg-gray-50 hover:text-gray-800"
                  }
                `}
              >
                <Icon
                  size={18}
                  className="flex-shrink-0"
                  strokeWidth={isActive ? 2 : 1.5}
                />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-4 py-4 border-t border-gray-100 flex-shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 text-sm font-semibold
                       text-red-400 hover:text-white hover:bg-red-500
                       border border-red-100 hover:border-red-500
                       py-2.5 rounded-xl transition-all duration-200"
          >
            <LogOut size={16} strokeWidth={1.8} />
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}
