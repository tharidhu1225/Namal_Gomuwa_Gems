import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { LuBox } from "react-icons/lu";
import { Link } from "react-router-dom";
import "../components/headerStyle.css";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll effect for luxury navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch user
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/user-details`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache",
          },
        });

        const data = await res.json();
        if (data.success) setUser(data.data);
      } catch (err) {
        console.error("Auth load failed", err);
      }
    })();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setDropdownOpen(false);
    window.location.href = "/";
  };

  return (
    <header
      className={`backdrop-blur-lg sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 shadow-md border-b border-gray-200"
          : "bg-white/40"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">

          {/* Logo */}
          <div className="flex items-center gap-2 select-none">
            <img
              src="/logo.jpg"
              alt="Logo"
              className="h-12 w-auto rounded-md shadow-sm hover:scale-105 transition-transform"
            />
            <span className="hidden md:inline text-xl font-semibold text-gray-900">
              Ceylon Queen Sapphire
            </span>
          </div>

          {/* Search (Desktop) */}
          <div className="hidden md:block w-full max-w-md mx-6">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search gems or jewellery..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full text-sm
                bg-white/70 backdrop-blur-md
                focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
              <FaSearch className="absolute right-3 top-2.5 text-gray-500" />
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4 text-gray-700">

            {/* Cart */}
            <Link to="/cart">
              <RiShoppingBag4Fill
                size={24}
                className="hover:text-blue-600 transition cursor-pointer"
              />
            </Link>

            {/* User / Profile */}
            <div className="relative" ref={dropdownRef}>
              {user ? (
                <>
                  <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <img
                      src={
                        user.avatar ||
                        "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
                      }
                      className="h-8 w-8 rounded-full shadow-sm hover:scale-110 transition"
                    />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 top-11 bg-white shadow-xl rounded-xl border w-56 z-50">
                      <div className="px-4 py-3 border-b">
                        <p className="font-medium text-gray-800">
                          Hello, {user.name}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>

                      <Link
                        to="/profile"
                        className="flex gap-2 items-center px-4 py-2 hover:bg-gray-100 text-sm"
                      >
                        <FaUser /> Profile
                      </Link>

                      <Link
                        to="/orders"
                        className="flex gap-2 items-center px-4 py-2 hover:bg-gray-100 text-sm"
                      >
                        <LuBox /> My Orders
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="flex w-full px-4 py-2 gap-2 items-center text-red-600 hover:bg-gray-100 text-sm"
                      >
                        <FaSignOutAlt /> Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-4 py-1.5 text-sm border border-blue-500 text-blue-600 rounded-full hover:bg-blue-500 hover:text-white transition"
                  >
                    Sign In
                  </Link>

                  <Link
                    to="/register"
                    className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Toggle */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? (
                <XMarkIcon className="h-7 w-7" />
              ) : (
                <Bars3Icon className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-2 pb-2">
          <input
            type="text"
            placeholder="Search gems or jewellery..."
            className="w-full pl-4 pr-10 py-2 border rounded-full text-sm bg-white/70"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`transition-all duration-300 overflow-hidden bg-white shadow-md
        ${mobileMenuOpen ? "max-h-60 py-4" : "max-h-0 py-0"}`}
      >
        <nav className="flex flex-col gap-3 px-4 text-gray-800 text-md">
          {["Home", "Shop", "About", "Contact"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-600 transition"
            >
              {item}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
