import { useState, useEffect } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import "./ScrollProgress.css";

const ScrollProgress = () => {
  const { t } = useTranslation();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showCTA, setShowCTA] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      // Show CTA after scrolling past hero (roughly 100vh)
      setShowCTA(window.scrollY > window.innerHeight * 0.8);

      // Show scroll to top after scrolling 500px
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Progress bar */}
      <div className="scroll-progress-bar">
        <div
          className="scroll-progress-fill"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating CTA */}
      {showCTA && (
        <button
          className="floating-cta"
          onClick={scrollToContact}
          aria-label={t("nav.contact")}
        >
          <MessageCircle size={20} strokeWidth={2.5} />
          <span className="floating-cta-text">{t("hero.ctaEmail")}</span>
        </button>
      )}

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          className="scroll-to-top"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} strokeWidth={2.5} />
        </button>
      )}
    </>
  );
};

export default ScrollProgress;
