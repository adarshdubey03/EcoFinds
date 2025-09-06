// components/Testimonials.tsx
"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Eco Enthusiast",
    message:
      "EcoFinds has completely changed the way I shop! I love finding sustainable products while supporting a great community.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Collector",
    message:
      "I sold some of my vintage items here and made great connections with other eco-friendly buyers. Highly recommend!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Diana Lee",
    role: "Designer",
    message:
      "The platform is smooth, clean, and easy to use. It’s a joy to browse for second-hand treasures.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            What Our Users Say
          </h2>
          <p className="text-gray-600 mt-2 max-w-xl mx-auto">
            Hear from our community of eco-conscious buyers and sellers.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              className="bg-white relative rounded-2xl p-8 shadow-md hover:shadow-2xl transition-shadow duration-500 flex flex-col items-center text-center group"
            >
              {/* Quotation Icon */}
              <Quote className="absolute top-4 left-4 w-6 h-6 text-green-100" />

              {/* Avatar */}
              <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-green-100 mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Stars */}
              <div className="flex space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform"
                  />
                ))}
              </div>

              {/* Message */}
              <p className="text-gray-700 mb-6 text-sm sm:text-base">
                &quot;{testimonial.message}&quot;
              </p>

              {/* Name & Role */}
              <h3 className="font-semibold text-gray-900 text-lg">
                {testimonial.name}
              </h3>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
