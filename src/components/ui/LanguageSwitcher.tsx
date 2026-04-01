import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./LanguageSwitcher.css";
import { saveLanguagePreference } from "../../utils/languageDetection";

const languages = [
  { code: "it", label: "IT", fullName: "Italiano" },
  { code: "en", label: "EN", fullName: "English" },
  { code: "ro", label: "RO", fullName: "Română" },
];

// Cross-reference map so switching language on a guide page
// takes you to the correct slug in the target language.
const GUIDE_SLUG_MAP: Record<string, Record<string, string>> = {
  "how-much-does-a-website-cost": {
    en: "how-much-does-a-website-cost",
    it: "quanto-costa-un-sito-web",
    ro: "cat-costa-un-site-web",
  },
  "how-to-get-found-on-google": {
    en: "how-to-get-found-on-google",
    it: "come-farsi-trovare-su-google",
    ro: "cum-sa-apari-pe-google",
  },
  "what-your-website-needs": {
    en: "what-your-website-needs",
    it: "cosa-deve-avere-il-sito-web",
    ro: "ce-trebuie-sa-aiba-site-ul",
  },
  "quanto-costa-un-sito-web": {
    en: "how-much-does-a-website-cost",
    it: "quanto-costa-un-sito-web",
    ro: "cat-costa-un-site-web",
  },
  "come-farsi-trovare-su-google": {
    en: "how-to-get-found-on-google",
    it: "come-farsi-trovare-su-google",
    ro: "cum-sa-apari-pe-google",
  },
  "cosa-deve-avere-il-sito-web": {
    en: "what-your-website-needs",
    it: "cosa-deve-avere-il-sito-web",
    ro: "ce-trebuie-sa-aiba-site-ul",
  },
  "cat-costa-un-site-web": {
    en: "how-much-does-a-website-cost",
    it: "quanto-costa-un-sito-web",
    ro: "cat-costa-un-site-web",
  },
  "cum-sa-apari-pe-google": {
    en: "how-to-get-found-on-google",
    it: "come-farsi-trovare-su-google",
    ro: "cum-sa-apari-pe-google",
  },
  "ce-trebuie-sa-aiba-site-ul": {
    en: "what-your-website-needs",
    it: "cosa-deve-avere-il-sito-web",
    ro: "ce-trebuie-sa-aiba-site-ul",
  },
};

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (langCode: string) => {
    saveLanguagePreference(langCode as "en" | "it" | "ro");
    i18n.changeLanguage(langCode);

    const pathParts = location.pathname.split("/").filter(Boolean);
    if (pathParts.length > 0 && ["en", "it", "ro"].includes(pathParts[0])) {
      pathParts.shift();
    }

    // Guide-aware navigation — map slugs to the correct target language
    if (pathParts[0] === "guide") {
      const currentSlug = pathParts[1];
      if (currentSlug && GUIDE_SLUG_MAP[currentSlug]) {
        const targetSlug = GUIDE_SLUG_MAP[currentSlug][langCode];
        const targetPath =
          langCode === "en"
            ? `/guide/${targetSlug}`
            : `/${langCode}/guide/${targetSlug}`;
        navigate(targetPath, { replace: true, state: { langSwitch: true } });
      } else {
        // On the hub page
        const targetPath =
          langCode === "en" ? "/guide/" : `/${langCode}/guide/`;
        navigate(targetPath, { replace: true, state: { langSwitch: true } });
      }
      setIsOpen(false);
      return;
    }

    // Default: reconstruct path with new lang prefix
    // EN routes have no /en/ prefix (use root paths)
    const newPath =
      langCode === "en" && pathParts.length > 0
        ? `/${pathParts.join("/")}${location.hash}`
        : `/${langCode}${pathParts.length > 0 ? "/" + pathParts.join("/") : ""}${location.hash}`;
    navigate(newPath, { replace: true, state: { langSwitch: true } });

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
