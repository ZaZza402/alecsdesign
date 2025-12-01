import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { Check, ShoppingCart, Calendar, Globe, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import {
  trackCTAClick,
  trackPricingInterest,
  trackSectionView,
} from "../utils/analytics";
import "./PricingSection.css";

interface Tier {
  name: string;
  description: string;
  features: string[];
  management: {
    title: string;
    description: string;
  };
  examples: string;
}

interface Addon {
  icon: string;
  name: string;
  description: string;
}
const PricingSection = () => {
  const { t, i18n } = useTranslation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  // State to toggle between Buy & Own and Subscribe & Relax
  const [activeModel, setActiveModel] = useState<"buy" | "subscribe">("buy");

  // Helper to get proper route based on language
  const getLocalizedRoute = (path: string) => {
    const lang = i18n.language;
    return lang === "en" ? path : `/${lang}${path}`;
  };

  // Track section view
  useEffect(() => {
    if (inView) {
      trackSectionView("Pricing Section");
    }
  }, [inView]);

  const buyTiers = t("pricing.buyModel.tiers", {
    returnObjects: true,
  }) as Tier[];

  const subscribeFeatures = t("pricing.subscribeModel.features", {
    returnObjects: true,
  }) as string[];

  const subscribeOwnership = t("pricing.subscribeModel.ownership.items", {
    returnObjects: true,
  }) as string[];

  const addons = t("pricing.addons.items", {
    returnObjects: true,
  }) as Addon[];

  const getAddonIcon = (iconName: string) => {
    switch (iconName) {
      case "🛒":
        return <ShoppingCart size={32} />;
      case "📅":
        return <Calendar size={32} />;
      case "🌍":
        return <Globe size={32} />;
      case "⚡":
        return <Zap size={32} />;
      default:
        return <Zap size={32} />;
    }
  };

  return (
    <section id="pricing" className="pricing-section" ref={ref}>
      <div className={`pricing-container ${inView ? "animate-in" : ""}`}>
        {/* Basic HTML Website - Separate Service */}
        <div className="basic-website-section" data-aos="fade-up">
          <div className="basic-website-card">
            <span className="notice-badge">
              {t("pricing.basicWebsite.badge")}
            </span>
            <h3 className="notice-title">{t("pricing.basicWebsite.title")}</h3>
            <p className="notice-description">
              {t("pricing.basicWebsite.description")}
            </p>
          </div>
        </div>

        <div className="pricing-divider">
          <span className="divider-text">{t("pricing.advancedSites")}</span>
        </div>

        <div className="pricing-header">
          <h2 className="pricing-title">{t("pricing.title")}</h2>
          <p className="pricing-subtitle">{t("pricing.subtitle")}</p>
        </div>

        {/* Model Toggle Tabs */}
        <div className="model-toggle">
          <button
            className={`toggle-btn ${activeModel === "buy" ? "active" : ""}`}
            onClick={() => setActiveModel("buy")}
          >
            <ShoppingCart size={20} />
            {t("pricing.buyModel.title")}
          </button>
          <button
            className={`toggle-btn ${
              activeModel === "subscribe" ? "active" : ""
            }`}
            onClick={() => setActiveModel("subscribe")}
          >
            <Calendar size={20} />
            {t("pricing.subscribeModel.title")}
          </button>
        </div>

        {/* Buy & Own Model */}
        {activeModel === "buy" && (
          <div className="buy-model-section">
            <div className="model-badge">{t("pricing.buyModel.badge")}</div>
            <h3 className="model-title">{t("pricing.buyModel.title")}</h3>
            <p className="model-description">
              {t("pricing.buyModel.description")}
            </p>

            <div className="tiers-grid">
              {buyTiers.map((tier, index) => (
                <div key={index} className="tier-card">
                  <h4 className="tier-name">{tier.name}</h4>
                  <p className="tier-description">{tier.description}</p>
                  <ul className="tier-features">
                    {tier.features.map((feature, idx) => (
                      <li key={idx}>
                        <Check size={16} /> {feature}
                      </li>
                    ))}
                  </ul>

                  {tier.management && (
                    <div className="management-plan">
                      <h5 className="management-title">
                        {tier.management.title}
                      </h5>
                      <p className="management-description">
                        {tier.management.description}
                      </p>
                    </div>
                  )}

                  <p className="tier-examples">{tier.examples}</p>
                </div>
              ))}
            </div>

            <p className="buy-note">{t("pricing.buyModel.note")}</p>
            <button
              onClick={() => {
                trackCTAClick("Get Started", "Buy & Own Model");
                trackPricingInterest("buy");
                const section = document.getElementById("contact");
                section?.scrollIntoView({ behavior: "smooth" });
              }}
              className="model-cta"
            >
              {t("pricing.buyModel.cta")}
            </button>
          </div>
        )}

        {/* Subscribe & Relax Model */}
        {activeModel === "subscribe" && (
          <div className="subscribe-model-section">
            <div className="model-badge">
              {t("pricing.subscribeModel.badge")}
            </div>
            <h3 className="model-title">{t("pricing.subscribeModel.title")}</h3>

            <p className="subscribe-description">
              {t("pricing.subscribeModel.description")}
            </p>

            <ul className="subscribe-features">
              {subscribeFeatures.map((feature, index) => (
                <li key={index}>
                  <Check size={20} /> {feature}
                </li>
              ))}
            </ul>

            <div className="ownership-info">
              <h4>{t("pricing.subscribeModel.ownership.title")}</h4>
              <ul>
                {subscribeOwnership.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="cancellation-info">
              <h4>{t("pricing.subscribeModel.cancellation.title")}</h4>
              <p>{t("pricing.subscribeModel.cancellation.details")}</p>
            </div>

            <button
              onClick={() => {
                trackCTAClick("Get Started", "Subscribe & Relax Model");
                trackPricingInterest("subscribe");
                const section = document.getElementById("contact");
                section?.scrollIntoView({ behavior: "smooth" });
              }}
              className="model-cta"
            >
              {t("pricing.subscribeModel.cta")}
            </button>
          </div>
        )}

        {/* Add-Ons Section */}
        <div className="addons-section">
          <h3 className="addons-title">{t("pricing.addons.title")}</h3>
          <p className="addons-subtitle">{t("pricing.addons.subtitle")}</p>

          <div className="addons-grid">
            {addons.map((addon, index) => (
              <div key={index} className="addon-card">
                <div className="addon-header">
                  <div className="addon-icon">{getAddonIcon(addon.icon)}</div>
                  <h4 className="addon-name">{addon.name}</h4>
                </div>
                <p className="addon-description">{addon.description}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              trackCTAClick("Discuss Add-ons", "Pricing Section");
              const section = document.getElementById("contact");
              section?.scrollIntoView({ behavior: "smooth" });
            }}
            className="addons-cta"
          >
            {t("pricing.addons.cta")}
          </button>
        </div>

        {/* Decision Quiz CTA */}
        <div className="decision-quiz-cta">
          <h3>{t("pricing.decisionQuiz.title")}</h3>
          <p>{t("pricing.decisionQuiz.subtitle")}</p>
          <Link
            to={getLocalizedRoute("/quiz")}
            className="quiz-button"
            onClick={() => trackCTAClick("Take the Quiz", "Pricing Section")}
          >
            {t("pricing.decisionQuiz.cta")}
          </Link>
        </div>

        {/* Pitch */}
        <p className="pricing-pitch">{t("pricing.pitch")}</p>
      </div>
    </section>
  );
};

export default PricingSection;
