import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Particles from "../components/Particles";
import HeroMascot, { type HeroPose } from "../components/ui/HeroMascot";
import { LogoLoop } from "../components/ui";
import { trackCTAClick } from "../utils/analytics";
import "./HeroSection.css";

const HeroSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [reduceMotion, setReduceMotion] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(1280);
  const [activeSection, setActiveSection] = useState<
    | "hero"
    | "stats"
    | "services"
    | "how-it-works"
    | "comparison"
    | "portfolio"
    | "contact"
  >("hero");
  const [ctaActive, setCtaActive] = useState(false);
  const ratiosRef = useRef<Record<string, number>>({});

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event: MediaQueryListEvent) => {
      setReduceMotion(event.matches);
    };

    setReduceMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateViewport = () => setViewportWidth(window.innerWidth);
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sectionIds = [
      "stats",
      "portfolio",
      "services",
      "how-it-works",
      "comparison",
      "contact",
    ];

    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (sectionElements.length === 0) return;

    const priority: Record<string, number> = {
      stats: 1,
      portfolio: 2,
      services: 3,
      "how-it-works": 4,
      comparison: 5,
      contact: 6,
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (!target.id) return;

          ratiosRef.current[target.id] = entry.isIntersecting
            ? entry.intersectionRatio
            : 0;
        });

        const activeEntries = Object.entries(ratiosRef.current).filter(
          ([, ratio]) => ratio > 0.42,
        );

        if (activeEntries.length === 0) {
          setActiveSection("hero");
          return;
        }

        activeEntries.sort((a, b) => {
          if (b[1] !== a[1]) return b[1] - a[1];
          return (priority[a[0]] ?? 0) - (priority[b[0]] ?? 0);
        });

        const leading = activeEntries[0][0];
        if (
          leading === "stats" ||
          leading === "services" ||
          leading === "how-it-works" ||
          leading === "comparison" ||
          leading === "portfolio" ||
          leading === "contact"
        ) {
          setActiveSection(leading);
        }
      },
      {
        threshold: [0.4, 0.6, 0.8],
      },
    );

    sectionElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const currentPose = useMemo<HeroPose>(() => {
    if (ctaActive) return "invite-point-forward";
    if (activeSection === "stats") return "speed-performance";
    if (activeSection === "services") return "crafting-gesture";
    if (activeSection === "how-it-works") return "problem-solving-think-pose";
    if (activeSection === "comparison") return "open-arms-trust-pose";
    if (activeSection === "portfolio") return "success-pose";
    if (activeSection === "contact") return "success-pose";
    return "neutral-stance";
  }, [activeSection, ctaActive]);

  const mascotProminence = useMemo<"high" | "medium" | "low">(() => {
    if (activeSection === "stats" || activeSection === "services")
      return "high";
    if (activeSection === "comparison" || activeSection === "how-it-works") {
      return "medium";
    }
    return "low";
  }, [activeSection]);

  const particleCount = useMemo(() => {
    if (reduceMotion) return 120;
    if (viewportWidth < 640) return 180;
    if (viewportWidth < 1024) return 280;
    return 420;
  }, [reduceMotion, viewportWidth]);

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

  const handlePrimaryClick = () => {
    const lang = (i18n.resolvedLanguage || i18n.language || "en").slice(0, 2);
    const contactPath = lang === "en" ? "/contact" : `/${lang}/contact`;

    trackCTAClick("Let's Talk", "Hero Section");
    navigate(contactPath);
  };

  return (
    <section id="home" className="hero-section" aria-label="Hero section">
      <div className="hero-section__particles-layer" aria-hidden="true">
        <div className="hero-section__particles-shell">
          <Particles
            particleCount={particleCount}
            particleSpread={25}
            speed={reduceMotion ? 0.025 : 0.05}
            particleColors={["#f35422", "#DBEAFE", "#f35422"]}
            moveParticlesOnHover={!reduceMotion}
            particleHoverFactor={1}
            alphaParticles={false}
            particleBaseSize={reduceMotion ? 85 : 96}
            sizeRandomness={0.5}
            cameraDistance={20}
            disableRotation={reduceMotion}
            className="hero-section__particles"
          />
        </div>
      </div>

      <div className="hero-section__content">
        <div className="hero-section__text-column">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="hero-section__headline-block"
          >
            <h1 className="hero-section__title">
              <span className="hero-section__title-lead">
                {t("hero.titleLead", { defaultValue: t("hero.title") })}
              </span>{" "}
              <span className="hero-section__title-strong">
                {t("hero.titleStrong", { defaultValue: "" })}
              </span>
            </h1>
          </motion.div>

          <motion.div
            className="hero-section__cta hero-section__cta--desktop"
            initial="hidden"
            animate="visible"
            custom={0.24}
            variants={fadeIn}
          >
            <button
              onClick={handlePrimaryClick}
              onMouseEnter={() => setCtaActive(true)}
              onMouseLeave={() => setCtaActive(false)}
              onFocus={() => setCtaActive(true)}
              onBlur={() => setCtaActive(false)}
              className="hero-cta-button hero-cta-button--primary"
              aria-label={t("hero.ctaPrimary")}
            >
              <span>{t("hero.ctaPrimary")}</span>
            </button>
          </motion.div>
        </div>

        <div className="hero-section__mascot-column">
          <HeroMascot
            pose={currentPose}
            reduceMotion={reduceMotion}
            prominence={mascotProminence}
            preloadPoses={[
              "invite-point-forward",
              "success-pose",
              "speed-performance",
            ]}
          />

          <motion.div
            className="hero-section__cta hero-section__cta--mobile"
            initial="hidden"
            animate="visible"
            custom={0.32}
            variants={fadeIn}
          >
            <button
              onClick={handlePrimaryClick}
              onMouseEnter={() => setCtaActive(true)}
              onMouseLeave={() => setCtaActive(false)}
              onFocus={() => setCtaActive(true)}
              onBlur={() => setCtaActive(false)}
              className="hero-cta-button hero-cta-button--primary"
              aria-label={t("hero.ctaPrimary")}
            >
              <span>{t("hero.ctaPrimary")}</span>
            </button>
          </motion.div>
        </div>
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
