import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import English translations - Sections
import enHero from "./locales/en/sections/hero.json";
import enProblem from "./locales/en/sections/problem.json";
import enDifference from "./locales/en/sections/difference.json";
import enHowItWorks from "./locales/en/sections/howItWorks.json";
import enPortfolio from "./locales/en/sections/portfolio.json";
import enPricing from "./locales/en/sections/pricing.json";
import enContact from "./locales/en/sections/contact.json";

// Import English translations - Pages
import enServicesRates from "./locales/en/pages/servicesRates.json";
import enNotFound from "./locales/en/pages/notFound.json";
import enLegal from "./locales/en/pages/legal.json";
import enPortfolioPage from "./locales/en/pages/portfolioPage.json";
import enAbout from "./locales/en/pages/about.json";
import enFaq from "./locales/en/pages/faq.json";

// Import English translations - Components
import enNav from "./locales/en/components/nav.json";
import enFooter from "./locales/en/components/footer.json";
import enCookies from "./locales/en/components/cookies.json";
import enCommon from "./locales/en/components/common.json";
import enSeo from "./locales/en/components/seo.json";

// Import Italian translations - Sections
import itHero from "./locales/it/sections/hero.json";
import itProblem from "./locales/it/sections/problem.json";
import itDifference from "./locales/it/sections/difference.json";
import itHowItWorks from "./locales/it/sections/howItWorks.json";
import itPortfolio from "./locales/it/sections/portfolio.json";
import itPricing from "./locales/it/sections/pricing.json";
import itContact from "./locales/it/sections/contact.json";

// Import Italian translations - Pages
import itServicesRates from "./locales/it/pages/servicesRates.json";
import itNotFound from "./locales/it/pages/notFound.json";
import itLegal from "./locales/it/pages/legal.json";
import itPortfolioPage from "./locales/it/pages/portfolioPage.json";
import itAbout from "./locales/it/pages/about.json";
import itFaq from "./locales/it/pages/faq.json";

// Import Italian translations - Components
import itNav from "./locales/it/components/nav.json";
import itFooter from "./locales/it/components/footer.json";
import itCookies from "./locales/it/components/cookies.json";
import itCommon from "./locales/it/components/common.json";
import itSeo from "./locales/it/components/seo.json";

// Import Romanian translations - Sections
import roHero from "./locales/ro/sections/hero.json";
import roProblem from "./locales/ro/sections/problem.json";
import roDifference from "./locales/ro/sections/difference.json";
import roHowItWorks from "./locales/ro/sections/howItWorks.json";
import roPortfolio from "./locales/ro/sections/portfolio.json";
import roPricing from "./locales/ro/sections/pricing.json";
import roContact from "./locales/ro/sections/contact.json";

// Import Romanian translations - Pages
import roServicesRates from "./locales/ro/pages/servicesRates.json";
import roNotFound from "./locales/ro/pages/notFound.json";
import roLegal from "./locales/ro/pages/legal.json";
import roPortfolioPage from "./locales/ro/pages/portfolioPage.json";
import roAbout from "./locales/ro/pages/about.json";
import roFaq from "./locales/ro/pages/faq.json";

// Import Romanian translations - Components
import roNav from "./locales/ro/components/nav.json";
import roFooter from "./locales/ro/components/footer.json";
import roCookies from "./locales/ro/components/cookies.json";
import roCommon from "./locales/ro/components/common.json";
import roSeo from "./locales/ro/components/seo.json";

// Import quiz translations
import itQuiz from "./locales/it/quiz.json";
import enQuiz from "./locales/en/quiz.json";
import roQuiz from "./locales/ro/quiz.json";

// Import calculator translations
import itCalculator from "./locales/it/calculator.json";
import enCalculator from "./locales/en/calculator.json";
import roCalculator from "./locales/ro/calculator.json";

// Import floating contact translations
import itFloatingContact from "./locales/it/floatingContact.json";
import enFloatingContact from "./locales/en/floatingContact.json";
import roFloatingContact from "./locales/ro/floatingContact.json";

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
      en: {
        translation: {
          // Sections
          hero: enHero,
          problem: enProblem,
          difference: enDifference,
          howItWorks: enHowItWorks,
          portfolio: enPortfolio,
          pricing: enPricing,
          contact: enContact,
          // Pages
          servicesRates: enServicesRates,
          notFound: enNotFound,
          legal: enLegal,
          portfolioPage: enPortfolioPage,
          about: enAbout,
          faq: enFaq,
          // Components
          nav: enNav,
          footer: enFooter,
          cookies: enCookies,
          common: enCommon,
          seo: enSeo,
          // Other
          ...enQuiz,
          ...enCalculator,
          ...enFloatingContact,
        },
      },
      it: {
        translation: {
          // Sections
          hero: itHero,
          problem: itProblem,
          difference: itDifference,
          howItWorks: itHowItWorks,
          portfolio: itPortfolio,
          pricing: itPricing,
          contact: itContact,
          // Pages
          servicesRates: itServicesRates,
          notFound: itNotFound,
          legal: itLegal,
          portfolioPage: itPortfolioPage,
          about: itAbout,
          faq: itFaq,
          // Components
          nav: itNav,
          footer: itFooter,
          cookies: itCookies,
          common: itCommon,
          seo: itSeo,
          // Other
          ...itQuiz,
          ...itCalculator,
          ...itFloatingContact,
        },
      },
      ro: {
        translation: {
          // Sections
          hero: roHero,
          problem: roProblem,
          difference: roDifference,
          howItWorks: roHowItWorks,
          portfolio: roPortfolio,
          pricing: roPricing,
          contact: roContact,
          // Pages
          servicesRates: roServicesRates,
          notFound: roNotFound,
          legal: roLegal,
          portfolioPage: roPortfolioPage,
          about: roAbout,
          faq: roFaq,
          // Components
          nav: roNav,
          footer: roFooter,
          cookies: roCookies,
          common: roCommon,
          seo: roSeo,
          // Other
          ...roQuiz,
          ...roCalculator,
          ...roFloatingContact,
        },
      },
    },
    lng: initialLanguage, // Language from URL path
    fallbackLng: "en", // Fallback to English if translation missing
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: true, // Enable suspense to ensure translations load before render
    },
  });

// Update HTML lang attribute when language changes
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng; // Update HTML lang attribute for accessibility
});

export default i18n;
