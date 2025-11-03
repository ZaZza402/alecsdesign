import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Check, FileText, Target, Rocket } from "lucide-react";
import "./PricingSection.css";

const PricingSection = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const examples = [
    { key: "simple", icon: FileText },
    { key: "medium", icon: Target },
    { key: "complex", icon: Rocket },
  ];

  return (
    <section className="pricing-section" ref={ref}>
      <div className={`pricing-container ${inView ? "animate-in" : ""}`}>
        <div className="pricing-header">
          <h2 className="pricing-title">{t("pricing.title")}</h2>
          <p className="pricing-subtitle">{t("pricing.subtitle")}</p>
        </div>

        <div className="pricing-range-card">
          <div className="range-header">
            <span className="range-label">{t("pricing.rangeLabel")}</span>
            <div className="range-values">
              <span className="range-min">€150</span>
              <span className="range-separator">-</span>
              <span className="range-max">€2000+</span>
            </div>
          </div>
          <p className="range-note">{t("pricing.rangeNote")}</p>
        </div>

        <div className="examples-grid">
          {examples.map((example, index) => {
            const Icon = example.icon;
            return (
              <div
                key={example.key}
                className="example-card"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="example-icon">
                  <Icon size={48} strokeWidth={1.5} />
                </div>
                <h3 className="example-title">
                  {t(`pricing.examples.${example.key}.title`)}
                </h3>
                <p className="example-price">
                  {t(`pricing.examples.${example.key}.price`)}
                </p>
                <ul className="example-features">
                  {(
                    t(`pricing.examples.${example.key}.features`, {
                      returnObjects: true,
                    }) as string[]
                  ).map((feature: string, featureIndex: number) => {
                    // Map feature names to explainer keys
                    const explainerMap: Record<string, string> = {
                      "Design responsive": "responsive",
                      "Optimizare SEO de bază": "seo",
                      "Responsive design": "responsive",
                      "Basic SEO optimization": "seo",
                      "Design responsivo": "responsive",
                      "Ottimizzazione SEO di base": "seo",
                      "Integrări cu terțe părți": "integrations",
                      "Third-party integrations": "integrations",
                      "Integrazioni di terze parti": "integrations",
                      "SEO avansat și analytics": "analytics",
                      "Advanced SEO and analytics": "analytics",
                      "SEO avanzato e analytics": "analytics",
                      "Sistem de management conținut": "cms",
                      "Content management system": "cms",
                      "Sistema di gestione contenuti": "cms",
                      "Bază de date și autentificare": "database",
                      "Database and authentication": "database",
                      "Database e autenticazione": "database",
                    };

                    const explainerKey = explainerMap[feature];
                    const explainerPath = `pricing.examples.${example.key}.explainers.${explainerKey}`;
                    const explainerText = explainerKey
                      ? t(explainerPath, { defaultValue: "" })
                      : "";

                    return (
                      <li key={featureIndex} className="feature-item">
                        <Check size={16} className="feature-check" />
                        <div className="feature-content">
                          <span>{feature}</span>
                          {explainerText && (
                            <span className="feature-explainer">
                              {explainerText}
                            </span>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="pricing-cta-card">
          <p className="cta-text">{t("pricing.ctaText")}</p>
          <a href="#contact" className="pricing-cta-button">
            <span>{t("pricing.cta")}</span>
            <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
