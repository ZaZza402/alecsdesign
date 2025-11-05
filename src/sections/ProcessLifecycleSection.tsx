import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  MessageCircle,
  Lightbulb,
  FileText,
  CheckCircle,
  Rocket,
  Info,
  Search,
  Palette,
  PenTool,
  Code,
  TestTube,
} from "lucide-react";
import "./ProcessLifecycleSection.css";

const ProcessLifecycleSection = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"process" | "lifecycle">(
    "process"
  );
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const processSteps = [
    { key: "step1", icon: MessageCircle, color: "blue" },
    { key: "step2", icon: Lightbulb, color: "green" },
    { key: "step3", icon: FileText, color: "purple" },
    { key: "step4", icon: CheckCircle, color: "orange" },
    { key: "step5", icon: Rocket, color: "pink" },
  ];

  const lifecyclePhases = [
    { key: "phase1", icon: Search, color: "blue" },
    { key: "phase2", icon: FileText, color: "indigo" },
    { key: "phase3", icon: Palette, color: "purple" },
    { key: "phase4", icon: PenTool, color: "pink" },
    { key: "phase5", icon: Code, color: "orange" },
    { key: "phase6", icon: TestTube, color: "green" },
    { key: "phase7", icon: Rocket, color: "cyan" },
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

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button
            className={`tab-button ${activeTab === "process" ? "active" : ""}`}
            onClick={() => setActiveTab("process")}
            aria-selected={activeTab === "process"}
          >
            <MessageCircle size={20} strokeWidth={2} />
            <span>{t("processLifecycle.tabs.process")}</span>
          </button>
          <button
            className={`tab-button ${
              activeTab === "lifecycle" ? "active" : ""
            }`}
            onClick={() => setActiveTab("lifecycle")}
            aria-selected={activeTab === "lifecycle"}
          >
            <Code size={20} strokeWidth={2} />
            <span>{t("processLifecycle.tabs.lifecycle")}</span>
          </button>
        </div>

        {/* Process Tab Content */}
        {activeTab === "process" && (
          <div className="tab-content tab-content-process">
            <div className="steps-grid">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.key}
                    className={`step-card step-${step.color}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="step-number">{index + 1}</div>
                    <div className="step-icon-wrapper">
                      <Icon className="step-icon" size={28} strokeWidth={2} />
                    </div>
                    <h3 className="step-title">
                      {t(`process.${step.key}.title`)}
                    </h3>
                    <p className="step-description">
                      {t(`process.${step.key}.description`)}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="note-card">
              <div className="note-content">
                <Info className="note-icon" size={24} strokeWidth={1.5} />
                <p className="note-text">{t("process.note")}</p>
              </div>
            </div>
          </div>
        )}

        {/* Lifecycle Tab Content */}
        {activeTab === "lifecycle" && (
          <div className="tab-content tab-content-lifecycle">
            <div className="phases-grid">
              {lifecyclePhases.map((phase, index) => {
                const Icon = phase.icon;
                return (
                  <div
                    key={phase.key}
                    className={`phase-card phase-${phase.color}`}
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    <div className="phase-number">{index + 1}</div>
                    <div className="phase-icon-wrapper">
                      <Icon className="phase-icon" size={28} strokeWidth={2} />
                    </div>
                    <h4 className="phase-title">
                      {t(`developmentLifecycle.${phase.key}.title`)}
                    </h4>
                    <p className="phase-description">
                      {t(`developmentLifecycle.${phase.key}.description`)}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="lifecycle-cta">
              <p className="cta-text">{t("developmentLifecycle.cta")}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProcessLifecycleSection;
