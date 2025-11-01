import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./ParallaxBackground.css";

interface TechIcon {
  name: string;
  path: string;
  x: number;
  y: number;
  size: number;
  speed: number;
  rotation: number;
  opacity: number;
}

const ParallaxBackground: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Disable on mobile for better performance
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Tech stack icons - all 9 restored
  const techIcons: TechIcon[] = [
    {
      name: "React",
      path: "/Stack Icons/React.svg",
      x: 10,
      y: 15,
      size: 80,
      speed: 0.3,
      rotation: 0,
      opacity: 0.15,
    },
    {
      name: "TypeScript",
      path: "/Stack Icons/TypeScript.svg",
      x: 75,
      y: 25,
      size: 60,
      speed: 0.5,
      rotation: 45,
      opacity: 0.12,
    },
    {
      name: "Next.js",
      path: "/Stack Icons/Next.js.svg",
      x: 20,
      y: 55,
      size: 70,
      speed: 0.4,
      rotation: -15,
      opacity: 0.18,
    },
    {
      name: "JavaScript",
      path: "/Stack Icons/JavaScript.svg",
      x: 85,
      y: 60,
      size: 55,
      speed: 0.6,
      rotation: 30,
      opacity: 0.14,
    },
    {
      name: "Tailwind",
      path: "/Stack Icons/Tailwind CSS.svg",
      x: 50,
      y: 35,
      size: 65,
      speed: 0.35,
      rotation: -30,
      opacity: 0.16,
    },
    {
      name: "HTML5",
      path: "/Stack Icons/HTML5.svg",
      x: 15,
      y: 80,
      size: 50,
      speed: 0.55,
      rotation: 20,
      opacity: 0.13,
    },
    {
      name: "GitHub",
      path: "/Stack Icons/GitHub Actions.svg",
      x: 70,
      y: 85,
      size: 58,
      speed: 0.45,
      rotation: -25,
      opacity: 0.15,
    },
    {
      name: "Webpack",
      path: "/Stack Icons/Webpack.svg",
      x: 40,
      y: 70,
      size: 48,
      speed: 0.5,
      rotation: 15,
      opacity: 0.12,
    },
    {
      name: "PowerShell",
      path: "/Stack Icons/Powershell.svg",
      x: 92,
      y: 45,
      size: 52,
      speed: 0.4,
      rotation: -10,
      opacity: 0.14,
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="parallax-background">
      {mounted &&
        !isMobile &&
        techIcons.map((icon, index) => {
          // Varied float animation durations and delays for organic movement
          const floatDuration = 6 + (index % 3) * 2; // 6s, 8s, or 10s
          const floatDelay = index * 0.5; // Stagger the start

          return (
            <motion.div
              key={icon.name}
              className="parallax-background__icon"
              style={{
                left: `${icon.x}%`,
                top: `${icon.y}%`,
                opacity: icon.opacity,
              }}
              initial={{
                scale: 0,
                opacity: 0,
                rotate: icon.rotation,
              }}
              animate={{
                scale: [1, 1.05, 1], // Subtle breathing effect
                opacity: icon.opacity,
                rotate: [
                  icon.rotation,
                  icon.rotation + (index % 2 === 0 ? 15 : -15),
                  icon.rotation,
                ], // Gentle rotation
                y: [0, -15, 0], // Float up and down
              }}
              transition={{
                scale: {
                  duration: floatDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: floatDelay,
                },
                rotate: {
                  duration: floatDuration * 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: floatDelay,
                },
                y: {
                  duration: floatDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: floatDelay,
                },
                opacity: {
                  duration: 0.8,
                  delay: floatDelay * 0.5,
                },
              }}
            >
              <img
                src={icon.path}
                alt={icon.name}
                className="parallax-background__image"
                loading="lazy"
                style={{
                  width: `${icon.size}px`,
                  height: `${icon.size}px`,
                }}
              />
            </motion.div>
          );
        })}

      {/* Gradient Overlays */}
      <div className="parallax-background__gradient parallax-background__gradient--top" />
      <div className="parallax-background__gradient parallax-background__gradient--bottom" />
    </div>
  );
};

export default ParallaxBackground;
