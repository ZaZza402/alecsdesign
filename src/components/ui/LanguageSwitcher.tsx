import React from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import "./LanguageSwitcher.css";

const languages = [
  { code: "it", label: "IT", fullName: "Italiano" },
  { code: "en", label: "EN", fullName: "English" },
  { code: "ro", label: "RO", fullName: "Română" },
];

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="language-switcher">
      <button
        className="language-switcher__trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change language"
      >
        <span className="language-switcher__current">
          {currentLanguage.label}
        </span>
        <motion.svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path
            d="M2 4L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="language-switcher__backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="language-switcher__dropdown"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`language-switcher__option ${
                    lang.code === i18n.language
                      ? "language-switcher__option--active"
                      : ""
                  }`}
                  onClick={() => handleLanguageChange(lang.code)}
                >
                  <span className="language-switcher__option-code">
                    {lang.label}
                  </span>
                  <span className="language-switcher__option-name">
                    {lang.fullName}
                  </span>
                  {lang.code === i18n.language && (
                    <motion.span
                      className="language-switcher__check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    >
                      ✓
                    </motion.span>
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
