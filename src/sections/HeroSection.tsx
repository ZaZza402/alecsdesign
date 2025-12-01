import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Hand } from "lucide-react";
import IconScrollBar from "../components/ui/IconScrollBar";
import { trackCTAClick, trackWhatsAppClick } from "../utils/analytics";
import "./HeroSection.css";

const HeroSection: React.FC = () => {
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

  const handleHowItWorksClick = () => {
    trackCTAClick("How It Works", "Hero Section");
    const howItWorksSection = document.getElementById("how-it-works");
    howItWorksSection?.scrollIntoView({ behavior: "smooth" });
  };

  const handleWhatsAppClick = () => {
    trackWhatsAppClick("Hero Section");
    trackCTAClick("WhatsApp Contact", "Hero Section");
    window.open("https://wa.me/3801503074", "_blank");
  };

  return (
    <section id="home" className="hero-section" aria-label="Hero section">
      {/* Hero Content */}
      <div className="hero-section__content">
        {/* Left Column - Main Content */}
        <div className="hero-section__left">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={titleVariants}
          >
            <h1 className="hero-section__title">
              <span className="hero-section__greeting">
                <span className="hero-section__greeting-text">
                  {t("hero.greeting")}
                </span>
                <motion.span
                  className="hero-section__hand-wave"
                  animate={{
                    rotate: [0, 14, -8, 14, -4, 10, 0, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    display: "inline-block",
                    transformOrigin: "70% 70%",
                  }}
                >
                  <Hand size={28} strokeWidth={2.5} />
                </motion.span>
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

          <motion.p
            className="hero-section__subtitle"
            initial="hidden"
            animate="visible"
            variants={descriptionVariants}
          >
            {t("hero.subtitle")}
          </motion.p>
        </div>

        {/* Right Column - CTA Buttons on desktop */}
        <div className="hero-section__right">
          <motion.div
            className="hero-section__cta"
            initial="hidden"
            animate="visible"
            variants={descriptionVariants}
          >
            <button
              onClick={handleHowItWorksClick}
              className="hero-cta-button hero-cta-button--primary"
            >
              <span>{t("hero.ctaPrimary")}</span>
            </button>

            <button
              onClick={handleWhatsAppClick}
              className="hero-cta-button hero-cta-button--secondary"
            >
              <span>{t("hero.ctaSecondary")}</span>
            </button>
          </motion.div>
        </div>
      </div>
      {/* Interactive Icon Scroll Bar Divider */}
      <IconScrollBar />
    </section>
  );
};

export default HeroSection;
