import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import MenuTrigger from "../ui/buttons/MenuTrigger";
import MobileMenu from "./MobileMenu";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import "./Header.css";

interface NavLink {
  name: string;
  href: string;
}

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks: NavLink[] = [
    { name: t("nav.home"), href: "#home" },
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.services"), href: "#services" },
    { name: t("nav.projects"), href: "#projects" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open (but allow menu itself to scroll)
  useEffect(() => {
    if (isOpen) {
      // Get scrollbar width to prevent layout shift
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      // Lock body scroll but allow menu to scroll
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      // Ensure mobile menu can still scroll
      const mobileMenu = document.querySelector(".mobile-menu");
      if (mobileMenu) {
        (mobileMenu as HTMLElement).style.overflow = "auto";
      }
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsOpen(false);

    // Only try to scroll if we have a valid selector
    if (href && href.trim()) {
      try {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } catch {
        console.warn(`Invalid selector: ${href}`);
      }
    }
  };

  return (
    <header className={`header ${isScrolled ? "header--scrolled" : ""}`}>
      <div className="header__container">
        {/* Logo */}
        <motion.a
          href="#home"
          className="header__logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={(e) => handleNavClick(e, "#home")}
        >
          <div className="header__logo-wrapper">
            <img
              src="/logo/apple-touch-icon.png"
              alt="alecsdesign"
              className="header__logo-image"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="header__nav">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="header__nav-link"
              onClick={(e) => handleNavClick(e, link.href)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {link.name}
            </motion.a>
          ))}

          {/* Language Switcher - Desktop Only */}
          <LanguageSwitcher />
        </nav>

        {/* Mobile Menu Toggle */}
        <MenuTrigger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isOpen}
        navLinks={navLinks}
        onNavClick={handleNavClick}
        onClose={() => setIsOpen(false)}
      />
    </header>
  );
};

export default Header;
