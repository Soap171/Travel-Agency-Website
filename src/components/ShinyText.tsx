"use client";

import React from "react";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 6,
  className = "",
}) => {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`text-transparent bg-clip-text inline-block bg-[length:200%_auto] ${
        disabled ? "" : "animate-shine"
      } ${className}`}
      style={{
        animationDuration,
        backgroundImage:
          "linear-gradient(120deg, rgba(255, 255, 255, 0) 35%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0) 65%)",
        backgroundSize: "200% auto",
      }}
    >
      {text}
    </span>
  );
};
