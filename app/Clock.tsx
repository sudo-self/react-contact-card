"use client";

import React, { useState, useEffect } from 'react';

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [running, setRunning] = useState(true);
  const [watchFace, setWatchFace] = useState<'watch1' | 'watch2'>('watch1');

  useEffect(() => {
    const updateClock = () => {
      if (running) {
        setTime(new Date());
        requestAnimationFrame(updateClock);
      }
    };

    requestAnimationFrame(updateClock);
    return () => setRunning(false);
  }, [running]);

  // Auto toggle watch face every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setWatchFace(prev => (prev === 'watch1' ? 'watch2' : 'watch1'));
    }, 5000); // every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();
  const millisecond = time.getMilliseconds();

  const hourDegrees =
    ((hour % 12) / 12) * 360 +
    (minute / 60) * 30 +
    (second / 60) * 0.5;
  const minuteDegrees =
    (minute / 60) * 360 +
    (second / 60) * 6;
  const secondDegrees =
    (second / 60) * 360 +
    (millisecond / 1000) * 6;

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative w-64 h-64 rounded-full bg-white shadow-lg">
        {/* Watch face background */}
        <div
          className="absolute top-0 left-0 w-full h-full rounded-full"
          style={{
            backgroundImage: `url(./${watchFace}.svg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-pink-500 rounded-full z-10" />
        </div>

        {/* Second hand */}
        <div
          className="absolute top-1/2 left-1/2 bg-gray-300 h-24 w-1 rounded-full"
          style={{
            transform: `rotate(${secondDegrees}deg)`,
            transformOrigin: 'top center',
            marginLeft: '-0.5px',
            marginTop: '2px',
          }}
        />
      </div>
    </div>
  );
};

export default Clock;



