import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import "../components/headerStyle.css"; // Assuming you have a CSS file for styles
import { FaSignOutAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { LuBox } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);

  // Fetch user info from backend
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/user-details`, {
          credentials: "include",
          cache: "no-store",
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setUser(data.data);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("User check failed:", error);
        setUser(null);
      }
    }

    fetchUser();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/logout`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      setUser(null);
      setDropdownOpen(false);
      window.location.href = "/"; // Redirect to home
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">

          {/* LOGO */}
          <div className="flex items-center space-x-2">
            <img
              src="/logo.jpg"
              alt="Namal Gomuwa Gems"
              className="h-12 w-auto rounded-md shadow-sm hover:scale-105 transition-transform"
            />
            <span className="hidden md:inline text-xl md:text-2xl font-semibold text-gray-800 tracking-wide">
              Namal Gomuwa Gems
            </span>
          </div>

          {/* SEARCH (Desktop) */}
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

          {/* ICONS */}
          <div className="flex items-center space-x-4 text-gray-700 relative">
            {/* Cart */}
            <a href="/cart" title="Cart">
              <RiShoppingBag4Fill size={22} className="hover:text-yellow-500 transition" />
            </a>

            {/* Profile / Sign In */}
            <div className="relative flex items-center space-x-4 text-gray-700" ref={dropdownRef}>
              {user ? (
                <>
                  {/* Logged-in: Profile icon */}
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="focus:outline-none"
                    aria-label="Profile"
                  >
                    <img src={user.avatar || "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"} alt="Profile" className="h-6 w-6 rounded-full shadow-sm hover:scale-105 transition-transform" />
                  </button>

                  {/* Dropdown */}
                  {dropdownOpen && (
                    <div className="absolute right-0 top-11 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50 py-2 animate-fade-in-down">
  <div className="px-4 py-2 border-b border-gray-100">
    <p className="text-sm font-medium text-gray-800">Hello, {user?.name || "User"} 👋</p>
    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
  </div>

  <a
    href="/profile"
    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition"
  >
    <span><FaUser/></span> Profile
  </a>

  <a
    href="/orders"
    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition"
  >
    <span><LuBox/></span> My Orders
  </a>

  <button
    onClick={handleLogout}
    className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-200 transition"
  >
    <span className="text-red-600"><FaSignOutAlt/></span> Logout
  </button>
</div>

                  )}
                </>
              ) : (
                <>
                  {/* Not logged-in: Show Sign In button */}
                  <Link to="/login" className="text-sm px-3 py-1.5 rounded-full border border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white transition font-medium">
                    Sign In
                  </Link>
                  <Link to="/register" className="text-sm px-3 py-1.5 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition font-medium">
                    Register  
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE SEARCH */}
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
        className={` bg-white px-4 overflow-hidden shadow-md transition-all duration-300 transform origin-top rounded-b-xl ${
          mobileMenuOpen
            ? "scale-100 opacity-100 max-h-[500px] py-4"
            : "scale-95 opacity-0 max-h-0 py-0"
        }`}
      >
        <nav className="space-y-3 transition-opacity duration-300">
          {["Home", "Shop", "About", "Contact"].map((item) => (
            <Link to={item === "Home" ? "/" : `/${item.toLowerCase()}`} key={item} className="block text-gray-700 hover:text-yellow-500 font-medium transition" onClick={() => setMobileMenuOpen(false)}>
              {item}  
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
