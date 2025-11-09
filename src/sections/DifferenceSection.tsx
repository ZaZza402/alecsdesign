import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { Lightbulb, Search, Handshake } from "lucide-react";
import "./DifferenceSection.css";

const DifferenceSection = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const pillars = [
    {
      key: "pillar1",
      icon: Lightbulb,
      color: "blue",
    },
    {
      key: "pillar2",
      icon: Search,
      color: "green",
    },
    {
      key: "pillar3",
      icon: Handshake,
      color: "purple",
    },
  ];

  return (
    <section className="difference-section" ref={ref}>
      <div className={`difference-container ${inView ? "animate-in" : ""}`}>
        <div className="difference-header">
          <h2 className="difference-title">{t("difference.title")}</h2>
          <p className="difference-subtitle">{t("difference.subtitle")}</p>
        </div>

        <div className="pillars-grid">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.key}
                className={`pillar-card pillar-${pillar.color}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="pillar-header">
                  <div className="pillar-icon-wrapper">
                    <Icon className="pillar-icon" size={36} strokeWidth={2} />
                  </div>
                  <h3 className="pillar-title">
                    {t(`difference.${pillar.key}.title`)}
                  </h3>
                </div>
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
