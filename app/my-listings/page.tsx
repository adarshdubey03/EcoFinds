"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Edit, Plus } from "lucide-react";

interface Product {
  _id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  image?: string;
}

export default function MyListingsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch("/api/products/my-listings", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to fetch products");
      } else {
        setProducts(data.products);
      }
    } catch (err) {
      setError("Something went wrong while fetching your products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to delete product");
      } else {
        setProducts(products.filter((p) => p._id !== id));
      }
    } catch {
      alert("Something went wrong while deleting the product");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      {/* Centered Header */}
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 text-center">
          My Listings
        </h1>
        <button
          onClick={() => router.push("/add-product")}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition shadow-md cursor-pointer"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-center text-gray-500 text-lg animate-pulse">
          Loading your products...
        </p>
      ) : error ? (
        <p className="text-center text-red-500 text-lg">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No products listed yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-transform transform hover:-translate-y-1 hover:scale-105 overflow-hidden flex flex-col cursor-pointer"
            >
              {/* Image */}
              <div className="relative w-full h-52 sm:h-56 md:h-48 overflow-hidden cursor-pointer">
                <img
                  src={product.image || "/placeholder.png"}
                  alt={product.title}
                  className="w-full h-full object-cover rounded-t-3xl transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Product Info */}
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 line-clamp-1 cursor-pointer">
                    {product.title}
                  </h2>
                  <p className="text-gray-500 text-sm line-clamp-1 cursor-pointer">{product.category}</p>
                  <p className="text-gray-800 font-bold mt-2 text-lg cursor-pointer">₹{product.price}</p>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => router.push(`/edit-product/${product._id}`)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-full hover:bg-blue-700 transition shadow-md cursor-pointer"
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-3 py-2 rounded-full hover:bg-red-700 transition shadow-md cursor-pointer"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
