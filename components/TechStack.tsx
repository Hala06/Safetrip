// components/TechStack.tsx
import React from "react";

const techs = [
  { title: "Frontend", desc: "Next.js (React) + Tailwind + Framer Motion" },
  { title: "Maps", desc: "Google Maps JavaScript API" },
  { title: "Places & Search", desc: "Google Places API" },
  { title: "Weather", desc: "OpenWeatherMap API" },
  { title: "AI Assistant", desc: "OpenAI / Gemini Integration" },
  { title: "Data Sources", desc: "Open Crime Data + Community Reviews" },
];

export default function TechStack() {
  return (
    <section id="tech" className="py-20 px-6 bg-white dark:bg-gray-900 transition-colors">
      <h2 className="text-3xl font-semibold text-center mb-12 text-blue-400 dark:text-yellow-300">
        Powered by Modern Technology
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {techs.map((t) => (
          <div
            key={t.title}
            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-bold mb-2">{t.title}</h3>
            <p>{t.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}