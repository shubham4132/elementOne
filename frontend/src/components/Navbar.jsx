import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";
import logo from "../assets/logo.png";
import ProfileDropdown from "./Profiledropdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProduct } from "../features/products/productSlice";

export default function Navbar({ onMenuClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showSwipeHint, setShowSwipeHint] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    if (!isMobile) return;
    const t1 = setTimeout(() => setShowSwipeHint(true), 800);
    const t2 = setTimeout(() => setShowSwipeHint(false), 4200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const toggleMenu = () => setIsOpen((p) => !p);
  const toggleDropdown = (name) =>
    setActiveDropdown((p) => (p === name ? null : name));

  const navItems = [
    { label: "AYURVEDA", href: "#" },
    {
      label: "NUTRITION",
      href: "#",
      dropdown: ["ONCO NUTRITION", "WEIGHT LOSS/OBESITY", "CHILD NUTRITION"],
    },
    {
      label: "WOMENS PROBLEM",
      href: "#",
      dropdown: ["MENOPOUSE", "PCOS/PCOS", "WHITE DISCHARGE"],
    },
    {
      label: "MENS PROBLEMS",
      href: "#",
      dropdown: ["PROSTATE PROBLEM", "SEXUAL ISSUE"],
    },
    {
      label: "TREATMENT",
      href: "#",
      dropdown: [
        "DIABETES",
        "HYPERTENSION / BP",
        "JOINT PAIN",
        "LIVER / KIDNEY",
        "PROSTATE",
      ],
    },
    { label: "OFFER ZONE", href: "#" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getProduct({ keyword: keyword.trim() }));
    }, 500);
    return () => clearTimeout(timer);
  }, [keyword]);

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <>
      <style>{`
        @keyframes swayRight {
          0%, 100% { transform: translateX(0);   }
          50%       { transform: translateX(6px); }
        }
        .swipe-hint-anim { animation: swayRight 1.3s ease-in-out infinite; }
      `}</style>

      {/* TOP BANNER */}
      <div className="bg-yellow-300 text-center py-2">
        <p className="text-sm md:text-base font-semibold text-gray-800">
          Get 10% off on Prepaid Orders &nbsp;|&nbsp; Use Code:{" "}
          <span className="font-extrabold underline tracking-wide">GET10</span>
        </p>
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-lime-400 shadow-md">
        <div className="w-full px-4">
          <div className="flex items-center justify-between h-20">
            {/* LEFT: Menu toggle (only if logged in) + Logo */}
            <div className="flex items-center gap-2">
              {/* ✅ MENU BUTTON — user logged OUT hone pe HIDE hoga */}
              {user?.name && (
                <button
                  onClick={() => {
                    onMenuClick?.();
                    setShowSwipeHint(false);
                  }}
                  className={`
                    flex items-center gap-1.5
                    bg-white text-green-800 font-bold text-xs
                    px-3 py-1.5 rounded-full shadow border border-lime-200
                    hover:bg-lime-50 transition-all duration-200 lg:opacity-100
                    ${showSwipeHint ? "opacity-100 swipe-hint-anim" : "opacity-70 lg:opacity-100"}
                  `}
                  aria-label="Toggle sidebar"
                >
                  <ChevronRight
                    size={14}
                    strokeWidth={2.5}
                    className="text-lime-600"
                  />
                  <span className="hidden sm:inline">Menu</span>
                </button>
              )}

              {/* Logo */}
              <img
                src={logo}
                alt="Element One Nutrition"
                className="h-14 w-14 rounded-full object-cover border-2 border-white shadow-md flex-shrink-0"
              />
            </div>

            {/* CENTER: desktop nav links */}
            <div className="hidden lg:flex items-center gap-7 flex-1 justify-center">
              {navItems.map((item) => (
                <div key={item.label} className="relative group">
                  <button className="text-gray-800 font-semibold text-sm hover:text-gray-600 flex items-center gap-1 transition-colors whitespace-nowrap">
                    {item.label}
                    {item.dropdown && <ChevronDown size={15} />}
                  </button>
                  {item.dropdown && (
                    <div className="absolute left-0 top-full mt-1 w-44 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
                      {item.dropdown.map((sub) => (
                        <a
                          key={sub}
                          href="#"
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-lime-50 hover:text-green-800 transition-colors first:rounded-t-lg last:rounded-b-lg"
                        >
                          {sub}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* RIGHT: desktop search + icons */}
            <div className="hidden md:flex items-center gap-3 flex-shrink-0">
              <div className="relative">
                <input
                  type="text"
                  value={keyword}
                  onChange={handleSearchChange}
                  placeholder="Search for products"
                  className="bg-white px-4 py-2 pr-9 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 w-44"
                />
                <Search
                  className="absolute right-3 top-2.5 text-gray-400"
                  size={16}
                />
              </div>
              <div className="relative cursor-pointer">
                <ShoppingCart className="text-gray-800" size={22} />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </div>
              {user?.name ? (
                <button
                  onClick={() => navigate("/profile")}
                  className="w-9 h-9 rounded-full bg-green-700 text-white flex items-center justify-center font-bold hover:bg-green-800 transition text-sm"
                >
                  {user.name.charAt(0).toUpperCase()}
                </button>
              ) : (
                <ProfileDropdown />
              )}
            </div>

            {/* RIGHT: mobile cart + hamburger */}
            <div className="lg:hidden flex items-center gap-2">
              <div className="md:hidden relative cursor-pointer">
                <ShoppingCart className="text-gray-800" size={20} />
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  0
                </span>
              </div>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg text-gray-800 hover:bg-lime-300 transition-colors"
                aria-label="Toggle nav menu"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* MOBILE DROPDOWN MENU */}
          {isOpen && (
            <div className="lg:hidden pb-4 border-t border-lime-300">
              <div className="mt-3 mb-2 px-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products"
                    className="w-full bg-white px-4 py-2 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400"
                  />
                  <Search
                    className="absolute right-3 top-2.5 text-gray-400"
                    size={16}
                  />
                </div>
              </div>

              {/* ✅ MY ACCOUNT — user logged OUT hone pe HIDE hoga */}
              {user?.name && (
                <button
                  onClick={() => {
                    onMenuClick?.();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-gray-800 hover:bg-lime-300 transition-colors border-b border-lime-300"
                >
                  <span className="flex items-center gap-2">
                    <User size={15} /> MY ACCOUNT
                  </span>
                  <ChevronRight size={15} />
                </button>
              )}

              {navItems.map((item) => (
                <div key={item.label}>
                  <button
                    onClick={() => item.dropdown && toggleDropdown(item.label)}
                    className="w-full text-left px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-lime-300 transition-colors flex justify-between items-center"
                  >
                    {item.label}
                    {item.dropdown && (
                      <ChevronDown
                        size={15}
                        className={`transition-transform duration-200 ${activeDropdown === item.label ? "rotate-180" : ""}`}
                      />
                    )}
                  </button>
                  {item.dropdown && activeDropdown === item.label && (
                    <div className="bg-white">
                      {item.dropdown.map((sub) => (
                        <a
                          key={sub}
                          href="#"
                          className="block px-8 py-2 text-sm text-gray-700 hover:bg-lime-50 transition-colors"
                        >
                          {sub}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
