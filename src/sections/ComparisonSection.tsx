import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import "./ComparisonSection.css";

const rowKeys = [
  "speed",
  "google",
  "ai",
  "mobile",
  "ownership",
  "timeline",
  "design",
  "support",
] as const;

const ComparisonSection: React.FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="comparison-section"
      aria-labelledby="comparison-heading"
    >
      <div className="comparison-container">
        {/* Title stays put - opacity fade only, no Y movement */}
        <motion.div
          className="comparison-intro"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 id="comparison-heading" className="comparison-statement">
            <span className="comparison-statement__sentence">
              {t("comparison.stmt1a")}{" "}
              <span className="comparison-statement__break" />
              {t("comparison.stmt1b")}{" "}
              <span className="comparison-statement__accent">
                {t("comparison.stmt1accent")}
              </span>
            </span>
            <span className="comparison-statement__sentence">
              {t("comparison.stmt2a")}{" "}
              <span className="comparison-statement__break" />
              {t("comparison.stmt2b")}{" "}
              <span className="comparison-statement__accent">
                {t("comparison.stmt2accent")}
              </span>
            </span>
          </h2>
        </motion.div>

        <motion.div
          className="comparison-cards"
          role="region"
          aria-label={t("comparison.title")}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="comparison-card comparison-card--others">
            <h3 className="comparison-card__title">
              {t("comparison.colOthers")}
            </h3>
            <ul className="comparison-card__list">
              {rowKeys.map((key) => (
                <li key={key} className="comparison-card__item">
                  {t(`comparison.${key}.them`)}
                </li>
              ))}
            </ul>
          </div>

          <div className="comparison-card comparison-card--mine">
            <h3 className="comparison-card__title">
              {t("comparison.colMine")}
            </h3>
            <ul className="comparison-card__list">
              {rowKeys.map((key) => (
                <li key={key} className="comparison-card__item">
                  {t(`comparison.${key}.me`)}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonSection;
