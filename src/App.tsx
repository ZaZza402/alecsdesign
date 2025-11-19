import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HeroSection from "./sections/HeroSection";
import ProblemSection from "./sections/ProblemSection";
import DifferenceSection from "./sections/DifferenceSection";
import HowItWorksSection from "./sections/HowItWorksSection";
import CookieBanner from "./components/ui/CookieBanner";
import ScrollProgress from "./components/ui/ScrollProgress";
import LanguageSuggestionBanner from "./components/ui/LanguageSuggestionBanner";
import MetallicBackground from "./components/ui/backgrounds/MetallicBackground";
import LoadingSkeleton from "./components/ui/LoadingSkeleton";

// Lazy load below-fold sections for better initial load performance
const PricingSection = lazy(() => import("./sections/PricingSection"));
const PortfolioSection = lazy(() => import("./sections/PortfolioSection"));
const SubscriptionFAQSection = lazy(
  () => import("./sections/SubscriptionFAQSection")
);
const ContactSection = lazy(() => import("./sections/ContactSection"));
import {
  SEO,
  StructuredData,
  generateLocalBusinessSchema,
  generateWebsiteSchema,
} from "./utils/seo";

export default function App() {
  const { t } = useTranslation();

  return (
    <div
      className="min-h-screen relative"
      style={{ maxWidth: "100vw", overflowX: "hidden" }}
    >
      {/* SEO Meta Tags */}
      <SEO
        title={t("seo.title")}
        description={t("seo.description")}
        keywords={t("seo.keywords")}
        ogType="website"
      />

      {/* Structured Data */}
      <StructuredData data={generateLocalBusinessSchema()} />
      <StructuredData data={generateWebsiteSchema()} />

      {/* Global metallic background */}
      <MetallicBackground />

      {/* Language suggestion banner */}
      <LanguageSuggestionBanner />

      {/* New minimal header */}
      <Header />

      <main role="main" style={{ paddingTop: "80px" }}>
        <section id="home" aria-labelledby="hero-heading">
          <HeroSection />
        </section>
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
          <section id="portfolio" aria-labelledby="portfolio-heading">
            <PortfolioSection key={`portfolio-${t("nav.portfolio")}`} />
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
      <CookieBanner />
      <ScrollProgress />
    </div>
  );
}
