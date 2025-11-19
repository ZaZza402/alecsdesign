import { useTranslation } from "react-i18next";
import "./HowItWorksSection.css";

const HowItWorksSection = () => {
  const { t } = useTranslation();

  const steps = [
    { key: "step1" },
    { key: "step2" },
    { key: "step3" },
    { key: "step4" },
  ];

  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="how-it-works-container">
        <div
          className="how-it-works-header"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <h2 className="how-it-works-title">{t("howItWorks.title")}</h2>
          <p className="how-it-works-subtitle">{t("howItWorks.subtitle")}</p>
        </div>

        <div className="steps-list">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={step.key}
                className={`step-item ${isEven ? "step-left" : "step-right"}`}
                data-aos={isEven ? "fade-right" : "fade-left"}
                data-aos-duration="800"
                data-aos-delay={index * 100}
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
