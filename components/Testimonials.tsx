// components/Testimonials.tsx
import { Star } from "lucide-react";

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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
          <p className="text-gray-600 mt-2 max-w-xl mx-auto">
            Hear from our community of eco-conscious buyers and sellers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center"
            >
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mb-4"
              />
              <div className="flex space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">&quot;{testimonial.message}&quot;</p>
              <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
