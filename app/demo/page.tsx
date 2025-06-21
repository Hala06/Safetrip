// src/app/demo/page.tsx
"use client";

import React from "react";
import Navbar from "../../components/Navbar";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* 1. Navbar */}
      <Navbar onToggleTheme={() => {}} theme="light" />

      {/* 2. Content */}
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center text-blue-400 mb-4">
          See SafeTrip.AI in Action
        </h1>
        <p className="text-center text-lg text-gray-300 mb-12">
          Experience our intelligent mapping system that highlights safe zones and culturally-aligned places
        </p>

        {/* 3. Demo panel */}
        <div className="relative bg-gray-800 bg-opacity-50 rounded-xl h-72 p-6">
          {/* Info card */}
          <div className="absolute top-6 left-6 bg-black bg-opacity-60 rounded-lg p-4 text-white text-sm space-y-1">
            <h3 className="font-semibold">Downtown Core</h3>
            <ul>
              <li>✅ Safe for solo travelers</li>
              <li>🕌 3 prayer rooms nearby</li>
              <li>🍽️ 5 halal restaurants</li>
              <li>🚇 Metro accessible</li>
            </ul>
          </div>

          {/* Circles */}
          <div className="flex h-full items-center justify-evenly">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-12 w-12 border-2 border-blue-400 rounded-full" />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
