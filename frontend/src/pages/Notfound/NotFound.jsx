import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();
  const [count, setCount] = useState(10);

  // Auto redirect after 10 seconds
  useEffect(() => {
    if (count === 0) {
      navigate("/");
      return;
    }
    const t = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count, navigate]);

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .float     { animation: float 3s ease-in-out infinite; }
        .spin-slow { animation: spin-slow 12s linear infinite; }
        .fade-up   { animation: fade-up 0.5s ease forwards; }
        .fade-up-1 { animation: fade-up 0.5s ease 0.1s forwards; opacity: 0; }
        .fade-up-2 { animation: fade-up 0.5s ease 0.2s forwards; opacity: 0; }
        .fade-up-3 { animation: fade-up 0.5s ease 0.3s forwards; opacity: 0; }
        .fade-up-4 { animation: fade-up 0.5s ease 0.4s forwards; opacity: 0; }
      `}</style>

      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
        {/* Background decorative circles */}
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-lime-100 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-green-100 translate-x-1/3 translate-y-1/3 pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-32 h-32 rounded-full bg-lime-50 -translate-x-1/2 pointer-events-none" />

        {/* Spinning ring */}
        <div className="relative mb-6 float">
          <div className="w-36 h-36 rounded-full border-4 border-dashed border-lime-300 spin-slow absolute inset-0" />
          <div className="w-36 h-36 rounded-full bg-gradient-to-br from-lime-100 to-green-200 flex items-center justify-center relative z-10">
            <span className="text-6xl select-none">🌿</span>
          </div>
        </div>

        {/* 404 */}
        <h1 className="fade-up text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-lime-400 to-green-600 leading-none mb-2 select-none">
          404
        </h1>

        {/* Title */}
        <h2 className="fade-up-1 text-xl md:text-2xl font-extrabold text-gray-800 mb-2">
          Page Not Found
        </h2>

        {/* Subtitle */}
        <p className="fade-up-2 text-gray-400 text-sm font-medium max-w-xs mb-8 leading-relaxed">
          Yeh page exist nahi karta. Lagta hai aap galat jagah aa gaye! 😅
        </p>

        {/* Buttons */}
        <div className="fade-up-3 flex flex-col sm:flex-row items-center gap-3 mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-lime-400 to-green-500 text-green-950 font-bold text-sm rounded-2xl hover:from-lime-300 hover:to-green-400 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-lime-200"
          >
            <Home size={16} />
            Go to Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-600 font-bold text-sm rounded-2xl border border-gray-200 hover:border-lime-300 hover:text-green-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>

        {/* Auto redirect countdown */}
        <p className="fade-up-4 text-xs text-gray-400 font-medium">
          Home pe automatic redirect hoga{" "}
          <span className="font-extrabold text-green-600">{count}s</span>{" "}
          mein...
        </p>
      </div>
    </>
  );
}
