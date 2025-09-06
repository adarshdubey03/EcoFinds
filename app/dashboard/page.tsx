"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User, ShoppingCart, Package, ClipboardList } from "lucide-react";

interface UserProfile {
  username: string;
  email: string;
  phone?: string;
  image?: string;
}

interface Purchase {
  id: string;
  productName: string;
  amount: number;
  date: string;
  status: string;
}

interface Listing {
  id: string;
  title: string;
  price: number;
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const userRes = await fetch("/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userRes.json();
        setUser(userData);

        const purchasesRes = await fetch("/api/purchases", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const purchasesData = await purchasesRes.json();
        setPurchases(purchasesData.purchases || []);

        const listingsRes = await fetch("/api/products/my-listings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const listingsData = await listingsRes.json();
        setListings(listingsData.products || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-lg text-gray-700">Loading dashboard...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Greeting */}
      <div className="flex flex-col items-center mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {user?.username || "User"}!
        </h1>
        <p className="text-gray-600 mt-1">
          Here's what's happening on your dashboard
        </p>
      </div>

      {/* Stats Cards (Profile → Purchases → Listings) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {/* Profile */}
        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4 hover:shadow-lg transition">
          <User className="w-8 h-8 text-green-600" />
          <div>
            <p className="text-gray-500 text-sm">Profile</p>
            <p className="text-xl font-bold text-gray-800">{user?.email}</p>
          </div>
        </div>

        {/* Purchases */}
        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4 hover:shadow-lg transition">
          <ShoppingCart className="w-8 h-8 text-green-600" />
          <div>
            <p className="text-gray-500 text-sm">Total Purchases</p>
            <p className="text-2xl font-bold text-gray-800">{purchases.length}</p>
          </div>
        </div>

        {/* Listings */}
        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4 hover:shadow-lg transition">
          <Package className="w-8 h-8 text-green-600" />
          <div>
            <p className="text-gray-500 text-sm">My Listings</p>
            <p className="text-2xl font-bold text-gray-800">{listings.length}</p>
          </div>
        </div>
      </div>

      {/* Dashboard Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Purchases */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-green-600" /> Recent Purchases
          </h2>

          {purchases.length === 0 ? (
            <p className="text-gray-600 text-center py-6">No purchases yet.</p>
          ) : (
            <div className="space-y-4">
              {purchases.map((p) => (
                <div
                  key={p.id}
                  className="flex justify-between items-center border border-gray-200 rounded-xl p-4 hover:shadow-md transition bg-gray-50"
                >
                  <div>
                    <p className="font-medium text-gray-800">{p.productName}</p>
                    <p className="text-sm text-gray-500">
                      Date: {new Date(p.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₹{p.amount}</p>
                    <p
                      className={`text-sm font-medium mt-1 ${
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
          )}
        </div>

        {/* Listings */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Package className="w-6 h-6 text-green-600" /> My Listings
          </h2>

          {listings.length === 0 ? (
            <p className="text-gray-600 text-center py-6">No listings yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {listings.map((l) => (
                <div
                  key={l.id}
                  className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow hover:shadow-lg transition flex flex-col justify-between"
                >
                  <h3 className="font-semibold text-gray-800">{l.title}</h3>
                  <p className="text-gray-600 mt-2">Price: ₹{l.price}</p>
                  <Link
                    href={`/edit-product/${l.id}`}
                    className="mt-4 inline-block text-green-600 font-medium hover:underline"
                  >
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
