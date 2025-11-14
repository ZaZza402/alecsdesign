import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Clock, Zap, Rocket, Shield, Sparkles, Headphones } from "lucide-react";
import { SEO } from "../utils/seo";
import "./ServicesRates.css";

const ServicesRates = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1, // Reduced from 0.2 to trigger earlier
    initialInView: true, // Start with content visible on load
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const smallUpdates = [
    { key: "text", icon: Zap },
    { key: "form", icon: Zap },
    { key: "styling", icon: Zap },
  ];

  const mediumTasks = [
    { key: "page", icon: Clock },
    { key: "section", icon: Clock },
    { key: "blog", icon: Clock },
  ];

  const largeFeatures = [
    { key: "ecommerce", icon: Rocket },
    { key: "multilang", icon: Rocket },
    { key: "custom", icon: Rocket },
  ];

  const retainerPackages = [
    { key: "basic", icon: Shield },
    { key: "business", icon: Sparkles },
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <SEO
        title={t("servicesRates.seo.title")}
        description={t("servicesRates.seo.description")}
        keywords={t("servicesRates.seo.keywords")}
        ogType="website"
      />

      <main className="services-rates-page" role="main">
        <div
          className={`services-rates-container ${inView ? "animate-in" : ""}`}
          ref={ref}
        >
          {/* Header */}
          <div className="services-header">
            <h1 className="services-title">{t("servicesRates.title")}</h1>
            <p className="services-subtitle">{t("servicesRates.subtitle")}</p>
          </div>

          {/* Small Updates */}
          <section className="pricing-category">
            <div className="category-header">
              <Zap className="category-icon" size={32} strokeWidth={2} />
              <h2 className="category-title">
                {t("servicesRates.categories.small.title")}
              </h2>
              <p className="category-subtitle">
                {t("servicesRates.categories.small.subtitle")}
              </p>
            </div>
            <div className="services-grid">
              {smallUpdates.map((item, index) => (
                <div
                  key={item.key}
                  className="service-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="service-name">
                    {t(`servicesRates.services.small.${item.key}.name`)}
                  </h3>
                  <p className="service-price">
                    {t(`servicesRates.services.small.${item.key}.price`)}
                  </p>
                  <p className="service-description">
                    {t(`servicesRates.services.small.${item.key}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Medium Tasks */}
          <section className="pricing-category">
            <div className="category-header">
              <Clock className="category-icon" size={32} strokeWidth={2} />
              <h2 className="category-title">
                {t("servicesRates.categories.medium.title")}
              </h2>
              <p className="category-subtitle">
                {t("servicesRates.categories.medium.subtitle")}
              </p>
            </div>
            <div className="services-grid">
              {mediumTasks.map((item, index) => (
                <div
                  key={item.key}
                  className="service-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="service-name">
                    {t(`servicesRates.services.medium.${item.key}.name`)}
                  </h3>
                  <p className="service-price">
                    {t(`servicesRates.services.medium.${item.key}.price`)}
                  </p>
                  <p className="service-description">
                    {t(`servicesRates.services.medium.${item.key}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Large Features */}
          <section className="pricing-category">
            <div className="category-header">
              <Rocket className="category-icon" size={32} strokeWidth={2} />
              <h2 className="category-title">
                {t("servicesRates.categories.large.title")}
              </h2>
              <p className="category-subtitle">
                {t("servicesRates.categories.large.subtitle")}
              </p>
            </div>
            <div className="services-grid">
              {largeFeatures.map((item, index) => (
                <div
                  key={item.key}
                  className="service-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="service-name">
                    {t(`servicesRates.services.large.${item.key}.name`)}
                  </h3>
                  <p className="service-price">
                    {t(`servicesRates.services.large.${item.key}.price`)}
                  </p>
                  <p className="service-description">
                    {t(`servicesRates.services.large.${item.key}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Retainer Packages */}
          <section className="pricing-category retainer-section">
            <div className="category-header">
              <Headphones className="category-icon" size={32} strokeWidth={2} />
              <h2 className="category-title">
                {t("servicesRates.categories.retainer.title")}
              </h2>
              <p className="category-subtitle">
                {t("servicesRates.categories.retainer.subtitle")}
              </p>
            </div>
            <div className="retainer-grid">
              {retainerPackages.map((pkg, index) => {
                const Icon = pkg.icon;
                return (
                  <div
                    key={pkg.key}
                    className={`retainer-card ${
                      pkg.key === "business" ? "featured" : ""
                    }`}
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    {pkg.key === "business" && (
                      <div className="featured-badge">
                        {t("servicesRates.retainer.popular")}
                      </div>
                    )}
                    <div className="retainer-header">
                      <Icon
                        className="retainer-icon"
                        size={40}
                        strokeWidth={2}
                      />
                      <h3 className="retainer-name">
                        {t(`servicesRates.retainer.${pkg.key}.name`)}
                      </h3>
                      <p className="retainer-price">
                        {t(`servicesRates.retainer.${pkg.key}.price`)}
                      </p>
                    </div>
                    <ul className="retainer-features">
                      {(
                        t(`servicesRates.retainer.${pkg.key}.features`, {
                          returnObjects: true,
                        }) as string[]
                      ).map((feature: string, idx: number) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>

          {/* CTA Note */}
          <div className="services-cta">
            <p className="cta-text">{t("servicesRates.cta")}</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default ServicesRates;
