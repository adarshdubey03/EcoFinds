// components/Footer.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const router = useRouter();

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Subscribed successfully!");
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-16">

          {/* Logo & Description */}
          <div className="flex flex-col justify-start">
            <h2 className="text-3xl font-bold text-white mb-4">EcoFinds</h2>
            <p className="text-gray-400 max-w-sm mb-6 leading-relaxed">
              Sustainable shopping made easy. Buy, sell, and connect with eco-conscious individuals.
            </p>
            <div className="flex space-x-5 mt-4">
              <a href="#" className="hover:text-white transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-12">
            <div className="flex flex-col space-y-4">
              <h4 className="text-white font-semibold">Shop</h4>
              <Link href="/feed" className="hover:text-white transition-colors">Browse</Link>
              <Link href="/add-product" className="hover:text-white transition-colors">Sell</Link>
              <Link href="/my-listings" className="hover:text-white transition-colors">My Items</Link>
            </div>
            <div className="flex flex-col space-y-4">
              <h4 className="text-white font-semibold">Company</h4>
              <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col items-start">
            <h3 className="text-white font-semibold text-lg mb-2">Subscribe to our Newsletter</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Get the latest eco-friendly finds, offers, and updates delivered straight to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex w-full max-w-sm">
              <input
                type="email"
                placeholder="Your email"
                required
                className="flex-1 px-4 py-3 rounded-l-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                className="bg-green-600 px-5 py-3 rounded-r-lg text-white font-semibold hover:bg-green-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-16 pt-8 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} EcoFinds. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
