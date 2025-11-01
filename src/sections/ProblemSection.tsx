import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { Clock, TrendingUp, Target, Zap } from "lucide-react";
import "./ProblemSection.css";

const ProblemSection = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const points = [
    {
      key: "point1",
      icon: Clock,
      color: "text-blue-500",
    },
    {
      key: "point2",
      icon: TrendingUp,
      color: "text-green-500",
    },
    {
      key: "point3",
      icon: Target,
      color: "text-purple-500",
    },
    {
      key: "point4",
      icon: Zap,
      color: "text-orange-500",
    },
  ];

  return (
    <section className="problem-section" ref={ref}>
      <div className={`problem-container ${inView ? "animate-in" : ""}`}>
        <div className="problem-content">
          {/* Left side - Visual */}
          <div className="problem-visual">
            <div className="visual-card">
              <div className="icon-grid">
                {points.map((point, index) => {
                  const Icon = point.icon;
                  return (
                    <div
                      key={point.key}
                      className={`icon-wrapper icon-${index + 1} ${
                        point.color
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <Icon size={32} strokeWidth={2} />
                    </div>
                  );
                })}
                <div className="central-badge">
                  <span className="badge-text">24/7</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Text content */}
          <div className="problem-text">
            <h2 className="problem-title">{t("problem.title")}</h2>

            <div className="points-list">
              {points.map((point) => {
                const Icon = point.icon;
                return (
                  <div key={point.key} className="point-item">
                    <div className={`point-icon ${point.color}`}>
                      <Icon size={24} strokeWidth={2} />
                    </div>
                    <p className="point-text">{t(`problem.${point.key}`)}</p>
                  </div>
                );
              })}
            </div>

            <p className="problem-description">{t("problem.description")}</p>

            <a href="#contact" className="problem-cta">
              {t("problem.cta")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
