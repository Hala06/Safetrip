// components/Footer.tsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 py-8 transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col items-center px-6">
        <h2 className="text-2xl font-bold text-blue-400 dark:text-yellow-300 mb-2 text-center">
         SafeTrip.AI
        </h2>
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-6 text-center">
          Making travel safer and more inclusive for everyone
        </h3>
        <div className="space-x-6 mb-4">
          <a href="/privacy" className="hover:text-black dark:hover:text-white">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-black dark:hover:text-white">
            Terms of Service
          </a>
          <a href="/api-docs" className="hover:text-black dark:hover:text-white">
            API Documentation
          </a>
          <a href="#contact" className="hover:text-black dark:hover:text-white">
            Contact Us
          </a>
        </div>
      </div>
      <p className="text-center text-sm mt-8">© 2025 SafeTrip.AI. All rights reserved.</p>
    </footer>
  );
}