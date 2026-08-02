import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import StoryMascot from "../components/ui/StoryMascot";
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

const signalScores: Record<
  (typeof rowKeys)[number],
  { them: number; me: number }
> = {
  speed: { them: 42, me: 94 },
  google: { them: 46, me: 91 },
  ai: { them: 34, me: 93 },
  mobile: { them: 51, me: 92 },
  ownership: { them: 39, me: 98 },
  timeline: { them: 44, me: 90 },
  design: { them: 48, me: 95 },
  support: { them: 40, me: 96 },
};

const ComparisonSection: React.FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const fillTriggerRef = useRef<HTMLDivElement>(null);
  const [fillStarted, setFillStarted] = useState(false);

  useEffect(() => {
    const trigger = fillTriggerRef.current;
    if (!trigger || fillStarted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFillStarted(true);
          observer.disconnect();
        }
      },
      {
        threshold: 1,
        rootMargin: "0px 0px -35% 0px",
      },
    );

    observer.observe(trigger);
    return () => observer.disconnect();
  }, [fillStarted]);

  return (
    <section
      ref={sectionRef}
      className="comparison-section"
      aria-labelledby="comparison-heading"
    >
      <div className="comparison-container">
        <motion.div
          className="comparison-intro-shell"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 id="comparison-heading" className="comparison-heading">
            {t("comparison.title")}
          </h2>
          <p className="comparison-subtitle">{t("comparison.subtitle")}</p>
          <StoryMascot
            pose="invite-point-forward"
            align="center"
            size="md"
            delay={0.1}
          />
        </motion.div>

        <motion.div
          className="comparison-impact"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="comparison-impact__scores" aria-hidden="true">
            <motion.div
              className="comparison-impact__score comparison-impact__score--others"
              initial={{ scale: 0.94, opacity: 0.5 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.45, delay: 0.16 }}
            >
              <span className="comparison-impact__score-label">
                {t("comparison.colOthers")}
              </span>
              <strong>45</strong>
            </motion.div>
            <motion.div
              className="comparison-impact__score comparison-impact__score--mine"
              initial={{ scale: 0.9, opacity: 0.5 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="comparison-impact__score-label">
                {t("comparison.colMine")}
              </span>
              <strong>94</strong>
            </motion.div>
          </div>

          <p className="comparison-impact__note">{t("comparison.note")}</p>

          <div
            ref={fillTriggerRef}
            className="comparison-impact__trigger"
            aria-hidden="true"
          />

          <div className="comparison-impact__signals" role="list">
            {rowKeys.map((key, index) => (
              <div key={key} className="comparison-signal" role="listitem">
                <span className="comparison-signal__label">
                  {t(`comparison.${key}.label`)}
                </span>
                <div className="comparison-signal__tracks" aria-hidden="true">
                  <div className="comparison-signal__track comparison-signal__track--others">
                    <motion.span
                      className="comparison-signal__fill"
                      initial={{ width: 0 }}
                      animate={
                        fillStarted
                          ? { width: `${signalScores[key].them}%` }
                          : { width: 0 }
                      }
                      transition={{
                        duration: 0.55,
                        delay: 0.18 + index * 0.05,
                      }}
                    />
                  </div>
                  <div className="comparison-signal__track comparison-signal__track--mine">
                    <motion.span
                      className="comparison-signal__fill"
                      initial={{ width: 0 }}
                      animate={
                        fillStarted
                          ? { width: `${signalScores[key].me}%` }
                          : { width: 0 }
                      }
                      transition={{
                        duration: 0.55,
                        delay: 0.24 + index * 0.05,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonSection;
