"use client";

import { useEffect, useState } from "react";
import { ClipboardList } from "lucide-react";

interface Product {
  productId: string;
  title: string;
  price: number;
  quantity: number;
}

interface Purchase {
  _id: string;
  products: Product[];
  totalAmount: number;
  purchasedAt: string;
  status: string;
}

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPurchases = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const res = await fetch("/api/purchases", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Failed to fetch purchases");
        } else {
          setPurchases(data.purchases || []);
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching purchases");
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 space-y-4 p-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-full max-w-5xl h-24 bg-gray-200 rounded-2xl animate-pulse"
          />
        ))}
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 space-y-4">
        <p className="text-lg text-red-500">{error}</p>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex flex-col items-center mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          My Purchases
        </h1>
        <p className="text-gray-600 text-lg">
          Track all your recent purchases in one place
        </p>
      </div>

      {/* Purchases List */}
      {purchases.length === 0 ? (
        <p className="text-gray-500 text-center text-lg py-20">
          You have not made any purchases yet.
        </p>
      ) : (
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {purchases.map((p) => (
            <div
              key={p._id}
              className="flex flex-col justify-between bg-white rounded-2xl shadow hover:shadow-lg p-6 transition cursor-pointer"
            >
              {/* Header: icon + status */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <ClipboardList className="text-gray-500 w-5 h-5" />
                  <p className="font-semibold text-gray-900 text-lg">
                    Purchase ID: {p._id.slice(0, 8)}...
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    p.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                </span>
              </div>

              {/* Products */}
              <div className="space-y-1 mb-4">
                {p.products.map((prod) => (
                  <div
                    key={prod.productId}
                    className="flex justify-between text-gray-700 text-sm"
                  >
                    <span>
                      {prod.title} x {prod.quantity}
                    </span>
                    <span>₹{prod.price * prod.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Footer: total + date */}
              <div className="flex justify-between items-center text-gray-900 font-semibold">
                <p>Total: ₹{p.totalAmount}</p>
                <p className="text-sm text-gray-500">
                  {new Date(p.purchasedAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
