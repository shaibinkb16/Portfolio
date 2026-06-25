'use client';
import React, { useEffect, useState } from 'react';

const CursorGlow = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setOpacity(1); // Active state
    };

    const handleMouseLeave = () => {
      setOpacity(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-700 ease-out hidden md:block"
      style={{
        opacity,
        background: `radial-gradient(700px circle at ${position.x}px ${position.y}px, rgba(244, 63, 94, 0.055) 0%, rgba(168, 85, 247, 0.035) 25%, rgba(56, 189, 248, 0.015) 55%, transparent 80%)`,
      }}
    />
  );
};

export default CursorGlow;
