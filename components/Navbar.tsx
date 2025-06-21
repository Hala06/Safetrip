// src/components/Navbar.tsx
"use client";

import React from "react";
import Link from "next/link";

type NavbarProps = {
  onToggleTheme: () => void;
  theme: "light" | "dark";
};

const NAV_ITEMS = [
  { label: "Features", href: "/#features" },
  { label: "Demo",     href: "/demo"    },  // ← new page route
  { label: "Tech",     href: "/#tech"    },
  { label: "Contact",  href: "/#contact" },
];

export default function Navbar({ onToggleTheme, theme }: NavbarProps) {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white dark:bg-gray-800 shadow">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-gray-800 dark:text-white"
        >
          SafeTrip.AI
        </Link>

        <div className="flex items-center space-x-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition"
            >
              {item.label}
            </Link>
          ))}

          <button
            onClick={onToggleTheme}
            aria-label="Toggle Dark Mode"
            className="p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>
    </nav>
  );
}
