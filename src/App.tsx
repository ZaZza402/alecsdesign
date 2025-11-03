import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";
import BottomNav from "./components/layout/BottomNav";
import Hero from "./sections/Hero";
import ProblemSection from "./sections/ProblemSection";
import DifferenceSection from "./sections/DifferenceSection";
import TechnologySection from "./sections/TechnologySection";
// import PortfolioSection from "./sections/PortfolioSection";
import PricingSection from "./sections/PricingSection";
import ProcessSection from "./sections/ProcessSection";
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
  return (
    <div className="min-h-screen relative">
      {/* SEO Meta Tags */}
      <SEO
        title="alecsdesign - Professional Web Development in Rome | Modern Web Applications"
        description="Professional web development services in Rome, Italy. Custom React applications, e-commerce solutions, and modern web design. Scalable, SEO-optimized websites for small businesses across Lazio and Europe."
        keywords="web development Rome, sviluppo web Roma, web design Italy, React developer Rome, modern web applications, e-commerce development, SEO optimization, responsive websites, Lazio web developer, sviluppatore web Roma, applicazioni web moderne"
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
        {/* <section id="portfolio" aria-labelledby="portfolio-heading">
          <PortfolioSection />
        </section> */}
        <section id="pricing" aria-labelledby="pricing-heading">
          <PricingSection />
        </section>
        <section id="process" aria-labelledby="process-heading">
          <ProcessSection />
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
