import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/layout/Footer";
import HeroSection from "./sections/HeroSection";
import ProblemSection from "./sections/ProblemSection";
import DifferenceSection from "./sections/DifferenceSection";
import HowItWorksSection from "./sections/HowItWorksSection";
import LanguageSuggestionBanner from "./components/ui/LanguageSuggestionBanner";
import LoadingSkeleton from "./components/ui/LoadingSkeleton";
import { BackgroundPaths } from "./components/ui/background-paths";

// Lazy load pages and sections
const PricingSection = lazy(() => import("./sections/PricingSection"));
const PortfolioSection = lazy(() => import("./sections/PortfolioSection"));
const SubscriptionFAQSection = lazy(
  () => import("./sections/SubscriptionFAQSection")
);
const ContactSection = lazy(() => import("./sections/ContactSection"));
const QuizPage = lazy(() => import("./pages/QuizPage"));
const QuizResults = lazy(() => import("./pages/QuizResults"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage"));
const ServicesRates = lazy(() => import("./pages/ServicesRates"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

import {
  SEO,
  StructuredData,
  generateLocalBusinessSchema,
  generateWebsiteSchema,
} from "./utils/seo";

// Home Page Component
const HomePage = () => {
  const { t } = useTranslation();
  return (
    <>
      <SEO
        title={t("seo.title")}
        description={t("seo.description")}
        keywords={t("seo.keywords")}
        ogType="website"
      />
      <main role="main" style={{ paddingTop: "80px", position: "relative" }}>
        <BackgroundPaths className="!h-[140vh] !absolute !top-[-80px]" />
        <section id="home" aria-labelledby="hero-heading">
          <HeroSection />
        </section>
        <Suspense fallback={<LoadingSkeleton />}>
          <section id="portfolio" aria-labelledby="portfolio-heading">
            <PortfolioSection key={`portfolio-${t("nav.portfolio")}`} />
          </section>
        </Suspense>
        <section id="problem" aria-labelledby="problem-heading">
          <ProblemSection />
        </section>
        <section id="how-it-works" aria-labelledby="how-it-works-heading">
          <HowItWorksSection />
        </section>
        <section id="difference" aria-labelledby="difference-heading">
          <DifferenceSection />
        </section>
        <Suspense fallback={<LoadingSkeleton />}>
          <section id="pricing" aria-labelledby="pricing-heading">
            <PricingSection key={`pricing-${t("nav.pricing")}`} />
          </section>
          <section id="faq" aria-labelledby="faq-heading">
            <SubscriptionFAQSection key={`faq-${t("nav.faq")}`} />
          </section>
          <section id="contact" aria-labelledby="contact-heading">
            <ContactSection key={`contact-${t("nav.contact")}`} />
          </section>
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export default function App() {
  return (
    <div
      className="min-h-screen relative"
      style={{ maxWidth: "100vw", overflowX: "hidden" }}
    >
      {/* Structured Data */}
      <StructuredData data={generateLocalBusinessSchema()} />
      <StructuredData data={generateWebsiteSchema()} />

      {/* Language suggestion banner */}
      <LanguageSuggestionBanner />

      <Routes>
        {/* Routes are relative to the parent route defined in main.tsx */}
        <Route index element={<HomePage />} />
        <Route
          path="quiz"
          element={
            <Suspense fallback={<LoadingSkeleton />}>
              <QuizPage />
            </Suspense>
          }
        />
        <Route
          path="quiz/results"
          element={
            <Suspense fallback={<LoadingSkeleton />}>
              <QuizResults />
            </Suspense>
          }
        />
        <Route
          path="portfolio"
          element={
            <Suspense fallback={<LoadingSkeleton />}>
              <PortfolioPage />
            </Suspense>
          }
        />
        <Route
          path="services-rates"
          element={
            <Suspense fallback={<LoadingSkeleton />}>
              <ServicesRates />
            </Suspense>
          }
        />
        <Route
          path="contact"
          element={
            <Suspense fallback={<LoadingSkeleton />}>
              <ContactPage />
            </Suspense>
          }
        />
        <Route
          path="privacy-policy"
          element={
            <Suspense fallback={<LoadingSkeleton />}>
              <PrivacyPolicy />
            </Suspense>
          }
        />
        <Route
          path="terms-conditions"
          element={
            <Suspense fallback={<LoadingSkeleton />}>
              <TermsConditions />
            </Suspense>
          }
        />
        <Route
          path="cookie-policy"
          element={
            <Suspense fallback={<LoadingSkeleton />}>
              <CookiePolicy />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<LoadingSkeleton />}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
}
