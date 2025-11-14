import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import {
  MessageCircle,
  Lightbulb,
  Rocket,
  Palette,
  Code,
  TestTube,
} from "lucide-react";
import "./ProcessLifecycleSection.css";

const ProcessLifecycleSection = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Unified journey from contact to launch
  const journeySteps = [
    { key: "discovery", icon: MessageCircle, translationKey: "process.step1" },
    { key: "strategy", icon: Lightbulb, translationKey: "process.step2" },
    {
      key: "design",
      icon: Palette,
      translationKey: "developmentLifecycle.phase3",
    },
    {
      key: "development",
      icon: Code,
      translationKey: "developmentLifecycle.phase5",
    },
    {
      key: "testing",
      icon: TestTube,
      translationKey: "developmentLifecycle.phase6",
    },
    { key: "launch", icon: Rocket, translationKey: "process.step5" },
  ];

  return (
    <section className="process-lifecycle-section" ref={ref}>
      <div
        className={`process-lifecycle-container ${inView ? "animate-in" : ""}`}
      >
        <div className="process-lifecycle-header">
          <h2 className="process-lifecycle-title">
            {t("processLifecycle.title")}
          </h2>
          <p className="process-lifecycle-subtitle">
            {t("processLifecycle.subtitle")}
          </p>
        </div>

        <div className="journey-timeline">
          {journeySteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.key} className="journey-item">
                <div className="journey-marker">
                  <div className="journey-number">{index + 1}</div>
                </div>
                <div className="journey-content">
                  <div className="journey-icon">
                    <Icon size={24} strokeWidth={2} />
                  </div>
                  <div className="journey-text">
                    <h3 className="journey-title">
                      {t(`${step.translationKey}.title`)}
                    </h3>
                    <p className="journey-description">
                      {t(`${step.translationKey}.description`)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessLifecycleSection;
