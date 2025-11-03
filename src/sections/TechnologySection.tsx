import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { Blocks, Code, Puzzle, Sparkles } from "lucide-react";
import "./TechnologySection.css";

const TechnologySection = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const buildingBlocks = [
    { icon: Code, color: "blue", delay: 0 },
    { icon: Puzzle, color: "green", delay: 0.1 },
    { icon: Blocks, color: "purple", delay: 0.2 },
    { icon: Sparkles, color: "orange", delay: 0.3 },
  ];

  return (
    <section className="technology-section" ref={ref}>
      <div className={`technology-container ${inView ? "animate-in" : ""}`}>
        <div className="technology-content">
          {/* Left side - Text content */}
          <div className="technology-text">
            <h2 className="technology-title">{t("technology.title")}</h2>
            <p className="technology-subtitle">{t("technology.subtitle")}</p>

            <div className="benefits-list">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <Blocks size={20} />
                </div>
                <div>
                  <p className="benefit-text">{t("technology.benefit1")}</p>
                  {t("technology.benefit1Explainer", { defaultValue: "" }) && (
                    <p className="benefit-explainer">
                      {t("technology.benefit1Explainer")}
                    </p>
                  )}
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">
                  <Code size={20} />
                </div>
                <div>
                  <p className="benefit-text">{t("technology.benefit2")}</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">
                  <Sparkles size={20} />
                </div>
                <div>
                  <p className="benefit-text">{t("technology.benefit3")}</p>
                  {t("technology.benefit3Explainer", { defaultValue: "" }) && (
                    <p className="benefit-explainer">
                      {t("technology.benefit3Explainer")}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="technology-callout">
              <p className="callout-text">{t("technology.callout")}</p>
              {t("technology.calloutExplainer", { defaultValue: "" }) && (
                <p className="callout-explainer">
                  {t("technology.calloutExplainer")}
                </p>
              )}
            </div>
          </div>

          {/* Right side - Building blocks visual */}
          <div className="technology-visual">
            <div className="blocks-container">
              {buildingBlocks.map((block, index) => {
                const Icon = block.icon;
                return (
                  <div
                    key={index}
                    className={`building-block block-${block.color}`}
                    style={{ animationDelay: `${block.delay}s` }}
                  >
                    <Icon size={28} strokeWidth={2} />
                  </div>
                );
              })}
              <div className="connection-lines">
                <svg
                  className="connection-svg"
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="50"
                    y1="50"
                    x2="150"
                    y2="50"
                    className="line line-1"
                  />
                  <line
                    x1="50"
                    y1="150"
                    x2="150"
                    y2="150"
                    className="line line-2"
                  />
                  <line
                    x1="50"
                    y1="50"
                    x2="50"
                    y2="150"
                    className="line line-3"
                  />
                  <line
                    x1="150"
                    y1="50"
                    x2="150"
                    y2="150"
                    className="line line-4"
                  />
                  <line
                    x1="50"
                    y1="50"
                    x2="150"
                    y2="150"
                    className="line line-5"
                  />
                  <line
                    x1="150"
                    y1="50"
                    x2="50"
                    y2="150"
                    className="line line-6"
                  />
                </svg>
              </div>
            </div>
            <p className="visual-label">{t("technology.visualLabel")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
