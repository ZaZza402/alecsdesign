import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./MobileMenu.css";

interface NavLink {
  name: string;
  href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  navLinks: NavLink[];
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  navLinks,
  onNavClick,
  onClose,
}) => {
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const menuVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: {
        type: "spring" as const,
        damping: 30,
        stiffness: 300,
      },
    },
    exit: {
      x: "100%",
      transition: {
        type: "spring" as const,
        damping: 30,
        stiffness: 300,
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    }),
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Blur Backdrop */}
          <motion.div
            className="mobile-menu__backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
            onClick={(e) => {
              const target = e.target as HTMLElement;
              if (target.classList.contains("mobile-menu__backdrop")) {
                onClose();
              }
            }}
          />

          {/* Menu Panel */}
          <motion.nav
            className="mobile-menu"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="mobile-menu__content">
              {/* Close Button */}
              <motion.button
                className="mobile-menu__close"
                onClick={onClose}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close menu"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </motion.button>

              {/* Navigation Links */}
              <ul className="mobile-menu__list">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    className="mobile-menu__item"
                    custom={index}
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <a
                      href={link.href}
                      className="mobile-menu__link"
                      onClick={(e) => onNavClick(e, link.href)}
                    >
                      <span className="mobile-menu__link-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="mobile-menu__link-text">
                        {link.name}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              {/* Decorative Tech Elements */}
              <div className="mobile-menu__decoration">
                <motion.div
                  className="mobile-menu__deco-line mobile-menu__deco-line--1"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                />
                <motion.div
                  className="mobile-menu__deco-line mobile-menu__deco-line--2"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                />
              </div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default MobileMenu;
