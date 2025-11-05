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

        {/* Circular graph for desktop */}
        <div className="lifecycle-circle-wrapper">
          <svg className="lifecycle-circle" viewBox="0 0 400 400">
            {/* Central circle */}
            <circle
              cx="200"
              cy="200"
              r="60"
              fill="url(#centralGradient)"
              className="central-circle"
            />
            <text
              x="200"
              y="195"
              textAnchor="middle"
              className="central-text-main"
              fill="#ffffff"
            >
              {t("developmentLifecycle.center.main")}
            </text>
            <text
              x="200"
              y="215"
              textAnchor="middle"
              className="central-text-sub"
              fill="#ffffff"
              opacity="0.9"
            >
              {t("developmentLifecycle.center.sub")}
            </text>

            {/* Gradient definitions */}
            <defs>
              <linearGradient
                id="centralGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>

          {/* Phase nodes positioned around the circle */}
          {phases.map((phase, index) => {
            const Icon = phase.icon;
            const angle = (index * 360) / phases.length - 90; // Start from top
            const radius = 140; // Distance from center
            const x = 200 + radius * Math.cos((angle * Math.PI) / 180);
            const y = 200 + radius * Math.sin((angle * Math.PI) / 180);

            return (
              <div
                key={phase.key}
                className={`lifecycle-node node-${phase.color}`}
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="node-number">{index + 1}</div>
                <div className="node-icon-wrapper">
                  <Icon className="node-icon" size={24} strokeWidth={2} />
                </div>
                <h4 className="node-title">
                  {t(`developmentLifecycle.${phase.key}.title`)}
                </h4>
                <p className="node-description">
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
