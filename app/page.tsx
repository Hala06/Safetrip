// src/app/page.tsx
import React from "react";
import TechStack from "../components/TechStack";
import Footer from "../components/Footer";

const features = [
  {
    title: "🎯 Smart City Guides",
    description: "Find halal restaurants, mosques, prayer rooms while avoiding bars, red-light zones, and high-crime areas. Perfect for values-based travelers.",
    link: "#smart-city-guides",
  },
  {
    title: "🛡️ Real-Time Alerts",
    description: "Stay updated with safety notifications with our intelligent safety mapping system based on real crime data. ",
    link: "#real-time-alerts",
  },
  {
    title: "📍 Personalized Itineraries",
    description: "Plans tailored to your values and comfort. Great for solo travelers. 'Quiet area with 2 halal cafés and family-friendly atmosphere.'",
    link: "#personalized-itineraries",
  },
  {
    title: "💬 AI Chatbot Assistant",
    description: "Your 24/7 travel companion for instant answers and support.",
    link: "#ai-chat-assistant",
  },
  {
    title: "💰 Budget-filtering",
    description: "Find accommodations and activities that fit your budget.",
    link: "#budget-filtering",
  },
  {
    title: "👥 Community Insights",
    description: "Learn from other travelers' experiences and tips.",
    link: "#community-insights",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <h1 className="text-5xl font-bold text-center mb-4 text-blue-400 dark:text-yellow-300">
          SafeTrip.AI
        </h1>
        <p className="text-center text-lg mb-12">
          Your personalized travel assistant that helps first-time and
          values-based travelers explore unfamiliar cities safely and
          comfortably
        </p>
        <div className="text-center mb-16">
          <a
            href="#features"
            className="inline-block bg-blue-500 dark:bg-yellow-400 hover:bg-blue-600 dark:hover:bg-yellow-300 text-white dark:text-gray-900 font-medium py-3 px-6 rounded-lg transition"
          >
            Start Your Safe Journey
          </a>
        </div>

        {/* Features with halo + gradient */}
        <section
          id="features"
          className="relative px-6 py-16 bg-white dark:bg-gray-800 rounded-3xl overflow-hidden"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <a
                key={feature.title}
                href={feature.link}
                className="block bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-medium py-8 px-6 rounded-lg text-center shadow-lg transition cursor-pointer"
              >
                <h3 className="text-2xl font-semibold mb-2 text-blue-400 dark:text-yellow-300">
                  {feature.title}
                </h3>
                <p className="text-base text-gray-700 dark:text-gray-300">
                  {feature.description}
                </p>
              </a>
            ))}
          </div>
        </section>

        <TechStack />
        <Footer />
      </div>
    </main>
  );
}
