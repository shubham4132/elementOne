import React, { useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Dashboard({ user }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Top Navbar */}
      <Navbar onMenuClick={() => setIsOpen(!isOpen)} />

      {/* Sidebar + Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar user={user} isOpen={isOpen} onClose={() => setIsOpen(false)} />

        {/* Main Content */}
        <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          {/* <MainContent /> */}
        </div>
      </div>
    </div>
  );
}
