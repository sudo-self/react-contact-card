"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Mail, Video, Github, MessageSquare, Share2 } from "lucide-react";

interface GradientButtonProps {
  href?: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({ href }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
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
    const updateDateTime = () => {
      const now = new Date();
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const months = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"];
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
      const seconds = now.getSeconds().toString().padStart(2, "0");

      setCurrentDate(`${day}, ${month} ${date}${suffix}`);
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6 bg-[#f9f9f9] text-gray-800">
      {/* Display Current Date and Time at the Top */}
      <div className="text-xs text-indigo-700 mt-4 mb-2">
        <div>{currentDate}</div>
        <div className="text-sm text-indigo-700">{currentTime}</div>
      </div>

      {/* Profile Image */}
      <img
        src="./1.jpeg"
        alt="Profile"
        className="w-32 h-32 rounded-full object-cover shadow-lg transition-transform duration-300 hover:scale-110"
      />

      {/* Gradient Button */}
      <a
        href={href}
        className={`relative inline-block px-6 py-3 rounded-lg overflow-hidden font-semibold ${
          isClicked
            ? "bg-gradient-to-r from-pink-400 to-yellow-400 shadow-lg transform scale-95"
            : `bg-gradient-to-r ${
                isHovered ? "from-pink-500 to-yellow-500" : "from-pink-400 to-yellow-400"
              }`
        } text-white transition-all duration-300 ease-in-out`}
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
        <a
          href="mailto:Jesse@jessejesse.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-pink-600 transition-colors duration-300"
        >
          <Mail size={28} />
        </a>

        <a
          href="https://hello.jessejesse.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-yellow-600 transition-colors duration-300"
        >
          <Video size={28} />
        </a>

        <a
          href="https://github.com/sudo-self"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-yellow-500 transition-colors duration-300"
        >
          <Github size={28} />
        </a>

        <a
          href="sms:+17205152459"
          className="text-gray-500 hover:text-green-600 transition-colors duration-300"
        >
          <MessageSquare size={28} />
        </a>

        <button
          onClick={handleShareResume}
          className="text-gray-500 hover:text-blue-600 transition-colors duration-300"
        >
          <Share2 size={28} />
        </button>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Jesse</title>
        <meta name="title" content="Jesse" />
        <meta name="description" content="Hello! I am Jesse here is my contact info" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jesse-contact-card.vercel.app" />
        <meta property="og:title" content="Jesse" />
        <meta property="og:description" content="Hello! I am Jesse here is my contact info" />
        <meta property="og:image" content="https://jesse-contact-card.vercel.app/og.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://jesse-contact-card.vercel.app" />
        <meta property="twitter:title" content="Jesse" />
        <meta property="twitter:description" content="Hello! I am Jesse here is my contact info" />
        <meta property="twitter:image" content="https://jesse-contact-card.vercel.app/og.png" />
        <meta name="author" content="Jesse" />
      </Head>

      <GradientButton href="https://jessejesse.xyz" />
    </>
  );
};

export default Page;





