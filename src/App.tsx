import { useTranslation } from "react-i18next";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";
import BottomNav from "./components/layout/BottomNav";
import Hero from "./sections/Hero";
import ProblemSection from "./sections/ProblemSection";
import DifferenceSection from "./sections/DifferenceSection";
import TechnologySection from "./sections/TechnologySection";
import WhyNotWordPressSection from "./sections/WhyNotWordPressSection";
// import PortfolioSection from "./sections/PortfolioSection";
import PricingSection from "./sections/PricingSection";
import ProcessLifecycleSection from "./sections/ProcessLifecycleSection";
import ContactSection from "./sections/ContactSection";
import MobileLanguageLabel from "./components/ui/MobileLanguageLabel";
import CookieBanner from "./components/ui/CookieBanner";
import MetallicBackground from "./components/ui/backgrounds/MetallicBackground";
import {
  SEO,
  StructuredData,
  generateLocalBusinessSchema,
  generateWebsiteSchema,
} from "./utils/seo";

export default function App() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen relative">
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
        <section id="technology" aria-labelledby="technology-heading">
          <TechnologySection />
        </section>
        <section id="why-not-wordpress" aria-labelledby="why-not-wordpress-heading">
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
        <section id="contact" aria-labelledby="contact-heading">
          <ContactSection />
        </section>
      </main>
      <Footer />
      <BottomNav />
      <CookieBanner />
    </div>
  );
}
