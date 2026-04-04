import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Detect language from URL path (e.g., /en, /it, /ro)
const getLanguageFromPath = () => {
  const path = window.location.pathname;
  const langMatch = path.match(/^\/(en|it|ro)/);
  return langMatch ? langMatch[1] : "en";
};

const initialLanguage = getLanguageFromPath();

// Dynamically load only the current language — keeps the main bundle ~150 kB lighter
const loadLanguage = (
  lang: string,
): Promise<{ default: Record<string, unknown> }> => {
  switch (lang) {
    case "it":
      return import("./locales/it/index");
    case "ro":
      return import("./locales/ro/index");
    default:
      return import("./locales/en/index");
  }
};

// Exported so main.tsx can await before first render
export const i18nReady = loadLanguage(initialLanguage).then((module) => {
  return i18n.use(initReactI18next).init({
    resources: {
      [initialLanguage]: {
        translation: module.default,
      },
    },
    lng: initialLanguage,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
  });
});

// Sync handler — just keeps the <html lang> attribute in sync
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
});

/**
 * Pre-loads a language bundle THEN switches — avoids the race condition
 * where i18n.changeLanguage() fires before translations are available.
 * Use this everywhere instead of i18n.changeLanguage() directly.
 */
export async function switchLanguage(lng: string): Promise<void> {
  if (!i18n.hasResourceBundle(lng, "translation")) {
    const module = await loadLanguage(lng);
    i18n.addResourceBundle(lng, "translation", module.default, true, true);
  }
  await i18n.changeLanguage(lng);
}

export default i18n;
