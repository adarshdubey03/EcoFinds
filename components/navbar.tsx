"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  Leaf,
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ClipboardList,
  LogOut,
} from "lucide-react";

interface CartItem {
  id: string;
  quantity: number;
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // <--- new
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true); // now we are mounted, can access client-only APIs
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const cartItems: CartItem[] = [
    { id: "1", quantity: 1 },
    { id: "2", quantity: 2 },
  ];
  const cartItemsCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // Only render after client mount
  if (!mounted) return null;

  if (pathname === "/login" || pathname === "/signup") return null;

  const navLinks = [
    { name: "Browse", href: "/feed" },
    { name: "Sell", href: "/add-product" },
    { name: "My Items", href: "/my-listings" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">EcoFinds</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-1 font-medium rounded transition ${
                  pathname === link.href
                    ? "bg-green-100 text-green-700"
                    : "text-gray-700 hover:bg-green-100 hover:text-green-700"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search eco-friendly products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 text-gray-800"
            />
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  className="px-3 py-1 text-gray-700 font-medium hover:bg-green-100 rounded transition"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-3 py-1 text-white bg-green-500 hover:bg-green-600 rounded transition"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                {/* Cart */}
                <Link
                  href="/cart"
                  className="relative p-2 rounded hover:bg-green-50 transition"
                >
                  <ShoppingCart className="w-5 h-5 text-gray-700" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>

                {/* User Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="p-2 rounded-full hover:bg-green-50 transition duration-300"
                  >
                    <User className="w-5 h-5 text-gray-700" />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl border border-gray-200 rounded-xl z-50">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-4 py-3 text-gray-800 hover:bg-green-100 rounded-t-xl transition"
                      >
                        <User className="w-4 h-4 text-gray-700" /> Dashboard
                      </Link>
                      <Link
                        href="/purchases"
                        className="flex items-center gap-2 px-4 py-3 text-gray-800 hover:bg-green-100 transition"
                      >
                        <ClipboardList className="w-4 h-4 text-gray-700" />{" "}
                        Purchases
                      </Link>
                      <hr className="border-gray-200 my-1" />
                      <button
                        className="flex items-center gap-2 w-full text-left px-4 py-3 text-red-600 hover:bg-red-100 rounded-b-xl transition"
                        onClick={handleLogout}
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded hover:bg-green-50 transition"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded hover:bg-green-100 transition"
              >
                {link.name}
              </Link>
            ))}

            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded hover:bg-green-100 transition"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded hover:bg-green-100 transition"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/cart"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded hover:bg-green-100 transition"
                >
                  Cart
                </Link>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded hover:bg-green-100 transition"
                >
                  Dashboard
                </Link>
                <Link
                  href="/purchases"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded hover:bg-green-100 transition"
                >
                  Purchases
                </Link>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left px-3 py-2 rounded hover:bg-red-100 transition text-red-600"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
