"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Clock from "./Clock";
import { Mail, Video, Github, MessageSquare } from "lucide-react";
import LightDarkToggle from "./LightDarkToggle";

interface GradientButtonProps {
  href?: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({ href }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [currentDate, setCurrentDate] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

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
    setIsMounted(true);
    const updateDateTime = () => {
      const now = new Date();
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
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
      const seconds = now.getSeconds().toString().padStart(2, "0");

      setCurrentDate(`${day}, ${month} ${date}${suffix}`);
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    if (typeof window !== "undefined") {
      updateDateTime();
      const interval = setInterval(updateDateTime, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <LightDarkToggle />
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 dark:bg-gray-100 text-gray-800 dark:text-gray-200 px-4 overflow-hidden">
        {/* Clock */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-150 opacity-80 pointer-events-none z-0">
          <Clock />
        </div>

        {/* Main content */}
        <div className="z-10 flex flex-col items-center space-y-4">
          {/* Date & Time */}
          <div className="text-xl text-indigo-800 dark:text-indigo-800 text-center mb-[2rem]">
            <div>{currentDate}</div>
            <div className="text-xl text-green-600 dark:text-green-800 mt-[-4px]">{currentTime}</div>
          </div>

          {/* Icons */}
          <div className="flex space-x-6 mt-[6rem]">
            <a
              href="mailto:Jesse@jessejesse.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-800 transition-colors duration-300"
            >
              <Mail size={28} />
            </a>
            <a
              href="https://hello.jessejesse.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-800 hover:text-yellow-600 transition-colors duration-300"
            >
              <Video size={28} />
            </a>
            <a
              href="https://github.com/sudo-self"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-700 hover:text-cyan-500 transition-colors duration-300"
            >
              <Github size={28} />
            </a>
            <a
              href="sms:+17205152459"
              className="text-green-800 hover:text-green-600 transition-colors duration-300"
            >
              <MessageSquare size={28} />
            </a>
          </div>
        </div>

        {/* Footer with the Gradient Button */}
        <footer className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex justify-center pt-2 z-10">
          <a
            href={href}
            className={`relative inline-block px-8 py-4 rounded-lg overflow-hidden font-semibold text-lg ${
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
        </footer>
      </div>
    </>
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



