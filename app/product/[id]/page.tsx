"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";

interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  image?: string;
  owner: string;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products?id=${id}`);
        const data = await res.json();
        if (res.ok) setProduct(data.product);
        else setError(data.error || "Failed to fetch product");
      } catch (err) {
        console.error(err);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product._id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
    alert("Product added to cart!");
  };

  const handleBuyNow = () => {
    if (!product) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to purchase");
      router.push("/login");
      return;
    }

    // Placeholder: You can later integrate checkout/payment
    alert("Purchase flow will be implemented here.");
  };

  if (loading)
    return (
      <p className="text-center mt-20 text-gray-500 text-lg">Loading product...</p>
    );
  if (error)
    return (
      <p className="text-center mt-20 text-red-500 text-lg">{error}</p>
    );
  if (!product)
    return (
      <p className="text-center mt-20 text-gray-500 text-lg">Product not found</p>
    );

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="md:w-1/2 bg-gray-100 flex items-center justify-center">
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400 text-lg">No Image Available</span>
          )}
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.title}</h1>
            <p className="text-green-600 font-extrabold text-3xl mb-6">₹{product.price}</p>
            <h2 className="text-gray-700 text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          <div className="mt-8 flex flex-col gap-4 md:flex-row">
            <button
              onClick={handleAddToCart}
              className="flex-1 w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 w-full bg-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition shadow-lg hover:shadow-xl"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
