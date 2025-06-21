// src/app/layout.tsx
"use client";

import "./globals.css";
import { useState, useEffect, ReactNode } from "react";
import Navbar from "../components/Navbar";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") return stored;
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  });

  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") html.classList.add("dark");
    else html.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased">
        <Navbar onToggleTheme={toggleTheme} theme={theme} />
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-6">{children}</div>
        </main>
      </body>
    </html>
  );
}
