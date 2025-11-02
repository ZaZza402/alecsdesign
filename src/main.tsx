import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import "./i18n"; // Initialize i18n
import App from "./App.tsx";
import i18n from "./i18n";

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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Redirect root to default language */}
        <Route path="/" element={<Navigate to="/en" replace />} />

        {/* Language-specific routes */}
        <Route path="/en" element={<LanguageWrapper lang="en" />} />
        <Route path="/it" element={<LanguageWrapper lang="it" />} />
        <Route path="/ro" element={<LanguageWrapper lang="ro" />} />

        {/* Catch all - redirect to English */}
        <Route path="*" element={<Navigate to="/en" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
