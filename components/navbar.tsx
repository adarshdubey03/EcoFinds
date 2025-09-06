// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Leaf, Search, ShoppingCart, User, Menu, X } from "lucide-react";

interface CartItem {
  id: string;
  quantity: number;
}

export default function Navbar() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Mock current user and cart data
  const currentUserId = "user1";
  const cartItems: CartItem[] = [
    { id: "1", quantity: 1 },
    { id: "2", quantity: 2 },
  ];

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Hide navbar on auth pages
  if (pathname === "/login" || pathname === "/signup") return null;

  const navLinks = [
    { name: "Browse", href: "/feed" },
    { name: "Sell", href: "/add-product" },
    { name: "My Items", href: "/my-listings" },
  ];

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
                className={`px-3 py-1 font-medium transition rounded ${
                  pathname === link.href
                    ? "bg-green-100 text-green-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search eco-friendly products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative p-2 rounded hover:bg-gray-100 transition">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* User Dropdown */}
            <div className="relative">
              <button className="p-2 rounded-full hover:bg-gray-100 transition">
                <User className="w-5 h-5 text-gray-700" />
              </button>
              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg border rounded-md hidden group-hover:block">
                <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                <Link href="/purchases" className="block px-4 py-2 hover:bg-gray-100">Purchases</Link>
                <hr className="my-1" />
                <Link href="/login" className="block px-4 py-2 hover:bg-gray-100">Login</Link>
              </div>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded hover:bg-gray-100 transition"
            >
              {mobileOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
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
                className="block px-3 py-2 rounded hover:bg-gray-100 transition"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded hover:bg-gray-100 transition"
            >
              Dashboard
            </Link>
            <Link
              href="/purchases"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded hover:bg-gray-100 transition"
            >
              Purchases
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded hover:bg-gray-100 transition"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
