import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { Shield, Gauge, Wrench, TrendingUp } from "lucide-react";
import "./WhyNotWordPressSection.css";

const WhyNotWordPressSection = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const comparison = [
    {
      icon: Gauge,
      title: t("whyNotWordPress.performance.title"),
      wordpress: t("whyNotWordPress.performance.wordpress"),
      myStack: t("whyNotWordPress.performance.myStack"),
      color: "blue",
    },
    {
      icon: Shield,
      title: t("whyNotWordPress.security.title"),
      wordpress: t("whyNotWordPress.security.wordpress"),
      myStack: t("whyNotWordPress.security.myStack"),
      color: "green",
    },
    {
      icon: Wrench,
      title: t("whyNotWordPress.maintenance.title"),
      wordpress: t("whyNotWordPress.maintenance.wordpress"),
      myStack: t("whyNotWordPress.maintenance.myStack"),
      color: "purple",
    },
    {
      icon: TrendingUp,
      title: t("whyNotWordPress.scalability.title"),
      wordpress: t("whyNotWordPress.scalability.wordpress"),
      myStack: t("whyNotWordPress.scalability.myStack"),
      color: "orange",
    },
  ];

  return (
    <section className="why-not-wordpress-section" ref={ref}>
      <div
        className={`why-not-wordpress-container ${inView ? "animate-in" : ""}`}
      >
        {/* Header with quote */}
        <div className="section-header">
          <h2 className="section-title">{t("whyNotWordPress.title")}</h2>
          <blockquote className="section-quote">
            "{t("whyNotWordPress.quote")}"
          </blockquote>
          <p className="section-subtitle">{t("whyNotWordPress.subtitle")}</p>
        </div>

        {/* Comparison Grid */}
        <div className="comparison-grid">
          {comparison.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`comparison-card comparison-${item.color}`}
              >
                <div className="comparison-icon">
                  <Icon size={28} strokeWidth={2} />
                </div>
                <h3 className="comparison-title">{item.title}</h3>
                <div className="comparison-content">
                  <div className="comparison-side wordpress-side">
                    <span className="comparison-label">
                      {t("whyNotWordPress.wpLabel")}
                    </span>
                    <p className="comparison-text">{item.wordpress}</p>
                  </div>
                  <div className="comparison-divider"></div>
                  <div className="comparison-side mystack-side">
                    <span className="comparison-label">
                      {t("whyNotWordPress.myStackLabel")}
                    </span>
                    <p className="comparison-text">{item.myStack}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="bottom-note">
          <p className="note-text">{t("whyNotWordPress.bottomNote")}</p>
        </div>
      </div>
    </section>
  );
};

export default WhyNotWordPressSection;
