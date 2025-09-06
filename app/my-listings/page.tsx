"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  image: string;
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Listings</h1>
        <button
          onClick={() => router.push("/add-product")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          + Add Product
        </button>
      </div>

      {loading ? (
        <p>Loading your products...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : products.length === 0 ? (
        <p>No products listed yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white p-4 rounded shadow">
              <img
                src={product.image || "/placeholder.png"}
                alt={product.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-gray-500">{product.category}</p>
              <p className="text-gray-800 font-medium mt-2">₹{product.price}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => router.push(`/edit-product/${product._id}`)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
