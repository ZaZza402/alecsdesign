import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MessageCircle, Mail, Hand } from "lucide-react";
import IconScrollBar from "../components/ui/IconScrollBar";
import "./Hero.css";

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // Shorter rotating words for single line display
  const rotatingWords = [t("hero.word1"), t("hero.word2"), t("hero.word3")];

  // Rotate words every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  // Simplified animation variants for better performance
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
    },
  };

  const descriptionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.3,
      },
    },
  };

  const wordVariants = {
    enter: {
      y: 15,
      opacity: 0,
    },
    center: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
    exit: {
      y: -15,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/380150307", "_blank");
  };

  const handleContactClick = () => {
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="hero-section" aria-label="Hero section">
      {/* Hero Content */}
      <div className="hero-section__content">
        <motion.div initial="hidden" animate="visible" variants={titleVariants}>
          <h1 className="hero-section__title">
            <span className="hero-section__greeting">
              <Hand
                className="hero-section__hand-wave"
                size={48}
                strokeWidth={2.5}
              />
              <span className="hero-section__greeting-text">
                {t("hero.greeting")}
              </span>
            </span>
            <span className="hero-section__name">{t("hero.name")}</span>
          </h1>
        </motion.div>

        <motion.p
          className="hero-section__subtitle-label"
          initial="hidden"
          animate="visible"
          variants={subtitleVariants}
        >
          {t("hero.title")}
        </motion.p>

        <div className="hero-section__highlight-container" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.span
              key={currentWordIndex}
              className="hero-section__highlight"
              variants={wordVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {rotatingWords[currentWordIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        <motion.p
          className="hero-section__description"
          initial="hidden"
          animate="visible"
          variants={descriptionVariants}
        >
          {t("hero.description")}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="hero-section__cta"
          initial="hidden"
          animate="visible"
          variants={descriptionVariants}
        >
          <button
            onClick={handleWhatsAppClick}
            className="hero-cta-button hero-cta-button--primary"
          >
            <MessageCircle size={20} />
            <span>{t("hero.ctaWhatsApp")}</span>
          </button>

          <button
            onClick={handleContactClick}
            className="hero-cta-button hero-cta-button--secondary"
          >
            <Mail size={20} />
            <span>{t("hero.ctaEmail")}</span>
          </button>
        </motion.div>
      </div>
      {/* Interactive Icon Scroll Bar Divider */}
      <IconScrollBar />
    </section>
  );
};

export default Hero;
