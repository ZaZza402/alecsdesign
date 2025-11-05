import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import "./i18n"; // Initialize i18n
import App from "./App.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import TermsConditions from "./pages/TermsConditions.tsx";
import CookiePolicy from "./pages/CookiePolicy.tsx";
import NotFound from "./pages/NotFound.tsx";
import i18n from "./i18n";
import { detectUserLanguage } from "./utils/languageDetection";

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

// Legal page wrapper
function LegalPageWrapper({
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

// Smart redirect component with geo-based language detection
function SmartLanguageRedirect() {
  const [detectedLang, setDetectedLang] = useState<string | null>(null);

  useEffect(() => {
    detectUserLanguage().then((lang) => {
      setDetectedLang(lang);
    });
  }, []);

  // Show nothing while detecting
  if (!detectedLang) {
    return null;
  }

  // Redirect to detected language
  return <Navigate to={`/${detectedLang}`} replace />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Smart redirect with geo-based language detection */}
        <Route path="/" element={<SmartLanguageRedirect />} />

        {/* Language-specific routes */}
        <Route path="/en" element={<LanguageWrapper lang="en" />} />
        <Route path="/it" element={<LanguageWrapper lang="it" />} />
        <Route path="/ro" element={<LanguageWrapper lang="ro" />} />

        {/* Legal pages - English */}
        <Route
          path="/en/privacy-policy"
          element={
            <LegalPageWrapper lang="en">
              <PrivacyPolicy />
            </LegalPageWrapper>
          }
        />
        <Route
          path="/en/terms-conditions"
          element={
            <LegalPageWrapper lang="en">
              <TermsConditions />
            </LegalPageWrapper>
          }
        />
        <Route
          path="/en/cookie-policy"
          element={
            <LegalPageWrapper lang="en">
              <CookiePolicy />
            </LegalPageWrapper>
          }
        />

        {/* Legal pages - Italian */}
        <Route
          path="/it/privacy-policy"
          element={
            <LegalPageWrapper lang="it">
              <PrivacyPolicy />
            </LegalPageWrapper>
          }
        />
        <Route
          path="/it/terms-conditions"
          element={
            <LegalPageWrapper lang="it">
              <TermsConditions />
            </LegalPageWrapper>
          }
        />
        <Route
          path="/it/cookie-policy"
          element={
            <LegalPageWrapper lang="it">
              <CookiePolicy />
            </LegalPageWrapper>
          }
        />

        {/* Legal pages - Romanian */}
        <Route
          path="/ro/privacy-policy"
          element={
            <LegalPageWrapper lang="ro">
              <PrivacyPolicy />
            </LegalPageWrapper>
          }
        />
        <Route
          path="/ro/terms-conditions"
          element={
            <LegalPageWrapper lang="ro">
              <TermsConditions />
            </LegalPageWrapper>
          }
        />
        <Route
          path="/ro/cookie-policy"
          element={
            <LegalPageWrapper lang="ro">
              <CookiePolicy />
            </LegalPageWrapper>
          }
        />

        {/* 404 - Not Found pages */}
        <Route
          path="/en/404"
          element={
            <LegalPageWrapper lang="en">
              <NotFound />
            </LegalPageWrapper>
          }
        />
        <Route
          path="/it/404"
          element={
            <LegalPageWrapper lang="it">
              <NotFound />
            </LegalPageWrapper>
          }
        />
        <Route
          path="/ro/404"
          element={
            <LegalPageWrapper lang="ro">
              <NotFound />
            </LegalPageWrapper>
          }
        />

        {/* Catch all - show 404 */}
        <Route
          path="*"
          element={
            <LegalPageWrapper lang="en">
              <NotFound />
            </LegalPageWrapper>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
