import React, { useState } from "react";
import { ChevronDown, Menu, X, Search, ShoppingCart, User } from "lucide-react";
import logo from "../assets/logo.png";

export default function Navbar() {
  // State to track if mobile menu is open
  const [isOpen, setIsOpen] = useState(false);
  // State to track which dropdown is open on mobile
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Function to toggle mobile menu open/close
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to toggle dropdown on mobile
  const toggleDropdown = (name) => {
    if (activeDropdown === name) {
      setActiveDropdown(null); // Close if already open
    } else {
      setActiveDropdown(name); // Open if closed
    }
  };

  // Array of navigation items with their dropdowns
  const navItems = [
    { label: "AYURVEDA", href: "#" },
    {
      label: "NUTRITION",
      href: "#",
      dropdown: ["Supplements", "Vitamins", "Minerals"],
    },
    {
      label: "WOMENS PROBLEM",
      href: "#",
      dropdown: ["Health", "Beauty", "Wellness"],
    },
    {
      label: "MENS PROBLEMS",
      href: "#",
      dropdown: ["Fitness", "Energy", "Recovery"],
    },
    {
      label: "TREATMENT",
      href: "#",
      dropdown: ["Ayurvedic", "Modern", "Holistic"],
    },
    { label: "OFFER ZONE", href: "#" },
  ];

  return (
    <>
      {/* ===== TOP YELLOW BANNER ===== */}
      <div className="bg-yellow-300 text-center py-2 ">
        <p className="text-sm md:text-base font-semibold text-gray-800">
          Get 10% off on Prepaid Orders Use Code: GET10
        </p>
      </div>

      {/* ===== MAIN NAVBAR ===== */}
      <nav className="sticky top-0 z-50 bg-lime-400 shadow-md">
        <div className="w-full px-4">
          {/* ===== NAVBAR TOP SECTION (Logo + Menu + Icons) ===== */}
          <div className="flex justify-between items-center h-24">
            {/* ===== LOGO SECTION ===== */}

            <div className="flex-shrink-0 flex items-center ">
              <img
                src={logo}
                alt="Element One Nutrition"
                className="w-26 h-26 rounded-full object-cover border-2 border-white shadow-md "
              />
            </div>
            {/* ===== DESKTOP MENU (visible only on large screens) ===== */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <div key={item.label} className="relative group">
                  {/* Menu item button */}
                  <button className="text-gray-800 font-semibold text-sm hover:text-gray-600 flex items-center gap-1 transition-colors">
                    {item.label}
                    {/* Show arrow if item has dropdown */}
                    {item.dropdown && <ChevronDown size={16} />}
                  </button>

                  {/* Dropdown menu - appears on hover for desktop */}
                  {item.dropdown && (
                    <div className="absolute left-0 mt-0 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                      {item.dropdown.map((subitem) => (
                        <a
                          key={subitem}
                          href="#"
                          className="block px-4 py-3 text-sm text-gray-800 hover:bg-lime-100 transition-colors"
                        >
                          {subitem}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* ===== SEARCH BAR + ICONS (Desktop) ===== */}
            <div className="hidden md:flex items-center gap-4">
              {/* Search input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products"
                  className="bg-white px-4 py-2 rounded-md text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 w-48"
                />
                <Search
                  className="absolute right-3 top-2.5 text-gray-500"
                  size={18}
                />
              </div>

              {/* Shopping cart and user icons */}
              <div className="flex items-center gap-4 ml-2">
                {/* Shopping cart with badge */}
                <div className="relative cursor-pointer">
                  <ShoppingCart className="text-gray-800" size={24} />
                  {/* Badge showing cart count */}
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    0
                  </span>
                </div>
                {/* User profile icon */}
                <User className="text-gray-800 cursor-pointer" size={24} />
              </div>
            </div>
            {/* ===== MOBILE MENU BUTTON (visible on small/medium screens) ===== */}
            <div className="lg:hidden flex items-center gap-3">
              {/* Cart and user icons - visible only on medium screens */}
              <div className="md:hidden flex items-center gap-2">
                <ShoppingCart className="text-gray-800" size={20} />
                <User className="text-gray-800" size={20} />
              </div>

              {/* Hamburger menu button */}
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:bg-lime-300 focus:outline-none transition-colors"
              >
                {/* Show X icon if menu is open, otherwise show hamburger */}
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* ===== MOBILE MENU (appears when hamburger is clicked) ===== */}
          {isOpen && (
            <div className="lg:hidden pb-4 border-t border-lime-300">
              {/* Mobile search bar */}
              <div className="mt-4 mb-4 px-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products"
                    className="w-full bg-white px-4 py-2 rounded-md text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                  <Search
                    className="absolute right-3 top-2.5 text-gray-500"
                    size={18}
                  />
                </div>
              </div>

              {/* Mobile menu items */}
              {navItems.map((item) => (
                <div key={item.label}>
                  {/* Menu item button */}
                  <button
                    onClick={() => item.dropdown && toggleDropdown(item.label)}
                    className="w-full text-left px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-lime-300 transition-colors flex justify-between items-center"
                  >
                    {item.label}
                    {/* Arrow icon - rotates when dropdown is open */}
                    {item.dropdown && (
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {/* Mobile dropdown menu - shows when item is clicked */}
                  {item.dropdown && activeDropdown === item.label && (
                    <div className="bg-white">
                      {item.dropdown.map((subitem) => (
                        <a
                          key={subitem}
                          href="#"
                          className="block px-8 py-2 text-sm text-gray-800 hover:bg-lime-100 transition-colors"
                        >
                          {subitem}
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
