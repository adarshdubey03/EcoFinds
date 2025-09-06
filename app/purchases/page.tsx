"use client";

import { useEffect, useState } from "react";
import { ClipboardList } from "lucide-react";

interface Purchase {
  id: string;
  productName: string;
  amount: number;
  date: string;
  status: string;
}

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const res = await fetch("/api/purchases", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch purchases");

        const data = await res.json();
        setPurchases(data.purchases || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 text-center">
        <p className="text-lg text-gray-700">Loading purchases...</p>
      </div>
    );

  if (!purchases.length)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 text-center px-4">
        <p className="text-2xl font-semibold text-gray-800">
          You have no purchases yet.
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3 text-gray-800">
        <ClipboardList className="w-7 h-7 text-green-600" /> My Purchases
      </h1>

      <div className="w-full max-w-lg space-y-6">
        {purchases.map((p) => (
          <div
            key={p.id}
            className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center shadow hover:shadow-lg transition duration-300"
          >
            <div className="mb-3 sm:mb-0">
              <p className="font-semibold text-lg text-gray-800">{p.productName}</p>
              <p className="text-sm text-gray-500 mt-1">
                Purchased on: {new Date(p.date).toLocaleDateString()}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <p className="font-bold text-lg text-gray-900">₹{p.amount}</p>
              <p
                className={`mt-1 font-medium text-sm ${
                  p.status === "completed"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
