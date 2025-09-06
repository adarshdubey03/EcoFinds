"use client";

import { useCart, CartItem } from "../context/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return;

    if (!confirm("Are you sure you want to place the order?")) return;

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      // Prepare purchase data
      const purchaseData = {
        user: localStorage.getItem("userId") || "guest", // store user ID in localStorage when login
        products: cartItems.map((item) => ({
          productId: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount: totalPrice,
      };

      // Call the API to save purchase
      const res = await fetch("/api/purchases/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(purchaseData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to place order");
      } else {
        clearCart();
        alert("Order placed successfully!");
        router.push("/feed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while placing the order");
    } finally {
      setLoading(false);
    }
  };

  // Empty Cart UI
  if (cartItems.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-6">Browse our products and add items to your cart.</p>
        <button
          onClick={() => router.push("/feed")}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold shadow"
        >
          Browse Products
        </button>
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">Your Cart</h1>

        {error && (
          <div className="text-red-500 mb-4 text-center font-semibold">{error}</div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
          {cartItems.map((item: CartItem) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center justify-between border-b last:border-b-0 pb-4 hover:shadow-md transition rounded-lg px-3"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4 w-full md:w-1/2">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-28 h-28 object-cover rounded-lg shadow-sm"
                  />
                )}
                <div>
                  <h2 className="font-semibold text-lg text-gray-900">{item.title}</h2>
                  <p className="text-gray-600 mt-1">₹{item.price}</p>
                </div>
              </div>

              {/* Quantity & Remove */}
              <div className="flex items-center gap-2 mt-4 md:mt-0">
                <button
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800 transition font-bold"
                >
                  -
                </button>
                <span className="px-3 py-1 border rounded text-center w-12">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800 transition font-bold"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition font-semibold"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total & Place Order */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-6 pt-4 border-t">
            <div className="text-xl font-bold text-gray-900 mb-4 md:mb-0">
              Total: <span className="text-green-600">₹{totalPrice}</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => router.push("/feed")}
                className="bg-gray-200 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
              >
                Continue Shopping
              </button>
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className={`bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold shadow ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
