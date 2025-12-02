/**
 * Language Detection Utility
 * Detects user's preferred language based on:
 * 1. Saved preference in localStorage
 * 2. Browser language settings
 * 3. Geographic location (country-based)
 */

export type SupportedLanguage = "en" | "it" | "ro";

const SUPPORTED_LANGUAGES: SupportedLanguage[] = ["en", "it", "ro"];
const DEFAULT_LANGUAGE: SupportedLanguage = "en";
const LANGUAGE_STORAGE_KEY = "preferred-language";

/**
 * Maps country codes to language preferences
 */
const COUNTRY_TO_LANGUAGE: Record<string, SupportedLanguage> = {
  IT: "it", // Italy
  RO: "ro", // Romania
  // All other countries default to English
};

/**
 * Maps browser language codes to our supported languages
 */
const BROWSER_LANG_MAP: Record<string, SupportedLanguage> = {
  en: "en",
  "en-US": "en",
  "en-GB": "en",
  it: "it",
  "it-IT": "it",
  ro: "ro",
  "ro-RO": "ro",
};

/**
 * Get language from localStorage if previously saved
 */
function getSavedLanguage(): SupportedLanguage | null {
  try {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved && SUPPORTED_LANGUAGES.includes(saved as SupportedLanguage)) {
      return saved as SupportedLanguage;
    }
  } catch (error) {
    console.warn("Could not access localStorage:", error);
  }
  return null;
}

/**
 * Save language preference to localStorage
 */
export function saveLanguagePreference(lang: SupportedLanguage): void {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  } catch (error) {
    console.warn("Could not save language preference:", error);
  }
}

/**
 * Get language from browser settings
 */
function getBrowserLanguage(): SupportedLanguage | null {
  try {
    const nav = navigator as Navigator & { userLanguage?: string };
    const browserLang = navigator.language || nav.userLanguage || "";
    
    // Check exact match first
    if (BROWSER_LANG_MAP[browserLang]) {
      return BROWSER_LANG_MAP[browserLang];
    }

    // Check for language code prefix (e.g. "en-AU" -> "en")
    const langPrefix = browserLang.split('-')[0];
    if (SUPPORTED_LANGUAGES.includes(langPrefix as SupportedLanguage)) {
      return langPrefix as SupportedLanguage;
    }
    
    return null;
  } catch (error) {
    console.warn("Could not detect browser language:", error);
    return null;
  }
}

/**
 * Detect country based on timezone and approximate location
 * This is a fallback method when geo API is not available
 */
function getCountryFromTimezone(): SupportedLanguage | null {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Map common timezones to countries
    if (timezone.includes("Rome") || timezone.includes("Milan")) {
      return "it";
    }
    if (timezone.includes("Bucharest")) {
      return "ro";
    }
  } catch (error) {
    console.warn("Could not detect timezone:", error);
  }
  return null;
}

/**
 * Fetch user's country using a free geo-location API
 * Falls back to timezone detection if API fails
 */
async function getCountryFromGeoAPI(): Promise<SupportedLanguage | null> {
  try {
    // Using ipapi.co free API (no auth required, 1000 requests/day)
    const response = await fetch("https://ipapi.co/json/", {
      signal: AbortSignal.timeout(3000), // 3 second timeout
    });

    if (!response.ok) {
      throw new Error("Geo API request failed");
    }

    const data = await response.json();
    const countryCode = data.country_code as string;

    return COUNTRY_TO_LANGUAGE[countryCode] || null;
  } catch (error) {
    console.warn("Geo API failed, falling back to timezone detection:", error);
    return getCountryFromTimezone();
  }
}

/**
 * Main function to detect user's preferred language
 * Priority: saved preference > browser language > geo-location > default
 */
export async function detectUserLanguage(): Promise<SupportedLanguage> {
  // 1. Check for saved preference (highest priority)
  const saved = getSavedLanguage();
  if (saved) {
    return saved;
  }

  // 2. Check browser language settings
  const browserLang = getBrowserLanguage();
  if (browserLang) {
    // Don't auto-save, let user confirm via banner
    return browserLang;
  }

  // 3. Try to detect from geographic location
  const geoLang = await getCountryFromGeoAPI();
  if (geoLang) {
    // Don't auto-save, let user confirm via banner
    return geoLang;
  }

  // 4. Fall back to default language
  return DEFAULT_LANGUAGE;
}

/**
 * Check if a string is a valid supported language
 */
export function isValidLanguage(lang: string): lang is SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
}
