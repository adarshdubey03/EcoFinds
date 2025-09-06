"use client";

import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Eye } from "lucide-react";

interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  image?: string;
  badge?: string; // optional badge/tag
}

export default function FeedPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product._id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
    alert("Product added to cart!");
  };

  if (loading)
    return (
      <p className="text-center mt-20 text-gray-500 text-lg animate-pulse">
        Loading products...
      </p>
    );

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      {/* Header */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center mb-12 cursor-pointer">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Explore EcoFinds Products
        </h1>
        <p className="text-gray-600 text-lg">
          Browse through a curated collection of eco-friendly products.
        </p>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No products available.
          </p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="relative bg-white rounded-3xl shadow-md hover:shadow-2xl transition-transform transform hover:-translate-y-1 hover:scale-105 overflow-hidden group cursor-pointer"
            >
              {/* Image */}
              <div className="relative w-full h-56 sm:h-64 md:h-48 overflow-hidden cursor-pointer">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}

                {/* Badge */}
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md cursor-pointer">
                    {product.badge}
                  </span>
                )}

                {/* Subtle Hover overlay buttons */}
                <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a
                    href={`/product/${product._id}`}
                    className="flex items-center gap-1 bg-white text-gray-800 px-4 py-2 rounded-full shadow-md hover:bg-gray-100 transition cursor-pointer"
                  >
                    <Eye size={16} /> View
                  </a>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center gap-1 bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition cursor-pointer"
                  >
                    <ShoppingCart size={16} /> Add
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 cursor-pointer">
                    {product.title}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-3 cursor-pointer">
                    {product.description}
                  </p>
                </div>
                <div className="mt-3 flex justify-between items-center cursor-pointer">
                  <span className="text-green-600 font-bold text-lg">
                    ₹{product.price}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
