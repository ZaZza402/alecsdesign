import React from "react";
import { motion } from "framer-motion";
import "./MenuTrigger.css";

interface MenuTriggerProps {
  isOpen: boolean;
  onClick: () => void;
}

const MenuTrigger: React.FC<MenuTriggerProps> = ({ isOpen, onClick }) => {
  return (
    <button
      className="menu-trigger"
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      <div className="menu-trigger__box">
        <motion.span
          className="menu-trigger__line menu-trigger__line--top"
          animate={isOpen ? "open" : "closed"}
          variants={{
            closed: { rotate: 0, y: 0 },
            open: { rotate: 45, y: 8 },
          }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
        <motion.span
          className="menu-trigger__line menu-trigger__line--middle"
          animate={isOpen ? "open" : "closed"}
          variants={{
            closed: { opacity: 1, x: 0 },
            open: { opacity: 0, x: -20 },
          }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
        <motion.span
          className="menu-trigger__line menu-trigger__line--bottom"
          animate={isOpen ? "open" : "closed"}
          variants={{
            closed: { rotate: 0, y: 0 },
            open: { rotate: -45, y: -8 },
          }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </button>
  );
};

export default MenuTrigger;
