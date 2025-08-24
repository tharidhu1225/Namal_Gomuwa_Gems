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

  // 🔄 Fetch user info
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");


        if (!token) return;

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/user-details`, {
  headers: {
    Authorization: `Bearer ${token}`,
    'Cache-Control': 'no-cache',
  },
});


        const data = await res.json();



        if (data.success) {
          setUser(data.data);
        } else {
          console.warn("Failed to fetch user:", data.message);
        }
      } catch (err) {
        console.error("Auth check failed", err);
      }
    })();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🚪 Handle logout
  const handleLogout = async () => {
    try {
      localStorage.removeItem("token"); // 🔑 Remove token
      setUser(null);
      setDropdownOpen(false);
      window.location.href = "/";
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src="/logo.jpg" alt="Namal Gomuwa Gems" className="h-12 w-auto rounded-md shadow-sm hover:scale-105 transition-transform" />
            <span className="hidden md:inline text-xl font-semibold text-gray-800 tracking-wide">
              Namal Gomuwa Gems
            </span>
          </div>

          {/* Search */}
          <div className="hidden md:block flex-1 mx-6 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search gems, jewellery..."
                className="w-full pl-4 pr-10 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              />
              <FaSearch className="absolute right-3 top-2.5 text-gray-500" />
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4 text-gray-700 relative">
            {/* Cart */}
            <Link to="/cart" title="Cart">
              <RiShoppingBag4Fill size={22} className="hover:text-yellow-500 transition" />
            </Link>

            {/* User/Profile */}
            <div className="relative" ref={dropdownRef}>
              {user ? (
                <>
                  <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <img
                      src={user.avatar || "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"}
                      alt="Avatar"
                      className="h-8 w-8 rounded-full shadow-sm hover:scale-105 transition"
                    />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 top-11 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50 py-2">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-800">
                          Hello, {user.name || "User"} 👋
                        </p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>

                      <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">
                        <FaUser /> Profile
                      </Link>

                      <Link to="/orders" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">
                        <LuBox /> My Orders
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
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
                    className="inline-block px-4 py-1.5 text-sm font-medium text-yellow-600 border border-yellow-500 rounded-full transition-all duration-200 hover:bg-yellow-500 hover:text-white shadow-sm"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="inline-block px-4 py-1.5 text-sm font-medium text-white bg-yellow-500 rounded-full transition-all duration-200 hover:bg-yellow-600 shadow-sm"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search gems, jewellery..."
              className="w-full pl-4 pr-10 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            />
            <FaSearch className="absolute right-3 top-2.5 text-gray-500" />
          </div>
        </div>
     
      </div>

      {/* MOBILE MENU */}
      <div
        className={`bg-white px-4 overflow-hidden shadow-md transition-all duration-300 transform origin-top rounded-b-xl ${
          mobileMenuOpen ? "scale-100 opacity-100 max-h-[500px] py-4" : "scale-95 opacity-0 max-h-0 py-0"
        }`}
      >
        <nav className="space-y-3">
          {["Home", "Shop", "About", "Contact"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="block text-gray-700 hover:text-yellow-500 font-medium transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
