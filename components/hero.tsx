"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-100 via-green-50 to-green-100 opacity-30 -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Buy Smart.<br />
              <span className="text-green-600">Sell Smart.</span><br />
              Go Green.
            </h1>
            <p className="text-xl text-gray-600 max-w-lg mx-auto lg:mx-0">
              Discover amazing second-hand treasures while helping save our planet, one purchase at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-6">
              <Link href="/feed">
                <button className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:scale-105 transition-transform">
                  Browse Products
                </button>
              </Link>
              <Link href="/add-product">
                <button className="border border-green-600 text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                  Sell Now
                </button>
              </Link>
            </div>
          </div>

          {/* Image Grid */}
          <div className="relative grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                alt="Vintage items"
                className="rounded-xl shadow-lg hover:scale-105 transition-transform"
              />
              <img 
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
                alt="Handmade pottery"
                className="rounded-xl shadow-lg hover:scale-105 transition-transform"
              />
            </div>
            <div className="space-y-4 pt-8">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
                alt="Vintage books"
                className="rounded-xl shadow-lg hover:scale-105 transition-transform"
              />
              <img 
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                alt="Furniture"
                className="rounded-xl shadow-lg hover:scale-105 transition-transform"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
