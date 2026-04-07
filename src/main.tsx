import { StrictMode, useEffect, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import "aos/dist/aos.css";
import { i18nReady } from "./i18n"; // Async i18n — defers render until translations ready
import i18n, { switchLanguage } from "./i18n";
import App from "./App.tsx";
import LoadingSkeleton from "./components/ui/LoadingSkeleton";

const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.tsx"));
const TermsConditions = lazy(() => import("./pages/TermsConditions.tsx"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage.tsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.tsx"));
const AboutPage = lazy(() => import("./pages/AboutPage.tsx"));
const GuidesHub = lazy(() => import("./pages/GuidesHub.tsx"));
const WebsiteCostGuide = lazy(
  () => import("./pages/guides/WebsiteCostGuide.tsx"),
);
const GoogleGuide = lazy(() => import("./pages/guides/GoogleGuide.tsx"));
const WebsiteNeedsGuide = lazy(
  () => import("./pages/guides/WebsiteNeedsGuide.tsx"),
);

import PageTransition from "./components/ui/PageTransition";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import CookieBanner from "./components/ui/CookieBanner";
import ScrollProgress from "./components/ui/ScrollProgress";

// Lazy-load AOS after mount so it doesn't block the critical path
const initAOS = () =>
  import("aos").then(({ default: AOS }) =>
    AOS.init({ duration: 800, easing: "ease-out", once: true, offset: 100 }),
  );

// Language wrapper component
// eslint-disable-next-line react-refresh/only-export-components
function LanguageWrapper({ lang }: { lang: string }) {
  // Set language when route changes - use useEffect to avoid setState during render
  useEffect(() => {
    if (i18n.language !== lang) {
      switchLanguage(lang);
    }
  }, [lang]);

  return (
    <PageTransition>
      <App />
    </PageTransition>
  );
}

// Page wrapper - sets language for separate pages
// eslint-disable-next-line react-refresh/only-export-components
function PageWrapper({
  lang,
  children,
}: {
  lang: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (i18n.language !== lang) {
      switchLanguage(lang);
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

const LANGS = ["en", "it", "ro"];
function routeKey(path: string): string {
  const parts = path.split("/").filter(Boolean);
  if (parts.length > 0 && LANGS.includes(parts[0])) parts.shift();
  return "/" + parts.join("/");
}

// eslint-disable-next-line react-refresh/only-export-components
function AppRoutes() {
  const location = useLocation();
  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={routeKey(location.pathname)}>
          {/* Root domain serves English by default for SEO */}
          <Route path="/*" element={<LanguageWrapper lang="en" />} />

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
          <Route
            path="/about"
            element={
              <PageWrapper lang="en">
                <AboutPage />
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
          <Route
            path="/en/about"
            element={
              <PageWrapper lang="en">
                <AboutPage />
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
          <Route
            path="/it/about"
            element={
              <PageWrapper lang="it">
                <AboutPage />
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
          <Route
            path="/ro/about"
            element={
              <PageWrapper lang="ro">
                <AboutPage />
              </PageWrapper>
            }
          />

          {/* Guides hub - EN (root) */}
          <Route
            path="/guide"
            element={
              <PageWrapper lang="en">
                <GuidesHub lang="en" />
              </PageWrapper>
            }
          />
          <Route
            path="/guide/"
            element={
              <PageWrapper lang="en">
                <GuidesHub lang="en" />
              </PageWrapper>
            }
          />

          {/* Guide pages - EN */}
          <Route
            path="/guide/how-much-does-a-website-cost"
            element={
              <PageWrapper lang="en">
                <WebsiteCostGuide lang="en" />
              </PageWrapper>
            }
          />
          <Route
            path="/guide/how-to-get-found-on-google"
            element={
              <PageWrapper lang="en">
                <GoogleGuide lang="en" />
              </PageWrapper>
            }
          />
          <Route
            path="/guide/what-your-website-needs"
            element={
              <PageWrapper lang="en">
                <WebsiteNeedsGuide lang="en" />
              </PageWrapper>
            }
          />

          {/* Guides hub - IT */}
          <Route
            path="/it/guide"
            element={
              <PageWrapper lang="it">
                <GuidesHub lang="it" />
              </PageWrapper>
            }
          />
          <Route
            path="/it/guide/"
            element={
              <PageWrapper lang="it">
                <GuidesHub lang="it" />
              </PageWrapper>
            }
          />

          {/* Guide pages - IT */}
          <Route
            path="/it/guide/quanto-costa-un-sito-web"
            element={
              <PageWrapper lang="it">
                <WebsiteCostGuide lang="it" />
              </PageWrapper>
            }
          />
          <Route
            path="/it/guide/come-farsi-trovare-su-google"
            element={
              <PageWrapper lang="it">
                <GoogleGuide lang="it" />
              </PageWrapper>
            }
          />
          <Route
            path="/it/guide/cosa-deve-avere-il-sito-web"
            element={
              <PageWrapper lang="it">
                <WebsiteNeedsGuide lang="it" />
              </PageWrapper>
            }
          />

          {/* Guides hub - RO */}
          <Route
            path="/ro/guide"
            element={
              <PageWrapper lang="ro">
                <GuidesHub lang="ro" />
              </PageWrapper>
            }
          />
          <Route
            path="/ro/guide/"
            element={
              <PageWrapper lang="ro">
                <GuidesHub lang="ro" />
              </PageWrapper>
            }
          />

          {/* Guide pages - RO */}
          <Route
            path="/ro/guide/cat-costa-un-site-web"
            element={
              <PageWrapper lang="ro">
                <WebsiteCostGuide lang="ro" />
              </PageWrapper>
            }
          />
          <Route
            path="/ro/guide/cum-sa-apari-pe-google"
            element={
              <PageWrapper lang="ro">
                <GoogleGuide lang="ro" />
              </PageWrapper>
            }
          />
          <Route
            path="/ro/guide/ce-trebuie-sa-aiba-site-ul"
            element={
              <PageWrapper lang="ro">
                <WebsiteNeedsGuide lang="ro" />
              </PageWrapper>
            }
          />

          {/* Guide pages - EN aliases with /en/ prefix (fallback) */}
          <Route
            path="/en/guide"
            element={
              <PageWrapper lang="en">
                <GuidesHub lang="en" />
              </PageWrapper>
            }
          />
          <Route
            path="/en/guide/how-much-does-a-website-cost"
            element={
              <PageWrapper lang="en">
                <WebsiteCostGuide lang="en" />
              </PageWrapper>
            }
          />
          <Route
            path="/en/guide/how-to-get-found-on-google"
            element={
              <PageWrapper lang="en">
                <GoogleGuide lang="en" />
              </PageWrapper>
            }
          />
          <Route
            path="/en/guide/what-your-website-needs"
            element={
              <PageWrapper lang="en">
                <WebsiteNeedsGuide lang="en" />
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

// Wait for translations to load before mounting — avoids flash of untranslated content
// and keeps the main bundle ~150 kB lighter (only current language loads)
i18nReady.then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <AppRoutes />
          <CookieBanner />
          <ScrollProgress />
        </BrowserRouter>
      </HelmetProvider>
    </StrictMode>,
  );
  // Dismiss intro loader after React's first painted frame
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const loader = document.getElementById("app-loader");
      if (loader) {
        loader.classList.add("hide");
        setTimeout(() => loader.remove(), 460);
      }
    });
  });
  // AOS initializes after React mounts — not in the critical render path
  initAOS();
  // Lenis smooth scroll — lazy loaded so it doesn't block initial render
  import("lenis").then(({ default: Lenis }) => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  });
});
