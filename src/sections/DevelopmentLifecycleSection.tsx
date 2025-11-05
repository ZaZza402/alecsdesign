import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import {
  Search,
  FileText,
  Palette,
  PenTool,
  Code,
  TestTube,
  Rocket,
} from "lucide-react";
import "./DevelopmentLifecycleSection.css";

const DevelopmentLifecycleSection = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const phases = [
    { key: "phase1", icon: Search, color: "blue" },
    { key: "phase2", icon: FileText, color: "indigo" },
    { key: "phase3", icon: Palette, color: "purple" },
    { key: "phase4", icon: PenTool, color: "pink" },
    { key: "phase5", icon: Code, color: "orange" },
    { key: "phase6", icon: TestTube, color: "green" },
    { key: "phase7", icon: Rocket, color: "cyan" },
  ];

  return (
    <section className="dev-lifecycle-section" ref={ref}>
      <div className={`dev-lifecycle-container ${inView ? "animate-in" : ""}`}>
        <div className="dev-lifecycle-header">
          <h2 className="dev-lifecycle-title">
            {t("developmentLifecycle.title")}
          </h2>
          <p className="dev-lifecycle-subtitle">
            {t("developmentLifecycle.subtitle")}
          </p>
        </div>

        {/* Desktop grid view */}
        <div className="lifecycle-desktop-grid">
          {phases.map((phase, index) => {
            const Icon = phase.icon;
            return (
              <div
                key={phase.key}
                className={`lifecycle-desktop-card card-${phase.color}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="desktop-card-number">{index + 1}</div>
                <div className={`desktop-card-icon-wrapper icon-${phase.color}`}>
                  <Icon className="desktop-card-icon" size={28} strokeWidth={2} />
                </div>
                <h4 className="desktop-card-title">
                  {t(`developmentLifecycle.${phase.key}.title`)}
                </h4>
                <p className="desktop-card-description">
                  {t(`developmentLifecycle.${phase.key}.description`)}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mobile timeline view */}
        <div className="lifecycle-timeline-mobile">
          {phases.map((phase, index) => {
            const Icon = phase.icon;
            return (
              <div
                key={phase.key}
                className={`timeline-phase phase-${phase.color}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="timeline-marker">
                  <div className="marker-number">{index + 1}</div>
                  <div className={`marker-icon-wrapper icon-${phase.color}`}>
                    <Icon className="marker-icon" size={24} strokeWidth={2} />
                  </div>
                </div>
                <div className="timeline-content">
                  <h4 className="timeline-title">
                    {t(`developmentLifecycle.${phase.key}.title`)}
                  </h4>
                  <p className="timeline-description">
                    {t(`developmentLifecycle.${phase.key}.description`)}
                  </p>
                </div>
                {index < phases.length - 1 && (
                  <div className="timeline-connector" />
                )}
              </div>
            );
          })}
        </div>

        <div className="lifecycle-cta">
          <p className="cta-text">{t("developmentLifecycle.cta")}</p>
        </div>
      </div>
    </section>
  );
};

export default DevelopmentLifecycleSection;
