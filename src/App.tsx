import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";
import BottomNav from "./components/layout/BottomNav";
import Hero from "./sections/Hero";
import ProblemSection from "./sections/ProblemSection";
import DifferenceSection from "./sections/DifferenceSection";
import MobileLanguageLabel from "./components/ui/MobileLanguageLabel";
import CookieBanner from "./components/ui/CookieBanner";
import ScrollProgress from "./components/ui/ScrollProgress";
import MetallicBackground from "./components/ui/backgrounds/MetallicBackground";
import LoadingSkeleton from "./components/ui/LoadingSkeleton";

// Lazy load below-fold sections for better initial load performance
const TechnologySection = lazy(() => import("./sections/TechnologySection"));
const WhyNotWordPressSection = lazy(
  () => import("./sections/WhyNotWordPressSection")
);
const PricingSection = lazy(() => import("./sections/PricingSection"));
const ProcessLifecycleSection = lazy(
  () => import("./sections/ProcessLifecycleSection")
);
const ServicesSection = lazy(() => import("./sections/ServicesSection"));
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

      <Sidebar />
      <MobileLanguageLabel />
      <main role="main">
        <section id="home" aria-labelledby="hero-heading">
          <Hero />
        </section>
        <section id="problem" aria-labelledby="problem-heading">
          <ProblemSection />
          <DifferenceSection />
        </section>
        <Suspense fallback={<LoadingSkeleton />}>
          <section id="technology" aria-labelledby="technology-heading">
            <TechnologySection />
          </section>
          <section
            id="why-not-wordpress"
            aria-labelledby="why-not-wordpress-heading"
          >
            <WhyNotWordPressSection />
          </section>
          {/* <section id="portfolio" aria-labelledby="portfolio-heading">
          <PortfolioSection />
        </section> */}
          <section id="pricing" aria-labelledby="pricing-heading">
            <PricingSection />
          </section>
          <section id="process" aria-labelledby="process-heading">
            <ProcessLifecycleSection />
          </section>
          <section id="services" aria-labelledby="services-heading">
            <ServicesSection />
          </section>
          <section id="contact" aria-labelledby="contact-heading">
            <ContactSection />
          </section>
        </Suspense>
      </main>
      <Footer />
      <BottomNav />
      <CookieBanner />
      <ScrollProgress />
    </div>
  );
}
