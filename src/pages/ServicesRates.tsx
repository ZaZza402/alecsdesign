import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { ShoppingCart, Wrench, Palette, Globe, Zap, Lock } from "lucide-react";
import { SEO } from "../utils/seo";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import CookieBanner from "../components/ui/CookieBanner";
import ScrollProgress from "../components/ui/ScrollProgress";
import LanguageSuggestionBanner from "../components/ui/LanguageSuggestionBanner";
import MetallicBackground from "../components/ui/backgrounds/MetallicBackground";
import "./ServicesRates.css";

const ServicesRates = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const addons = [
    {
      key: "ecommerce",
      icon: ShoppingCart,
      price: "€400",
      examples: [
        "Product catalog with cart",
        "Payment integration (Stripe/PayPal)",
        "Order management system",
      ],
    },
    {
      key: "booking",
      icon: Zap,
      price: "€200",
      examples: [
        "Appointment scheduling",
        "Calendar integration",
        "Automated email confirmations",
      ],
    },
    {
      key: "multilingual",
      icon: Globe,
      price: "€150/language",
      examples: [
        "Full site translation",
        "Language switcher",
        "SEO for each language",
      ],
    },
    {
      key: "customFeature",
      icon: Wrench,
      price: "Custom quote",
      examples: [
        "User authentication & login",
        "Custom integrations",
        "Advanced functionality",
      ],
    },
  ];

  const modifications = [
    {
      key: "contentUpdate",
      icon: Palette,
      price: "€50-100",
      examples: ["Text changes", "Image replacements", "Contact info updates"],
    },
    {
      key: "designTweaks",
      icon: Palette,
      price: "€100-200",
      examples: [
        "Color scheme changes",
        "Layout adjustments",
        "Typography updates",
      ],
    },
    {
      key: "newSection",
      icon: Wrench,
      price: "€150-300",
      examples: ["New page section", "Additional page", "FAQ section"],
    },
    {
      key: "security",
      icon: Lock,
      price: "Included",
      examples: ["SSL certificates", "Security updates", "Backup management"],
    },
  ];

  return (
    <>
      <MetallicBackground />
      <LanguageSuggestionBanner />
      <Header />
      <SEO
        title={t("servicesRates.seo.title")}
        description={t("servicesRates.seo.description")}
        keywords={t("servicesRates.seo.keywords")}
        ogType="website"
      />

      <main className="services-rates-page" role="main">
        <div className="services-rates-container">
          {/* Hero Section */}
          <div className="services-hero" data-aos="fade-up">
            <h1 className="services-title">{t("servicesRates.title")}</h1>
            <p className="services-subtitle">{t("servicesRates.subtitle")}</p>
          </div>

          {/* Addons Section */}
          <section
            className="services-section"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="section-header">
              <h2 className="section-title">
                {t("servicesRates.addons.title")}
              </h2>
              <p className="section-description">
                {t("servicesRates.addons.description")}
              </p>
            </div>

            <div className="services-grid">
              {addons.map((addon, index) => {
                const Icon = addon.icon;
                return (
                  <div
                    key={addon.key}
                    className="service-card"
                    data-aos="fade-up"
                    data-aos-delay={150 + index * 50}
                  >
                    <div className="service-icon">
                      <Icon size={24} strokeWidth={2} />
                    </div>
                    <h3 className="service-name">
                      {t(`servicesRates.addons.items.${addon.key}.name`)}
                    </h3>
                    <p className="service-price">{addon.price}</p>
                    <p className="service-description">
                      {t(`servicesRates.addons.items.${addon.key}.description`)}
                    </p>
                    <ul className="service-examples">
                      {addon.examples.map((example, idx) => (
                        <li key={idx}>{example}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Modifications Section */}
          <section className="services-section" data-aos="fade-up">
            <div className="section-header">
              <h2 className="section-title">
                {t("servicesRates.modifications.title")}
              </h2>
              <p className="section-description">
                {t("servicesRates.modifications.description")}
              </p>
            </div>

            <div className="services-grid">
              {modifications.map((mod, index) => {
                const Icon = mod.icon;
                return (
                  <div
                    key={mod.key}
                    className="service-card"
                    data-aos="fade-up"
                    data-aos-delay={150 + index * 50}
                  >
                    <div className="service-icon">
                      <Icon size={24} strokeWidth={2} />
                    </div>
                    <h3 className="service-name">
                      {t(`servicesRates.modifications.items.${mod.key}.name`)}
                    </h3>
                    <p className="service-price">{mod.price}</p>
                    <p className="service-description">
                      {t(
                        `servicesRates.modifications.items.${mod.key}.description`
                      )}
                    </p>
                    <ul className="service-examples">
                      {mod.examples.map((example, idx) => (
                        <li key={idx}>{example}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Note Section */}
          <div className="services-note" data-aos="fade-up">
            <p className="note-text">{t("servicesRates.note")}</p>
          </div>
        </div>
      </main>

      <Footer />
      <CookieBanner />
      <ScrollProgress />
    </>
  );
};

export default ServicesRates;
