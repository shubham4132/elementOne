import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Products from "./Product/Products";
import Sidebar from "../components/Sidebar";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className="bg-blend-lighten">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <Products />
        <Footer />
      </div>
    </>
  );
}
