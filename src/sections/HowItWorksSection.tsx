import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import StoryMascot from "../components/ui/StoryMascot";
import "./HowItWorksSection.css";

const HowItWorksSection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-90px" });

  const steps = [{ key: "step1" }, { key: "step2" }, { key: "step3" }];

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="how-it-works-section"
    >
      <div className="how-it-works-container">
        <motion.div
          className="how-it-works-header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 id="how-it-works-heading" className="how-it-works-title">
            {t("howItWorks.title")}
          </h2>
          <StoryMascot
            pose="problem-solving-think-pose"
            align="left"
            size="md"
            delay={0.08}
          />
          <p className="how-it-works-subtitle">{t("howItWorks.subtitle")}</p>
        </motion.div>

        <div className="steps-list">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={step.key}
                className={`step-item ${isEven ? "step-left" : "step-right"}`}
                initial={{ opacity: 0, x: isEven ? -24 : 24, y: 12 }}
                animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{
                  duration: 0.55,
                  delay: 0.14 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="step-number-placeholder">
                  {(index + 1).toString().padStart(2, "0")}
                </div>
                <div className="step-content">
                  <h3 className="step-title">
                    {t(`howItWorks.${step.key}.title`)}
                  </h3>
                  <p className="step-description">
                    {t(`howItWorks.${step.key}.description`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
