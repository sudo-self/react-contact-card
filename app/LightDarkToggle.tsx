"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const LightDarkToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Check if the theme preference is stored in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      // Apply the saved theme (dark or light)
      document.documentElement.classList.add(savedTheme);
      setIsDarkMode(savedTheme === "dark");
    } else {
      // Default to system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDarkMode;
    // Toggle the dark class on the root element
    document.documentElement.classList.toggle("dark", newIsDark);
    // Update the state and store the preference
    setIsDarkMode(newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  return (
    <button onClick={toggleTheme} className="transition-all duration-300">
      {isDarkMode ? (
        <Moon className="text-yellow-500" size={24} />
      ) : (
        <Sun className="text-yellow-500" size={24} />
      )}
    </button>
  );
};

export default LightDarkToggle;



 
