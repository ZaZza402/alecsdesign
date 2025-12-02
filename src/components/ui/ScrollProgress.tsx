import { useState, useEffect, useRef } from "react";
import { ArrowUp, MessageCircle, MessageSquare, Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./ScrollProgress.css";

const ScrollProgress = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showCTA, setShowCTA] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

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

  // Close options when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    if (showOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const scrollToContact = () => {
    setShowOptions(false);
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/${i18n.language}/contact`);
    }
  };

  const openWhatsApp = () => {
    setShowOptions(false);
    // Matches footer format: +39 380 150 3074
    const whatsappUrl = `https://wa.me/393801503074`;
    window.open(whatsappUrl, "_blank");
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

      {/* Floating CTA with Dropdown */}
      {showCTA && (
        <div ref={optionsRef} className="floating-cta-wrapper">
          <button
            className="floating-cta"
            onClick={toggleOptions}
            aria-label={t("floatingContact.main.ariaLabel")}
            aria-expanded={showOptions}
          >
            <MessageCircle size={20} strokeWidth={2.5} />
            <span className="floating-cta-text">
              {t("floatingContact.main.label")}
            </span>
          </button>

          {/* Dropdown Options */}
          {showOptions && (
            <motion.div
              className="floating-options-menu"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <button
                className="floating-option"
                onClick={openWhatsApp}
                aria-label={t("floatingContact.options.whatsapp.label")}
              >
                <MessageSquare size={18} strokeWidth={2.5} />
                <div className="floating-option-content">
                  <span className="floating-option-label">
                    {t("floatingContact.options.whatsapp.label")}
                  </span>
                  <span className="floating-option-desc">
                    {t("floatingContact.options.whatsapp.description")}
                  </span>
                </div>
              </button>

              <button
                className="floating-option"
                onClick={scrollToContact}
                aria-label={t("floatingContact.options.form.label")}
              >
                <Send size={18} strokeWidth={2.5} />
                <div className="floating-option-content">
                  <span className="floating-option-label">
                    {t("floatingContact.options.form.label")}
                  </span>
                  <span className="floating-option-desc">
                    {t("floatingContact.options.form.description")}
                  </span>
                </div>
              </button>
            </motion.div>
          )}
        </div>
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
