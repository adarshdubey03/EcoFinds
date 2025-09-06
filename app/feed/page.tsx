"use client";

import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  image?: string;
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
    return <p className="text-center mt-20 text-gray-500 text-lg">Loading products...</p>;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      {/* Header */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Explore EcoFinds Products</h1>
        <p className="text-gray-600 text-lg">
          Browse through a curated collection of eco-friendly products.
        </p>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No products available.
          </p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">{product.title}</h2>
                  <p className="text-gray-600 text-sm line-clamp-3">{product.description}</p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-green-600 font-bold text-lg">₹{product.price}</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <a
                    href={`/product/${product._id}`}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-medium text-sm text-center"
                  >
                    View
                  </a>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
