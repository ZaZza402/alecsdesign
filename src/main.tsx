import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos";
import i18n from "./i18n"; // Initialize i18n FIRST
import App from "./App.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import TermsConditions from "./pages/TermsConditions.tsx";
import CookiePolicy from "./pages/CookiePolicy.tsx";
import ServicesRates from "./pages/ServicesRates.tsx";
import NotFound from "./pages/NotFound.tsx";
import QuizPage from "./pages/QuizPage.tsx";
import QuizResults from "./pages/QuizResults.tsx";

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

  return <App />;
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

  return <>{children}</>;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Root domain serves English by default for SEO */}
        <Route path="/" element={<LanguageWrapper lang="en" />} />

        {/* Language-specific routes */}
        <Route path="/en" element={<LanguageWrapper lang="en" />} />
        <Route path="/it" element={<LanguageWrapper lang="it" />} />
        <Route path="/ro" element={<LanguageWrapper lang="ro" />} />

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
    </BrowserRouter>
  </StrictMode>
);
