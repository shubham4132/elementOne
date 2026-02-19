import { useState, useRef, useEffect } from "react";
import { User, UserPlus, LogIn, LogInIcon, UserPlus2 } from "lucide-react";
import LoginForm from "./LoginForm";
import RegisterForm from "./Register";

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-[#5aaa00] transition-colors"
        aria-label="Profile"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <User className="h-6 w-6 text-[#1a1a1a]" />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-3 w-80 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Arrow pointer */}
          <div className="absolute -top-2 right-4 w-4 h-4 bg-[#2d5a00] rotate-45" />

          <div className="rounded-xl overflow-hidden shadow-2xl border border-[#4a9000]/30">
            {/* Header with tabs */}
            <div className="bg-[#2d5a00] px-1 pt-4 pb-1">
              <div className="flex gap-1 px-3">
                <button
                  onClick={() => setActiveTab("login")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-t-lg transition-all ${
                    activeTab === "login"
                      ? "bg-[#ffffff] text-[#2d5a00] shadow-md"
                      : "text-[#b8e68a] hover:text-[#ffffff] hover:bg-[#3d7000]"
                  }`}
                >
                  <LogInIcon className="h-4 w-4" />
                  Login
                </button>

                <button
                  onClick={() => setActiveTab("register")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-t-lg transition-all ${
                    activeTab === "register"
                      ? "bg-[#ffffff] text-[#2d5a00] shadow-md"
                      : "text-[#b8e68a] hover:text-[#ffffff] hover:bg-[#3d7000]"
                  }`}
                >
                  <UserPlus2 className="h-4 w-4" />
                  Register
                </button>
              </div>
            </div>

            {/* Form Content */}
            <div className="bg-[#ffffff] p-5">
              {activeTab === "login" ? (
                <LoginForm
                  onSwitchToRegister={() => setActiveTab("register")}
                />
              ) : (
                <RegisterForm onSwitchToLogin={() => setActiveTab("login")} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
