// components/FeatureCard.tsx
import React from "react";

interface Props {
  emoji: string;
  title: string;
  desc: string;
}

export default function FeatureCard({ emoji, title, desc }: Props) {
  return (
    <div className="p-6 bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
      <div className="text-4xl mb-4">{emoji}</div>
      <h3 className="text-xl font-semibold text-blue-300 mb-2">{title}</h3>
      <p className="text-gray-300">{desc}</p>
    </div>
  );
}
