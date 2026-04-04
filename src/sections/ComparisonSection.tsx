import React, { useRef } from "react";
import {
  Zap,
  Search,
  Bot,
  Smartphone,
  Key,
  Clock,
  Layers,
  MessageCircle,
  Check,
  X,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import "./ComparisonSection.css";

const rows = [
  { key: "speed", Icon: Zap },
  { key: "google", Icon: Search },
  { key: "ai", Icon: Bot },
  { key: "mobile", Icon: Smartphone },
  { key: "ownership", Icon: Key },
  { key: "timeline", Icon: Clock },
  { key: "design", Icon: Layers },
  { key: "support", Icon: MessageCircle },
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
        {/* Title stays put — opacity fade only, no Y movement */}
        <motion.div
          className="comparison-intro"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 id="comparison-heading" className="comparison-statement">
            <span className="comparison-statement__sentence">
              I know choosing the right developer is hard{" "}
              <span className="comparison-statement__break-desktop" />
              because few{" "}
              <span className="comparison-statement__accent">truly deliver.</span>
            </span>
            <span className="comparison-statement__sentence">
              So I made it simple to compare how I work{" "}
              <span className="comparison-statement__break-desktop" />
              versus what you usually get{" "}
              <span className="comparison-statement__accent">in the market.</span>
            </span>
          </h2>
        </motion.div>

        {/* Table — slides in from the right */}
        <motion.div
          className="comparison-table-wrap"
          initial={{ opacity: 0, x: 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <table
            className="comparison-table"
            aria-label={t("comparison.title")}
          >
            <thead>
              <tr className="comparison-head-row">
                <th className="col-feature" scope="col" />
                <th className="col-others" scope="col">
                  {t("comparison.colOthers")}
                </th>
                <th className="col-mine" scope="col">
                  <span className="col-mine__badge" aria-hidden="true">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  {t("comparison.colMine")}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ key, Icon }) => (
                <tr key={key} className="comparison-row">
                  <td className="col-feature">
                    <span className="feature-inner">
                      <span className="feature-icon" aria-hidden="true">
                        <Icon size={14} strokeWidth={2.25} />
                      </span>
                      <span className="feature-label">
                        {t(`comparison.${key}.label`)}
                      </span>
                    </span>
                  </td>

                  <td className="col-others">
                    <span className="cell-x" aria-hidden="true">
                      <X size={9} strokeWidth={3} />
                    </span>
                    <span className="cell-text">
                      {t(`comparison.${key}.them`)}
                    </span>
                  </td>

                  <td className="col-mine">
                    <span className="cell-check" aria-hidden="true">
                      <Check size={9} strokeWidth={3} />
                    </span>
                    <span className="cell-text">
                      {t(`comparison.${key}.me`)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonSection;
