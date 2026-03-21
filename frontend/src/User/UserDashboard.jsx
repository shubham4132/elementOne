import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import Products from "../pages/Product/Products";

export default function Dashboard() {
  const { user } = useSelector((state) => state.user);

  // Default closed (false) for all screen sizes
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar — onMenuClick toggles sidebar on ALL screen sizes */}
      <Navbar onMenuClick={() => setIsOpen((p) => !p)} />

      <div className="flex flex-1">
        {/* Sidebar — one instance, controlled by isOpen */}
        <Sidebar user={user} isOpen={isOpen} onClose={() => setIsOpen(false)} />

        {/* Main content */}
        <main className="flex-1 flex flex-col bg-gray-100 min-w-0 overflow-y-auto">
          <div className="flex-1 p-6">
            <Products />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
