// components/Features.tsx
import React from "react";

const features = [
  {
    emoji: "🎯",
    title: "Smart Filters",
    desc: "Find halal restaurants, mosques, prayer rooms while avoiding bars, red‑light zones, and high‑crime areas. Perfect for values‑based travelers.",
  },
  {
    emoji: "🛡️",
    title: "SafeZone Map Layer",
    desc: "Visualize low‑risk areas with our intelligent safety mapping system based on real crime data and community insights.",
  },
  {
    emoji: "📍",
    title: "Area Summaries",
    desc: 'AI‑generated neighborhood overviews: "Great for solo travelers. Quiet area with 2 halal cafés and a family‑friendly atmosphere."',
  },
  {
    emoji: "💬",
    title: "AI Chatbot Assistant",
    desc: 'Ask questions like "Is Kensington Market safe at night?" and get friendly, contextual responses from our AI travel companion.',
  },
  {
    emoji: "💰",
    title: "Budget Filter",
    desc: "Discover affordable experiences with public transit options. Travel smart without breaking the bank.",
  },
  {
    emoji: "👥",
    title: "Community Insights",
    desc: "Real reviews from travelers like you. Solo women, Muslim tourists, and accessibility‑conscious users sharing their experiences.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-6 bg-gray-100 dark:bg-gray-800">
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-12">
        Key Features
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="text-4xl">{f.emoji}</div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-4 mb-2">
              {f.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}