"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const LightDarkToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      root.classList.add("dark");
      setIsDark(true);
    } else {
      root.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      localStorage.theme = "light";
      setIsDark(false);
    } else {
      root.classList.add("dark");
      localStorage.theme = "dark";
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="absolute top-6 right-6 z-50 p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default LightDarkToggle;



 
