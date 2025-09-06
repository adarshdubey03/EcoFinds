// app/search/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
  _id: string; // since Mongo uses _id
  title: string;
  price: number;
  image?: string;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/search?query=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Search results for:{" "}
          <span className="text-green-600">"{query}"</span>
        </h1>

        {loading && (
          <p className="text-gray-500 text-lg">Loading products...</p>
        )}

        {!loading && products.length === 0 && (
          <div className="bg-white border rounded-xl shadow p-6 text-center text-gray-600">
            ❌ No products found for <b>{query}</b>.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white border rounded-xl shadow-sm hover:shadow-lg transition transform hover:-translate-y-1"
            >
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
              ) : (
                <div className="w-full h-48 flex items-center justify-center bg-gray-100 text-gray-400 rounded-t-xl">
                  No Image
                </div>
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {product.title}
                </h2>
                <p className="text-green-600 font-bold mt-2">
                  ₹{product.price}
                </p>
                <button className="mt-4 w-full bg-green-500 text-white py-2 px-3 rounded-lg hover:bg-green-600 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
