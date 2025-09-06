"use client";

import { motion } from "framer-motion";
import { Leaf, Users, DollarSign } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      title: "Eco-Friendly",
      description:
        "Reduce waste and carbon footprint by giving pre-loved items a second life.",
      color: "from-green-50 to-green-100",
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Community",
      description:
        "Connect with like-minded people who value sustainability and quality.",
      color: "from-blue-50 to-blue-100",
    },
    {
      icon: <DollarSign className="w-8 h-8 text-yellow-600" />,
      title: "Affordable",
      description:
        "Find amazing deals on quality items while saving money and the environment.",
      color: "from-yellow-50 to-yellow-100",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-transparent to-yellow-50 opacity-70 -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-green-600">EcoFinds?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience sustainable shopping that benefits <span className="font-semibold">you</span>, the{" "}
            <span className="font-semibold">community</span>, and our{" "}
            <span className="font-semibold">planet</span>.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`p-8 rounded-2xl shadow-lg bg-gradient-to-br ${feature.color} hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:rotate-1`}
            >
              <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-white shadow-md">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
