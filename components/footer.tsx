// components/Footer.tsx
import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-0">
          
          {/* Logo & Description */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">EcoFinds</h2>
            <p className="text-gray-400 max-w-sm">
              Sustainable shopping made easy. Buy, sell, and connect with eco-conscious individuals.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex flex-col space-y-2">
              <Link href="/feed" className="hover:text-white transition-colors">Browse</Link>
              <Link href="/add-product" className="hover:text-white transition-colors">Sell</Link>
              <Link href="/my-listings" className="hover:text-white transition-colors">My Items</Link>
            </div>
            <div className="flex flex-col space-y-2">
              <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-6 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} EcoFinds. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
