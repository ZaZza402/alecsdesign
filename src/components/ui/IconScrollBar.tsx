import React from "react";
import { motion } from "framer-motion";
import "./IconScrollBar.css";

const IconScrollBar: React.FC = () => {
  // Tech stack icons - same as parallax but for scrolling
  const techIcons = [
    { name: "React", path: "/Stack Icons/React.svg" },
    { name: "TypeScript", path: "/Stack Icons/TypeScript.svg" },
    { name: "Next.js", path: "/Stack Icons/Next.js.svg" },
    { name: "JavaScript", path: "/Stack Icons/JavaScript.svg" },
    { name: "Tailwind", path: "/Stack Icons/Tailwind CSS.svg" },
    { name: "HTML5", path: "/Stack Icons/HTML5.svg" },
    { name: "GitHub", path: "/Stack Icons/GitHub Actions.svg" },
    { name: "Webpack", path: "/Stack Icons/Webpack.svg" },
    { name: "PowerShell", path: "/Stack Icons/Powershell.svg" },
  ];

  // Duplicate the icons array for seamless infinite scroll
  const duplicatedIcons = [...techIcons, ...techIcons, ...techIcons];

  return (
    <div className="icon-scroll-bar">
      <div className="icon-scroll-bar__track">
        <motion.div
          className="icon-scroll-bar__content"
          animate={{
            x: [0, -33.33 + "%"], // Move by one third (one full set)
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
        >
          {duplicatedIcons.map((icon, index) => (
            <motion.div
              key={`${icon.name}-${index}`}
              className="icon-scroll-bar__item"
              whileHover={{
                scale: 1.3,
                rotate: [0, -10, 10, 0],
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.9 }}
            >
              <img
                src={icon.path}
                alt={icon.name}
                className="icon-scroll-bar__image"
                loading="lazy"
                decoding="async"
                width="40"
                height="40"
              />
              <span className="icon-scroll-bar__label">{icon.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default IconScrollBar;
