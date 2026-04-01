import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import English translations - Sections
import enHero from "./locales/en/sections/hero.json";
import enHowItWorks from "./locales/en/sections/howItWorks.json";
import enPortfolio from "./locales/en/sections/portfolio.json";
import enServices from "./locales/en/sections/services.json";
import enContact from "./locales/en/sections/contact.json";
import enComparison from "./locales/en/sections/comparison.json";

// Import English translations - Pages
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
import itHowItWorks from "./locales/it/sections/howItWorks.json";
import itPortfolio from "./locales/it/sections/portfolio.json";
import itServices from "./locales/it/sections/services.json";
import itContact from "./locales/it/sections/contact.json";
import itComparison from "./locales/it/sections/comparison.json";

// Import Italian translations - Pages
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
import roHowItWorks from "./locales/ro/sections/howItWorks.json";
import roPortfolio from "./locales/ro/sections/portfolio.json";
import roServices from "./locales/ro/sections/services.json";
import roContact from "./locales/ro/sections/contact.json";
import roComparison from "./locales/ro/sections/comparison.json";

// Import Romanian translations - Pages
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

// Import calculator translations
import itCalculator from "./locales/it/calculator.json";
import enCalculator from "./locales/en/calculator.json";
import roCalculator from "./locales/ro/calculator.json";

// Import floating contact translations
import itFloatingContact from "./locales/it/floatingContact.json";
import enFloatingContact from "./locales/en/floatingContact.json";
import roFloatingContact from "./locales/ro/floatingContact.json";

// Import guide translations
import enGuidesWebsiteCost from "./locales/en/pages/guides/websiteCost.json";
import enGuidesGoogle from "./locales/en/pages/guides/google.json";
import enGuidesWebsiteNeeds from "./locales/en/pages/guides/websiteNeeds.json";
import itGuidesWebsiteCost from "./locales/it/pages/guides/websiteCost.json";
import itGuidesGoogle from "./locales/it/pages/guides/google.json";
import itGuidesWebsiteNeeds from "./locales/it/pages/guides/websiteNeeds.json";
import roGuidesWebsiteCost from "./locales/ro/pages/guides/websiteCost.json";
import roGuidesGoogle from "./locales/ro/pages/guides/google.json";
import roGuidesWebsiteNeeds from "./locales/ro/pages/guides/websiteNeeds.json";
import enGuideUi from "./locales/en/pages/guideUi.json";
import itGuideUi from "./locales/it/pages/guideUi.json";
import roGuideUi from "./locales/ro/pages/guideUi.json";

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
          howItWorks: enHowItWorks,
          portfolio: enPortfolio,
          services: enServices,
          contact: enContact,
          comparison: enComparison,
          // Pages
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
          ...enCalculator,
          ...enFloatingContact,
          // Guides
          guides: {
            websiteCost: enGuidesWebsiteCost,
            google: enGuidesGoogle,
            websiteNeeds: enGuidesWebsiteNeeds,
          },
          guideUi: enGuideUi,
        },
      },
      it: {
        translation: {
          // Sections
          hero: itHero,
          howItWorks: itHowItWorks,
          portfolio: itPortfolio,
          services: itServices,
          contact: itContact,
          comparison: itComparison,
          // Pages
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
          ...itCalculator,
          ...itFloatingContact,
          // Guides
          guides: {
            websiteCost: itGuidesWebsiteCost,
            google: itGuidesGoogle,
            websiteNeeds: itGuidesWebsiteNeeds,
          },
          guideUi: itGuideUi,
        },
      },
      ro: {
        translation: {
          // Sections
          hero: roHero,
          howItWorks: roHowItWorks,
          portfolio: roPortfolio,
          services: roServices,
          contact: roContact,
          comparison: roComparison,
          // Pages
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
          ...roCalculator,
          ...roFloatingContact,
          // Guides
          guides: {
            websiteCost: roGuidesWebsiteCost,
            google: roGuidesGoogle,
            websiteNeeds: roGuidesWebsiteNeeds,
          },
          guideUi: roGuideUi,
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
