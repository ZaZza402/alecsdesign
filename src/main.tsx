import { StrictMode, useEffect, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./index.css";
import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos";
import i18n from "./i18n"; // Initialize i18n FIRST
import App from "./App.tsx";
import LoadingSkeleton from "./components/ui/LoadingSkeleton";

const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.tsx"));
const TermsConditions = lazy(() => import("./pages/TermsConditions.tsx"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy.tsx"));
const ServicesRates = lazy(() => import("./pages/ServicesRates.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const QuizPage = lazy(() => import("./pages/QuizPage.tsx"));
const QuizResults = lazy(() => import("./pages/QuizResults.tsx"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage.tsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.tsx"));

import ScrollToTop from "./components/ui/ScrollToTop";
import PageTransition from "./components/ui/PageTransition";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import CookieBanner from "./components/ui/CookieBanner";
import ScrollProgress from "./components/ui/ScrollProgress";
import MetallicBackground from "./components/ui/backgrounds/MetallicBackground";

// Initialize AOS
AOS.init({
  duration: 800,
  easing: "ease-out",
  once: true,
  offset: 100,
});

// Language wrapper component
function LanguageWrapper({ lang }: { lang: string }) {
  // Set language when route changes - use useEffect to avoid setState during render
  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  return (
    <PageTransition>
      <App />
    </PageTransition>
  );
}

// Page wrapper - sets language for separate pages
function PageWrapper({
  lang,
  children,
}: {
  lang: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  return (
    <PageTransition>
      <main style={{ paddingTop: "80px", minHeight: "100vh" }}>
        <Suspense fallback={<LoadingSkeleton />}>{children}</Suspense>
      </main>
      <Footer />
    </PageTransition>
  );
}

function AppRoutes() {
  const location = useLocation();
  return (
    <>
      <Header />
      <MetallicBackground />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Root domain serves English by default for SEO */}
          <Route path="/" element={<LanguageWrapper lang="en" />} />

          {/* Language-specific routes - Note the trailing * to allow nested routes in App.tsx */}
          <Route path="/en/*" element={<LanguageWrapper lang="en" />} />
          <Route path="/it/*" element={<LanguageWrapper lang="it" />} />
          <Route path="/ro/*" element={<LanguageWrapper lang="ro" />} />

          {/* English pages - Root paths (no /en prefix) */}
          <Route
            path="/privacy-policy"
            element={
              <PageWrapper lang="en">
                <PrivacyPolicy />
              </PageWrapper>
            }
          />
          <Route
            path="/terms-conditions"
            element={
              <PageWrapper lang="en">
                <TermsConditions />
              </PageWrapper>
            }
          />
          <Route
            path="/cookie-policy"
            element={
              <PageWrapper lang="en">
                <CookiePolicy />
              </PageWrapper>
            }
          />
          <Route
            path="/services-rates"
            element={
              <PageWrapper lang="en">
                <ServicesRates />
              </PageWrapper>
            }
          />
          <Route
            path="/quiz"
            element={
              <PageWrapper lang="en">
                <QuizPage />
              </PageWrapper>
            }
          />
          <Route
            path="/quiz/results"
            element={
              <PageWrapper lang="en">
                <QuizResults />
              </PageWrapper>
            }
          />
          <Route
            path="/portfolio"
            element={
              <PageWrapper lang="en">
                <PortfolioPage />
              </PageWrapper>
            }
          />
          <Route
            path="/contact"
            element={
              <PageWrapper lang="en">
                <ContactPage />
              </PageWrapper>
            }
          />

          {/* Legacy /en routes - Keep for backward compatibility */}
          <Route
            path="/en/privacy-policy"
            element={
              <PageWrapper lang="en">
                <PrivacyPolicy />
              </PageWrapper>
            }
          />
          <Route
            path="/en/terms-conditions"
            element={
              <PageWrapper lang="en">
                <TermsConditions />
              </PageWrapper>
            }
          />
          <Route
            path="/en/cookie-policy"
            element={
              <PageWrapper lang="en">
                <CookiePolicy />
              </PageWrapper>
            }
          />
          <Route
            path="/en/services-rates"
            element={
              <PageWrapper lang="en">
                <ServicesRates />
              </PageWrapper>
            }
          />
          <Route
            path="/en/quiz"
            element={
              <PageWrapper lang="en">
                <QuizPage />
              </PageWrapper>
            }
          />
          <Route
            path="/en/quiz/results"
            element={
              <PageWrapper lang="en">
                <QuizResults />
              </PageWrapper>
            }
          />
          <Route
            path="/en/portfolio"
            element={
              <PageWrapper lang="en">
                <PortfolioPage />
              </PageWrapper>
            }
          />
          <Route
            path="/en/contact"
            element={
              <PageWrapper lang="en">
                <ContactPage />
              </PageWrapper>
            }
          />

          {/* Legal pages - Italian */}
          <Route
            path="/it/privacy-policy"
            element={
              <PageWrapper lang="it">
                <PrivacyPolicy />
              </PageWrapper>
            }
          />
          <Route
            path="/it/terms-conditions"
            element={
              <PageWrapper lang="it">
                <TermsConditions />
              </PageWrapper>
            }
          />
          <Route
            path="/it/cookie-policy"
            element={
              <PageWrapper lang="it">
                <CookiePolicy />
              </PageWrapper>
            }
          />
          <Route
            path="/it/services-rates"
            element={
              <PageWrapper lang="it">
                <ServicesRates />
              </PageWrapper>
            }
          />
          <Route
            path="/it/quiz"
            element={
              <PageWrapper lang="it">
                <QuizPage />
              </PageWrapper>
            }
          />
          <Route
            path="/it/quiz/results"
            element={
              <PageWrapper lang="it">
                <QuizResults />
              </PageWrapper>
            }
          />
          <Route
            path="/it/portfolio"
            element={
              <PageWrapper lang="it">
                <PortfolioPage />
              </PageWrapper>
            }
          />
          <Route
            path="/it/contact"
            element={
              <PageWrapper lang="it">
                <ContactPage />
              </PageWrapper>
            }
          />

          {/* Legal pages - Romanian */}
          <Route
            path="/ro/privacy-policy"
            element={
              <PageWrapper lang="ro">
                <PrivacyPolicy />
              </PageWrapper>
            }
          />
          <Route
            path="/ro/terms-conditions"
            element={
              <PageWrapper lang="ro">
                <TermsConditions />
              </PageWrapper>
            }
          />
          <Route
            path="/ro/cookie-policy"
            element={
              <PageWrapper lang="ro">
                <CookiePolicy />
              </PageWrapper>
            }
          />
          <Route
            path="/ro/services-rates"
            element={
              <PageWrapper lang="ro">
                <ServicesRates />
              </PageWrapper>
            }
          />
          <Route
            path="/ro/quiz"
            element={
              <PageWrapper lang="ro">
                <QuizPage />
              </PageWrapper>
            }
          />
          <Route
            path="/ro/quiz/results"
            element={
              <PageWrapper lang="ro">
                <QuizResults />
              </PageWrapper>
            }
          />
          <Route
            path="/ro/portfolio"
            element={
              <PageWrapper lang="ro">
                <PortfolioPage />
              </PageWrapper>
            }
          />
          <Route
            path="/ro/contact"
            element={
              <PageWrapper lang="ro">
                <ContactPage />
              </PageWrapper>
            }
          />

          {/* 404 - Not Found pages */}
          <Route
            path="/en/404"
            element={
              <PageWrapper lang="en">
                <NotFound />
              </PageWrapper>
            }
          />
          <Route
            path="/it/404"
            element={
              <PageWrapper lang="it">
                <NotFound />
              </PageWrapper>
            }
          />
          <Route
            path="/ro/404"
            element={
              <PageWrapper lang="ro">
                <NotFound />
              </PageWrapper>
            }
          />

          {/* Catch all - show 404 */}
          <Route
            path="*"
            element={
              <PageWrapper lang="en">
                <NotFound />
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
      <CookieBanner />
      <ScrollProgress />
    </BrowserRouter>
  </StrictMode>
);
