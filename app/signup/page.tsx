"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        router.push("/feed"); // redirect after signup
      } else {
        setError(data.error || "Signup failed");
      }
    } catch {
      setError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left branding section */}
      <div className="hidden lg:flex w-1/2 bg-green-600 justify-center items-center">
        <div className="text-center px-12">
          <h1 className="text-white text-4xl font-bold mb-4">Join EcoFinds!</h1>
          <p className="text-green-100 text-lg">
            Create your account and start exploring eco-friendly products today.
          </p>
        </div>
      </div>

      {/* Right form section */}
      <div className="flex flex-1 justify-center items-center p-8">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Sign Up</h2>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
                placeholder="Your full name"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
                placeholder="Create a password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-green-600 font-medium hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
