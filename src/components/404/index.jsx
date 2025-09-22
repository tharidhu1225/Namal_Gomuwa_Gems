import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="relative bg-gradient-to-br from-white via-blue-50 to-white min-h-screen flex items-center justify-center px-6">
      
      {/* Background Image Blur */}
      <img
        src="/logo.jpg"
        alt="Gem Logo"
        className="absolute inset-0 w-full h-full object-contain opacity-10 blur-2xl pointer-events-none"
      />

      {/* Main Content Card */}
      <div className="relative bg-white/60 backdrop-blur-md border border-gray-200 rounded-xl shadow-xl p-10 max-w-lg text-center">
        
        {/* Logo or Icon */}
        <img
          src="/logo.jpg"
          alt="Lost gem"
          className="w-24 h-24 mx-auto mb-6 rounded-full shadow-lg animate-pulse ring-2 ring-blue-300"
        />

        {/* Headings */}
        <h1 className="text-6xl font-extrabold text-gray-800 mb-2 tracking-wider">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Lost in the sparkle?
        </h2>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. But there's still plenty of brilliance waiting for you.
        </p>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-300"
          >
            🔙 Home
          </Link>
          <Link
            to="/shop"
            className="bg-white text-blue-600 border border-blue-600 px-6 py-2 rounded-lg shadow hover:bg-blue-50 transition duration-300"
          >
            💎 Shop Gems
          </Link>
        </div>
      </div>
    </div>
  );
}
