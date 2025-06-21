"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (saved === "dark" || (!saved && prefersDark)) {
      document.documentElement.classList.add("dark");
      setDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDark(false);
    }
  }, []);

  const toggleTheme = () => {
    setDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return next;
    });
  };

  return (
    <body className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 px-4 py-2 rounded bg-gray-200 dark:bg-gray-800 text-black dark:text-white shadow"
      >
        Switch to {dark ? "Light" : "Dark"} Mode
      </button>
    </body>
  );
}

