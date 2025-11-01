import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import "./MobileLanguageLabel.css";

const languages = [
  { code: "it", label: "IT" },
  { code: "en", label: "EN" },
  { code: "ro", label: "RO" },
];

const MobileLanguageLabel: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false); // Close after selection
  };

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  return (
    <div className="mobile-lang-label">
      {/* Globe Trigger Button */}
      <motion.button
        className="mobile-lang-label__trigger"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle language menu"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span className="mobile-lang-label__current">
          {currentLanguage.label}
        </span>
      </motion.button>

      {/* Language Options - Slide Down */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-lang-label__options"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {languages.map((lang, index) => (
              <motion.button
                key={lang.code}
                className={`mobile-lang-label__item ${
                  lang.code === i18n.language
                    ? "mobile-lang-label__item--active"
                    : ""
                }`}
                onClick={() => handleLanguageChange(lang.code)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Switch to ${lang.label}`}
              >
                {lang.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileLanguageLabel;
