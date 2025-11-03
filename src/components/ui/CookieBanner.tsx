import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Cookie, X } from "lucide-react";
import "./CookieBanner.css";

const CookieBanner = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      // Show banner after a brief delay
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("cookieConsent", "all");
    setIsVisible(false);
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem("cookieConsent", "necessary");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setIsVisible(false);
  };

  const handleLearnMore = () => {
    navigate(`/${i18n.language}/cookie-policy`);
  };

  if (!isVisible) return null;

  return (
    <div className={`cookie-banner ${isVisible ? "show" : ""}`}>
      <div className="cookie-content">
        <div className="cookie-icon">
          <Cookie size={32} />
        </div>
        <div className="cookie-text">
          <h3>{t("cookies.banner.title")}</h3>
          <p>{t("cookies.banner.description")}</p>
        </div>
      </div>
      <div className="cookie-actions">
        <button
          onClick={handleLearnMore}
          className="cookie-btn cookie-btn-link"
        >
          {t("cookies.banner.learnMore")}
        </button>
        <button
          onClick={handleAcceptNecessary}
          className="cookie-btn cookie-btn-secondary"
        >
          {t("cookies.banner.acceptNecessary")}
        </button>
        <button
          onClick={handleAcceptAll}
          className="cookie-btn cookie-btn-primary"
        >
          {t("cookies.banner.accept")}
        </button>
      </div>
      <button
        onClick={handleDecline}
        className="cookie-close"
        aria-label="Close"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default CookieBanner;
