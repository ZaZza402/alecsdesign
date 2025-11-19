import { useEffect } from "react";
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
  priceRange: string;
  description: string;
  features: string[];
  management: {
    price: string;
    label: string;
    features: string[];
  };
  examples: string;
}

interface Addon {
  icon: string;
  name: string;
  buyPrice: string;
  subscribePrice: string;
  description: string;
}

const PricingSection = () => {
  const { t, i18n } = useTranslation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

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
            <div className="notice-pricing">
              <div className="notice-price-item">
                <span className="price-label">
                  {t("pricing.basicWebsite.setupLabel")}
                </span>
                <span className="price-value">€150</span>
              </div>
              <div className="notice-price-item">
                <span className="price-label">
                  {t("pricing.basicWebsite.annualLabel")}
                </span>
                <span className="price-value">€120/year</span>
              </div>
            </div>
            <p className="notice-footer">{t("pricing.basicWebsite.note")}</p>
          </div>
        </div>

        <div className="pricing-divider">
          <span className="divider-text">{t("pricing.advancedSites")}</span>
        </div>

        <div className="pricing-header">
          <h2 className="pricing-title">{t("pricing.title")}</h2>
          <p className="pricing-subtitle">{t("pricing.subtitle")}</p>
        </div>

        {/* Buy & Own Model */}
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
                <p className="tier-price">{tier.priceRange}</p>
                <p className="tier-description">{tier.description}</p>

                <ul className="tier-features">
                  {tier.features.map((feature, idx) => (
                    <li key={idx}>
                      <Check size={16} /> {feature}
                    </li>
                  ))}
                </ul>

                <div className="management-plan">
                  <div className="management-header">
                    <span className="management-price">
                      {tier.management.price}
                    </span>
                    <span className="management-label">
                      {tier.management.label}
                    </span>
                  </div>
                  <ul className="management-features">
                    {tier.management.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>

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

        {/* Subscribe & Relax Model */}
        <div className="subscribe-model-section">
          <div className="model-badge">{t("pricing.subscribeModel.badge")}</div>
          <h3 className="model-title">{t("pricing.subscribeModel.title")}</h3>

          <div className="subscribe-pricing">
            <span className="subscribe-price">
              {t("pricing.subscribeModel.price")}{" "}
              <span className="price-label">
                {t("pricing.subscribeModel.upfront")}
              </span>
            </span>
            <span className="subscribe-annual">
              {t("pricing.subscribeModel.annual")}
            </span>
          </div>

          <p className="subscribe-commitment">
            {t("pricing.subscribeModel.commitment")}
          </p>
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
                <div className="addon-pricing">
                  <p className="addon-buy-price">Buy: {addon.buyPrice}</p>
                  <p className="addon-subscribe-price">
                    Subscribe: {addon.subscribePrice}
                  </p>
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
            to={`/${i18n.language}/quiz`}
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
