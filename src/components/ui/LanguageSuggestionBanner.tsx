import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import { detectUserLanguage } from "../../utils/languageDetection";
import "./LanguageSuggestionBanner.css";

const LanguageSuggestionBanner = () => {
  const { i18n } = useTranslation();
  const [suggestedLang, setSuggestedLang] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const languageNames = {
    it: { native: "Italiano", prompt: "Vedi in Italiano?" },
    ro: { native: "Română", prompt: "Vezi în Română?" },
    en: { native: "English", prompt: "View in English?" },
  };

  useEffect(() => {
    // Check if user already dismissed the banner in this session
    const dismissed = sessionStorage.getItem("language-banner-dismissed");
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Detect user's preferred language
    detectUserLanguage().then((detectedLang) => {
      const currentLang = i18n.language;

      // Only show banner if detected language differs from current
      if (detectedLang !== currentLang && !dismissed) {
        setSuggestedLang(detectedLang);
        // Delay showing banner slightly for better UX
        setTimeout(() => setIsVisible(true), 1500);
      }
    });
  }, [i18n.language]);

  const handleSwitch = () => {
    if (suggestedLang) {
      // Update URL to new language
      window.location.href = `/${suggestedLang}`;
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem("language-banner-dismissed", "true");
  };

  if (!isVisible || !suggestedLang || isDismissed) {
    return null;
  }

  const langInfo = languageNames[suggestedLang as keyof typeof languageNames];

  return (
    <div className={`language-banner ${isVisible ? "slide-in" : ""}`}>
      <div className="language-banner-content">
        <p className="language-banner-text">{langInfo.prompt}</p>
        <div className="language-banner-actions">
          <button onClick={handleSwitch} className="language-banner-switch">
            {langInfo.native}
          </button>
          <button
            onClick={handleDismiss}
            className="language-banner-dismiss"
            aria-label="Dismiss"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSuggestionBanner;
