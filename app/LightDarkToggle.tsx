"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function LightDarkToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const root = window.document.documentElement;

    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      root.classList.add("dark");
      setIsDark(true);
    } else {
      root.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    const isDarkNow = root.classList.contains("dark");

    if (isDarkNow) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="absolute top-4 right-4 z-50 p-2 rounded-full bg-gray-200 dark:bg-gray-800"
    >
      {isDark ? (
        <Sun size={24} className="text-yellow-500 dark:text-gray-200" />
      ) : (
        <Moon size={24} className="text-gray-900 dark:text-gray-100" />
      )}
    </button>
  );
}

