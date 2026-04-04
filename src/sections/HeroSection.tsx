import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import LogoLoop from "../components/ui/LogoLoop";
import { BackgroundPaths } from "../components/ui/background-paths";
import { trackCTAClick } from "../utils/analytics";
import "./HeroSection.css";

const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: (delay: number) => ({
      opacity: 1,
      transition: { duration: 0.5, delay },
    }),
  };

  const handleWhatsAppClick = () => {
    trackCTAClick("WhatsApp", "Hero Section");
    window.open("https://wa.me/393801503074", "_blank", "noopener,noreferrer");
  };

  const handleSeeWorkClick = () => {
    trackCTAClick("See My Work", "Hero Section");
    const portfolioSection = document.getElementById("portfolio");
    portfolioSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="hero-section" aria-label="Hero section">
      <BackgroundPaths />
      <div className="hero-section__content">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="hero-section__headline-block"
        >
          <h1 className="hero-section__title">
            {t("hero.title")}{" "}
            <span className="hero-section__accent">
              {t("hero.titleAccent")}
            </span>
          </h1>
        </motion.div>

        <motion.p
          className="hero-section__subline"
          initial="hidden"
          animate="visible"
          custom={0.2}
          variants={fadeIn}
        >
          {t("hero.subline")}
        </motion.p>

        <motion.ul
          className="hero-section__perks"
          initial="hidden"
          animate="visible"
          custom={0.35}
          variants={fadeIn}
        >
          {[t("hero.stat1"), t("hero.stat2"), t("hero.stat3")].map(
            (stat, i) => (
              <li key={i} className="hero-section__perk">
                <Check
                  size={15}
                  className="hero-section__perk-icon"
                  aria-hidden="true"
                />
                <span>{stat}</span>
              </li>
            ),
          )}
        </motion.ul>

        <motion.div
          className="hero-section__cta"
          initial="hidden"
          animate="visible"
          custom={0.5}
          variants={fadeIn}
        >
          <button
            onClick={handleWhatsAppClick}
            className="hero-cta-button hero-cta-button--primary"
            aria-label="Message Alex on WhatsApp"
          >
            <span>{t("hero.ctaPrimary")}</span>
          </button>

          <button
            onClick={handleSeeWorkClick}
            className="hero-cta-button hero-cta-button--secondary"
          >
            <span>{t("hero.ctaSecondary")}</span>
          </button>
        </motion.div>
      </div>
      <div className="hero-section__logoloop">
        <LogoLoop
          logos={[
            { src: "/Stack Icons/React.svg", alt: "React" },
            { src: "/Stack Icons/TypeScript.svg", alt: "TypeScript" },
            { src: "/Stack Icons/Next.js.svg", alt: "Next.js" },
            { src: "/Stack Icons/JavaScript.svg", alt: "JavaScript" },
            { src: "/Stack Icons/Tailwind CSS.svg", alt: "Tailwind CSS" },
            { src: "/Stack Icons/HTML5.svg", alt: "HTML5" },
            { src: "/Stack Icons/GitHub Actions.svg", alt: "GitHub Actions" },
            { src: "/Stack Icons/Webpack.svg", alt: "Webpack" },
            { src: "/Stack Icons/Powershell.svg", alt: "PowerShell" },
          ]}
          speed={80}
          direction="left"
          logoHeight={36}
          gap={48}
          hoverSpeed={20}
          scaleOnHover
          fadeOut
          fadeOutColor="#ffffff"
          ariaLabel="Technologies I work with"
        />
      </div>
    </section>
  );
};

export default HeroSection;
