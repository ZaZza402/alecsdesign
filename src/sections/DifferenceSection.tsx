import { useTranslation } from "react-i18next";
import "./DifferenceSection.css";

const DifferenceSection = () => {
  const { t } = useTranslation();

  const pillars = [
    { key: "pillar1", number: "01" },
    { key: "pillar2", number: "02" },
    { key: "pillar3", number: "03" },
  ];

  return (
    <section className="difference-section">
      <div className="difference-container">
        <div
          className="difference-header"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <h2 className="difference-title">{t("difference.title")}</h2>
          <p className="difference-subtitle">{t("difference.subtitle")}</p>
        </div>

        <div className="pillars-grid">
          {pillars.map((pillar, index) => {
            return (
              <div
                key={pillar.key}
                className="pillar-card"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay={index * 150}
              >
                <span className="pillar-number">{pillar.number}</span>
                <h3 className="pillar-title">
                  {t(`difference.${pillar.key}.title`)}
                </h3>
                <p className="pillar-description">
                  {t(`difference.${pillar.key}.description`)}
                </p>
                {t(`difference.${pillar.key}.explainer`, {
                  defaultValue: "",
                }) && (
                  <p className="pillar-explainer">
                    {t(`difference.${pillar.key}.explainer`)}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DifferenceSection;
