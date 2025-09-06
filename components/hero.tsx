"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-100 via-green-50 to-green-100 opacity-40 -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left space-y-6"
          >
            <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
              Buy Smart. <br />
              <span className="text-green-600">Sell Smart.</span> <br />
              Go Green
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0">
              Discover amazing second-hand treasures and unique finds while saving our planet, one purchase at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-6">
              <Link href="/feed">
                <button className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform focus:ring-2 focus:ring-green-400 focus:ring-offset-2">
                  Browse Products
                </button>
              </Link>
              <Link href="/add-product">
                <button className="border border-green-600 text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-green-50 transition-colors focus:ring-2 focus:ring-green-400 focus:ring-offset-2">
                  Sell Now
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="hidden md:grid relative grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              {/* ✅ First Image Replaced */}
              <img
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80"
                alt="Vintage gadgets"
                loading="lazy"
                className="rounded-2xl shadow-lg hover:scale-105 transition-transform object-cover aspect-[4/3] w-full"
              />
              <img
                src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=500&q=80"
                alt="Retro gadgets"
                loading="lazy"
                className="rounded-2xl shadow-lg hover:scale-105 transition-transform object-cover aspect-[4/3] w-full"
              />
            </div>
            <div className="space-y-4 pt-8">
              <img
                src="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=500&q=80"
                alt="Vintage bikes"
                loading="lazy"
                className="rounded-2xl shadow-lg hover:scale-105 transition-transform object-cover aspect-[4/3] w-full"
              />
              <img
                src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=500&q=80"
                alt="Upcycled furniture"
                loading="lazy"
                className="rounded-2xl shadow-lg hover:scale-105 transition-transform object-cover aspect-[4/3] w-full"
              />
            </div>
          </motion.div>

          {/* Mobile Featured Image */}
          <div className="md:hidden">
            <img
              src="https://images.unsplash.com/photo-1628009367499-8aa6467fdd9c?auto=format&fit=crop&w=800&q=80"
              alt="Eco-friendly shopping"
              className="rounded-2xl shadow-lg w-full h-64 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
