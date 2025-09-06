// components/FeaturedProducts.tsx
"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useState } from "react";

const mockProducts = [
  {
    id: "1",
    title: "Wooden Armchair",
    imageUrl:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    price: 3500,
  },
  {
    id: "2",
    title: "Minimalist Desk Lamp",
    imageUrl:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
    price: 1200,
  },
  {
    id: "3",
    title: "Leather-bound Journal",
    imageUrl:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80",
    price: 850,
  },
  {
    id: "4",
    title: "Cricket Bat",
    imageUrl:
      "https://scssports.in/cdn/shop/files/mrf-genius-grand-test-edition_0_1_535x.png?v=1733736694",
    price: 2200,
  },
];

export default function FeaturedProducts() {
  const [products] = useState(mockProducts);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Featured <span className="text-green-600">Products</span>
          </h2>
          <p className="text-gray-600 mt-2">
            Handpicked sustainable treasures for your home and lifestyle
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer group"
            >
              {/* Image Section */}
              <div className="relative overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button className="absolute top-3 right-3 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:scale-110">
                  <Heart className="w-5 h-5 text-red-500" />
                </button>
              </div>

              {/* Info Section */}
              <div className="p-5 text-center">
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                  {product.title}
                </h3>
                <p className="font-bold text-green-600 text-xl mb-4">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
                <button className="bg-green-600 text-white px-5 py-2 rounded-lg font-medium shadow hover:bg-green-700 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Find More Products Button */}
        <div className="mt-12 text-center">
          <Link href="/feed">
            <button className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-green-700 transition-colors">
              Find More Products
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
