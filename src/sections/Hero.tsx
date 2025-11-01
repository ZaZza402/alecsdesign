import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import ParallaxBackground from "../components/ui/backgrounds/ParallaxBackground";
import IconScrollBar from "../components/ui/IconScrollBar";
import "./Hero.css";

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // Rotating words for dynamic effect
  const rotatingWords = [
    t("hero.word1"),
    t("hero.word2"),
    t("hero.word3"),
    t("hero.word4"),
  ];

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

  return (
    <section id="home" className="hero-section" aria-label="Hero section">
      {/* Parallax Background */}
      <ParallaxBackground /> {/* Hero Content */}
      <div className="hero-section__content">
        <motion.div initial="hidden" animate="visible" variants={titleVariants}>
          <h1 className="hero-section__title">
            {t("hero.greeting")} {t("hero.name")}
          </h1>
        </motion.div>

        <motion.p
          className="hero-section__subtitle"
          initial="hidden"
          animate="visible"
          variants={subtitleVariants}
          style={{ marginBottom: "0.5rem" }}
        >
          {t("hero.title")}
        </motion.p>

        <div
          className="hero-section__highlight-container"
          aria-live="polite"
          style={{
            minHeight: "3.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={currentWordIndex}
              className="hero-section__highlight"
              variants={wordVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{
                fontSize: "2rem",
                fontWeight: "700",
              }}
            >
              {rotatingWords[currentWordIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        <motion.p
          className="hero-section__subtitle"
          initial="hidden"
          animate="visible"
          variants={descriptionVariants}
          style={{ fontSize: "1.125rem", marginTop: "1rem" }}
        >
          {t("hero.description")}
        </motion.p>
      </div>
      {/* Interactive Icon Scroll Bar Divider */}
      <IconScrollBar />
    </section>
  );
};

export default Hero;
