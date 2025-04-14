"use client";

import React, { useState, useEffect } from "react";
import { Mail, Video, Github, MessageSquare, Share2 } from "lucide-react";

interface GradientButtonProps {
  href?: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({ href }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsClicked(true);
    window.open("https://jessejesse.xyz", "_blank");
    setTimeout(() => setIsClicked(false), 300);
  };

  const handleShareResume = async () => {
    const shareData = {
      title: "Jesse Roper Resume",
      text: "Check out my resume!",
      url: "https://bucket.jessejesse.com/resume.pdf",
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      window.open(shareData.url, "_blank");
    }
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
      ];
      const day = days[now.getDay()];
      const month = months[now.getMonth()];
      const date = now.getDate();
      const suffix =
        date % 10 === 1 && date !== 11
          ? "st"
          : date % 10 === 2 && date !== 12
          ? "nd"
          : date % 10 === 3 && date !== 13
          ? "rd"
          : "th";
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setCurrentTime(`${day} ${month} ${date}${suffix} ${hours}${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      {/* Circular Image */}
      <img
        src="./1.jpeg"
        alt="Profile"
        className="w-32 h-32 rounded-full object-cover shadow-md transition-transform duration-300 hover:scale-125"
      />

      {/* Gradient Button */}
      <a
        href={href}
        className={`relative inline-block px-6 py-3 rounded-lg overflow-hidden text-white font-semibold ${
          isClicked
            ? "bg-gradient-to-r from-pink-500 to-yellow-500 shadow-lg transform scale-95"
            : `bg-gradient-to-r ${
                isHovered ? "from-pink-600 to-yellow-600" : "from-pink-500 to-yellow-500"
              }`
        } transition-all duration-300 ease-in-out`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        style={{ cursor: href ? "pointer" : "default" }}
        rel="noopener noreferrer"
      >
        {isClicked && (
          <div
            className="absolute inset-0 bg-white opacity-20 rounded-lg"
            style={{
              transform: "scale(2)",
              transition: "transform 0.2s ease-out",
            }}
          />
        )}
        Jesse Roper
      </a>

      {/* Row of Small Icons */}
      <div className="flex space-x-6 mt-4">
        {/* Email */}
        <a
          href="mailto:Jesse@jessejesse.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-pink-500 transition-colors duration-300"
        >
          <Mail size={28} />
        </a>

        {/* Video Call */}
        <a
          href="https://hello.jessejesse.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-yellow-500 transition-colors duration-300"
        >
          <Video size={28} />
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/sudo-self"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-yellow transition-colors duration-300"
        >
          <Github size={28} />
        </a>

        {/* SMS / Text */}
        <a
          href="sms:+17205152459"
          className="text-gray-600 hover:text-green-500 transition-colors duration-300"
        >
          <MessageSquare size={28} />
        </a>

        {/* Share Resume */}
        <button
          onClick={handleShareResume}
          className="text-gray-600 hover:text-blue-500 transition-colors duration-300"
        >
          <Share2 size={28} />
        </button>
      </div>

      {/* Footer Time */}
      <div className="mt-6 text-xs text-cyan-400">{currentTime}</div>
    </div>
  );
};

// --- THIS is the key fix ---
const Page = () => {
  return <GradientButton href="https://jessejesse.xyz" />;
};

export default Page;


