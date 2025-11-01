import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translations
import itTranslation from "./locales/it/translation.json";
import enTranslation from "./locales/en/translation.json";
import roTranslation from "./locales/ro/translation.json";

// Get saved language from localStorage or default to Italian
const savedLanguage = localStorage.getItem("language") || "it";

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
    lng: savedLanguage, // Default language (Italian)
    fallbackLng: "it", // Fallback to Italian if translation missing
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false, // Disable suspense for easier setup
    },
  });

// Save language preference when it changes
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("language", lng);
  document.documentElement.lang = lng; // Update HTML lang attribute for accessibility
});

export default i18n;
