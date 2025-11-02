import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translations
import itTranslation from "./locales/it/translation.json";
import enTranslation from "./locales/en/translation.json";
import roTranslation from "./locales/ro/translation.json";

// Detect language from URL path (e.g., /en, /it, /ro)
const getLanguageFromPath = () => {
  const path = window.location.pathname;
  const langMatch = path.match(/^\/(en|it|ro)/);
  return langMatch ? langMatch[1] : "en"; // Default to English
};

const initialLanguage = getLanguageFromPath();

i18n
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    resources: {
      it: {
        translation: itTranslation,
      },
      en: {
        translation: enTranslation,
      },
      ro: {
        translation: roTranslation,
      },
    },
    lng: initialLanguage, // Language from URL path
    fallbackLng: "en", // Fallback to English if translation missing
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false, // Disable suspense for easier setup
    },
  });

// Update HTML lang attribute when language changes
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng; // Update HTML lang attribute for accessibility
});

export default i18n;
