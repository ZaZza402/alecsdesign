import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import {
  MessageCircle,
  Lightbulb,
  FileText,
  CheckCircle,
  Rocket,
  Info,
} from "lucide-react";
import "./ProcessSection.css";

const ProcessSection = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const steps = [
    { key: "step1", icon: MessageCircle, color: "blue" },
    { key: "step2", icon: Lightbulb, color: "green" },
    { key: "step3", icon: FileText, color: "purple" },
    { key: "step4", icon: CheckCircle, color: "orange" },
    { key: "step5", icon: Rocket, color: "pink" },
  ];

  return (
    <section className="process-section" ref={ref}>
      <div className={`process-container ${inView ? "animate-in" : ""}`}>
        <div className="process-header">
          <h2 className="process-title">{t("process.title")}</h2>
          <p className="process-subtitle">{t("process.subtitle")}</p>
        </div>

        <div className="process-timeline">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.key}
                className={`process-step step-${step.color}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="step-number">{index + 1}</div>
                <div className="step-icon-wrapper">
                  <Icon className="step-icon" size={28} strokeWidth={2} />
                </div>
                <h3 className="step-title">{t(`process.${step.key}.title`)}</h3>
                <p className="step-description">
                  {t(`process.${step.key}.description`)}
                </p>
                {index < steps.length - 1 && <div className="step-connector" />}
              </div>
            );
          })}
        </div>

        <div className="process-note-card">
          <div className="note-content">
            <Info className="note-icon" size={24} strokeWidth={1.5} />
            <p className="note-text">{t("process.note")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
