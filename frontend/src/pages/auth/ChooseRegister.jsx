import React from "react";
import { Link } from "react-router-dom";

const ChooseRegister = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1c2128] via-[#0d1117] to-[#161b22] overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 -z-10">
        <div className="w-[200%] h-[200%] animate-pulse bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,127,0.1),transparent_60%)]" />
      </div>

      {/* Hero Section */}
      <main className="text-center px-6">
        <div className="bg-[#161b22]/70 backdrop-blur-lg border border-[#30363d] shadow-2xl rounded-2xl p-10 max-w-xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Biteato
            </span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            Connect, explore, and enjoy delicious meals <br /> or manage your
            food business with ease.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/user/register"
              className="px-6 py-3 rounded-lg font-semibold bg-emerald-500 hover:bg-emerald-400 text-black shadow-md transition transform hover:scale-105"
            >
              🍽️ Get Started
            </Link>
            <Link
              to="/food-partner/register"
              className="px-6 py-3 rounded-lg font-semibold bg-[#30363d] hover:bg-[#3c434d] text-white shadow-md transition transform hover:scale-105"
            >
              🚀 Grow Your Business
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChooseRegister;
