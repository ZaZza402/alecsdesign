import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import CookieBanner from "../components/ui/CookieBanner";
import ScrollProgress from "../components/ui/ScrollProgress";
import MetallicBackground from "../components/ui/backgrounds/MetallicBackground";
import { trackCTAClick, trackEvent } from "../utils/analytics";
import "./QuizPage.css";

interface QuizResults {
  complexity: "simple" | "moderate" | "complex" | "advanced" | "enterprise";
  timeline: "fast" | "standard" | "extended" | "long" | "custom";
  recommendedModel:
    | "subscribe"
    | "buy-essentials"
    | "buy-growth"
    | "buy-custom"
    | "consultation";
  estimatedPrice: { min: number; max: number };
  features: string[];
  addons: string[];
  totalQuestions: number;
}

const QuizResults = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results as QuizResults;

  useEffect(() => {
    // Redirect to quiz if no results
    if (!results) {
      navigate(`/${i18n.language}/quiz`);
    } else {
      // Track results view
      trackEvent({
        action: "quiz_results_view",
        category: "Quiz",
        label: `${results.recommendedModel} - €${results.estimatedPrice.min}-${results.estimatedPrice.max}`,
      });
    }
  }, [results, navigate, i18n.language]);

  if (!results) {
    return null;
  }

  const modelData = t(`quiz.results.models.${results.recommendedModel}`, {
    returnObjects: true,
  }) as {
    title: string;
    price: string;
    description: string;
    benefits: string[];
  };
  const complexityLabel = t(`quiz.results.complexity.${results.complexity}`);
  const timelineLabel = t(`quiz.results.timeline.${results.timeline}`);

  const handleContactClick = () => {
    trackCTAClick("Contact from Quiz Results", "Quiz Results Page");
    // Scroll to contact section
    navigate(`/${i18n.language}/#contact`);
  };

  const handlePricingClick = () => {
    trackCTAClick("View Pricing Details", "Quiz Results Page");
    navigate(`/${i18n.language}/#pricing`);
  };

  const handleRestart = () => {
    trackEvent({
      action: "quiz_restart",
      category: "Quiz",
      label: "From Results Page",
    });
    navigate(`/${i18n.language}/quiz`);
  };

  return (
    <>
      <Header />
      <MetallicBackground />
      <div className="quiz-results-page">
        <div className="quiz-results-container">
          {/* Header */}
          <motion.div
            className="results-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1>{t("quiz.results.title")}</h1>
            <p className="results-subtitle">{t("quiz.results.subtitle")}</p>
          </motion.div>

          {/* Overview Section */}
          <motion.div
            className="results-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2>{t("quiz.results.sections.overview.title")}</h2>
            <div className="results-overview-grid">
              <div className="overview-item">
                <span className="overview-label">
                  {t("quiz.results.sections.overview.complexity")}
                </span>
                <span
                  className={`overview-value complexity-${results.complexity}`}
                >
                  {complexityLabel}
                </span>
              </div>
              <div className="overview-item">
                <span className="overview-label">
                  {t("quiz.results.sections.overview.timeline")}
                </span>
                <span className="overview-value">{timelineLabel}</span>
              </div>
              <div className="overview-item full-width">
                <span className="overview-label">
                  {t("quiz.results.sections.overview.model")}
                </span>
                <span className="overview-value model-recommended">
                  {modelData.title}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Recommended Model Section */}
          <motion.div
            className="results-section model-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="model-card">
              <h3>{modelData.title}</h3>
              <div className="model-price">{modelData.price}</div>
              <p className="model-description">{modelData.description}</p>

              <div className="model-benefits">
                {modelData.benefits.map((benefit: string, index: number) => (
                  <div key={index} className="benefit-item">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle
                        cx="10"
                        cy="10"
                        r="9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M6 10L9 13L14 7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Price Breakdown Section */}
          {results.recommendedModel !== "consultation" &&
            results.estimatedPrice.min > 0 && (
              <motion.div
                className="results-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2>{t("quiz.results.sections.breakdown.title")}</h2>
                <div className="price-breakdown">
                  <div className="breakdown-item">
                    <span>
                      {t("quiz.results.sections.breakdown.basePrice")}
                    </span>
                    <span className="breakdown-value">
                      €{results.estimatedPrice.min} - €
                      {results.estimatedPrice.max}
                    </span>
                  </div>

                  {results.addons.length > 0 && (
                    <div className="breakdown-addons">
                      <strong>
                        {t("quiz.results.sections.breakdown.features")}
                      </strong>
                      <ul>
                        {results.addons.map((addon, index) => (
                          <li key={index}>{addon}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

          {/* Features Included */}
          {results.features.length > 0 && (
            <motion.div
              className="results-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2>{t("quiz.results.sections.featuresIncluded.title")}</h2>
              <div className="features-grid">
                {results.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <svg width="16" height="16" viewBox="0 0 16 16">
                      <path
                        d="M13 4L6 11L3 8"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Recommendations Section */}
          <motion.div
            className="results-section recommendations-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2>{t("quiz.results.sections.recommendations.title")}</h2>

            <div className="recommendation-card">
              <h3>{t("quiz.results.sections.recommendations.whyThisModel")}</h3>
              <p>
                {t(
                  `quiz.results.sections.recommendations.explanations.${results.recommendedModel}`
                )}
              </p>
            </div>

            <div className="recommendation-card">
              <h3>{t("quiz.results.sections.recommendations.nextSteps")}</h3>
              <ol>
                {(
                  t("quiz.results.sections.recommendations.steps", {
                    returnObjects: true,
                  }) as string[]
                ).map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          </motion.div>

          {/* Disclaimer */}
          <motion.div
            className="results-disclaimer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p>{t("quiz.results.disclaimer")}</p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="results-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <button
              className="cta-button cta-primary"
              onClick={handleContactClick}
            >
              {t("quiz.results.cta.primary")}
            </button>
            <button
              className="cta-button cta-secondary"
              onClick={handlePricingClick}
            >
              {t("quiz.results.cta.secondary")}
            </button>
            <button className="cta-button cta-restart" onClick={handleRestart}>
              {t("quiz.results.cta.restart")}
            </button>
          </motion.div>

          {/* Back to Home */}
          <motion.div
            className="results-back"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Link to={`/${i18n.language}`}>{t("legal.backToHome")}</Link>
          </motion.div>
        </div>
      </div>
      <Footer />
      <CookieBanner />
      <ScrollProgress />
    </>
  );
};

export default QuizResults;
