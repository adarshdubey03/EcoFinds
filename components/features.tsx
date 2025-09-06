import { Leaf, Users, DollarSign } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      title: "Eco-Friendly",
      description:
        "Reduce waste and carbon footprint by giving pre-loved items a second life.",
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Community",
      description:
        "Connect with like-minded people who value sustainability and quality.",
    },
    {
      icon: <DollarSign className="w-8 h-8 text-yellow-600" />,
      title: "Affordable",
      description:
        "Find amazing deals on quality items while saving money and the environment.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Choose EcoFinds?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience sustainable shopping that benefits you, the community, and our planet.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-gray-100">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
