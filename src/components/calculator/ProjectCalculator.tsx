import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, ChevronRight, ChevronLeft, Check } from "lucide-react";
import { trackEvent, trackQuizEvent } from "../../utils/analytics";
import {
  calculatorConfig,
  getResultTier,
  getResultModel,
} from "../../utils/calculatorConfig";
import "./ProjectCalculator.css";

interface CalculatorState {
  answers: Record<number, string | string[]>;
  complexityScore: number;
  independenceScore: number;
}

const ProjectCalculator = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [state, setState] = useState<CalculatorState>({
    answers: {},
    complexityScore: 0,
    independenceScore: 0,
  });
  const [isCalculating, setIsCalculating] = useState(false);

  const totalSteps = calculatorConfig.length;
  const currentQuestion = calculatorConfig[currentStep];

  // Scroll to top when question changes
  useEffect(() => {
    const element = document.querySelector(".project-calculator");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentStep]);

  const handleFinish = () => {
    setIsCalculating(true);
    trackQuizEvent("complete", `${totalSteps} questions`);

    setTimeout(() => {
      const tier = getResultTier(state.complexityScore);
      const model = getResultModel(state.independenceScore);

      // Get result data from translations
      const resultData = {
        title: t(`calculator.results.tiers.${tier}`),
        description: t(`calculator.results.${model}.desc`),
        modelTitle: t(`calculator.results.${model}.title`),
        priceRange: t(`calculator.results.details.${tier}.priceRange`),
        timeline: t(`calculator.results.details.${tier}.timeline`),
        features: t(`calculator.results.details.${tier}.features`, {
          returnObjects: true,
        }) as string[],
        bestFor: t(`calculator.results.details.${tier}.bestFor`, {
          returnObjects: true,
        }) as string[],
      };

      navigate(`/${i18n.language}/quiz/results`, {
        state: {
          tier,
          model,
          scores: {
            complexity: state.complexityScore,
            independence: state.independenceScore,
          },
          resultData,
          answers: state.answers,
        },
      });
    }, 1500);
  };

  const handleOptionClick = (
    optionId: string,
    complexity: number,
    independence: number
  ) => {
    const isMulti = currentQuestion.multiSelect;

    setState((prev) => {
      const currentAnswers = prev.answers[currentQuestion.id];
      let newAnswers: string | string[];
      let newComplexity = prev.complexityScore;
      let newIndependence = prev.independenceScore;

      if (isMulti) {
        const currentList = Array.isArray(currentAnswers) ? currentAnswers : [];
        if (currentList.includes(optionId)) {
          // Deselect
          newAnswers = currentList.filter((v) => v !== optionId);
          newComplexity -= complexity;
          newIndependence -= independence;
        } else {
          // Select
          newAnswers = [...currentList, optionId];
          newComplexity += complexity;
          newIndependence += independence;
        }
      } else {
        // Single select - replace previous score if changing answer
        if (currentAnswers && typeof currentAnswers === "string") {
          const prevOption = currentQuestion.options.find(
            (o) => o.id === currentAnswers
          );
          if (prevOption) {
            newComplexity -= prevOption.complexity;
            newIndependence -= prevOption.independence;
          }
        }
        newAnswers = optionId;
        newComplexity += complexity;
        newIndependence += independence;
      }

      // Clamp scores
      newComplexity = Math.max(0, Math.min(100, newComplexity));

      return {
        answers: {
          ...prev.answers,
          [currentQuestion.id]: newAnswers,
        },
        complexityScore: newComplexity,
        independenceScore: newIndependence,
      };
    });
  };

  // Auto-advance effect
  useEffect(() => {
    const currentAnswer = state.answers[currentQuestion.id];
    const isMulti = currentQuestion.multiSelect;

    if (!isMulti && currentAnswer && !Array.isArray(currentAnswer)) {
      const timer = setTimeout(() => {
        if (currentStep < totalSteps - 1) {
          setCurrentStep((s) => {
            // Only advance if we haven't already (prevent double jumps)
            if (s === currentStep) {
              trackEvent({
                action: "calculator_progress",
                category: "Calculator",
                label: `Step ${s + 1} completed (Auto)`,
                value: Math.round(((s + 1) / totalSteps) * 100),
              });
              return s + 1;
            }
            return s;
          });
        } else {
          handleFinish();
        }
      }, 400);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.answers, currentQuestion, currentStep, totalSteps]);

  const handleNext = () => {
    const currentAnswer = state.answers[currentQuestion.id];
    if (
      !currentAnswer ||
      (Array.isArray(currentAnswer) && currentAnswer.length === 0)
    )
      return;

    trackEvent({
      action: "calculator_progress",
      category: "Calculator",
      label: `Step ${currentStep + 1} completed`,
      value: Math.round(((currentStep + 1) / totalSteps) * 100),
    });

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getMeterColor = (score: number) => {
    if (score <= 30) return "#10b981"; // Green
    if (score <= 70) return "#f59e0b"; // Orange
    return "#8b5cf6"; // Purple
  };

  if (isCalculating) {
    return (
      <div className="project-calculator">
        <div className="flex flex-col items-center justify-center h-[600px] gap-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-slate-200 border-t-black rounded-full"
          />
          <h2 className="text-xl font-bold text-slate-800">
            {t("calculator.ui.analyzing")}
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="project-calculator">
      {/* Header */}
      <div className="calculator-header">
        <div className="calculator-title">
          <Calculator size={20} />
          <span>{t("calculator.ui.title")}</span>
        </div>
        <div className="calculator-progress">
          {t("calculator.ui.step")} {currentStep + 1} {t("calculator.ui.of")}{" "}
          {totalSteps}
        </div>
      </div>

      <div className="calculator-content">
        {/* Complexity Meter */}
        <div className="complexity-meter-container">
          <div className="meter-label">
            <span>{t("calculator.ui.complexity")}</span>
            <span style={{ color: getMeterColor(state.complexityScore) }}>
              {state.complexityScore}/100
            </span>
          </div>
          <div className="meter-track">
            <motion.div
              className="meter-fill"
              style={{ backgroundColor: getMeterColor(state.complexityScore) }}
              initial={{ width: 0 }}
              animate={{ width: `${state.complexityScore}%` }}
            />
          </div>
          <div className="meter-markers">
            <span>{t("calculator.ui.simple")}</span>
            <span>{t("calculator.ui.dynamic")}</span>
            <span>{t("calculator.ui.complex")}</span>
          </div>
        </div>

        {/* Question Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            className="question-container"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="question-text">
              {t(
                `calculator.questions.${currentQuestion.translationKey}.question`
              )}
            </h2>

            <div className="options-grid">
              {currentQuestion.options.map((option) => {
                const currentAnswer = state.answers[currentQuestion.id];
                const isSelected = Array.isArray(currentAnswer)
                  ? currentAnswer.includes(option.id)
                  : currentAnswer === option.id;

                return (
                  <button
                    key={option.id}
                    className={`calc-option ${isSelected ? "selected" : ""}`}
                    onClick={() =>
                      handleOptionClick(
                        option.id,
                        option.complexity,
                        option.independence
                      )
                    }
                  >
                    <div className="option-check">
                      {isSelected && <Check size={12} />}
                    </div>
                    <div className="option-content">
                      <span className="option-label">
                        {t(
                          `calculator.questions.${currentQuestion.translationKey}.options.${option.translationKey}.label`
                        )}
                      </span>
                      <span className="option-desc">
                        {t(
                          `calculator.questions.${currentQuestion.translationKey}.options.${option.translationKey}.desc`
                        )}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="calculator-nav">
          <button
            className="nav-btn nav-btn-back"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            <ChevronLeft size={18} />
            {t("calculator.ui.back")}
          </button>

          {/* Only show Next button for multi-select or if it's the last step */}
          {(currentQuestion.multiSelect || currentStep === totalSteps - 1) && (
            <button
              className="nav-btn nav-btn-next"
              onClick={handleNext}
              disabled={
                !state.answers[currentQuestion.id] ||
                (Array.isArray(state.answers[currentQuestion.id]) &&
                  state.answers[currentQuestion.id].length === 0)
              }
            >
              {currentStep === totalSteps - 1
                ? t("calculator.ui.calculate")
                : currentQuestion.multiSelect
                ? t("calculator.ui.confirm")
                : t("calculator.ui.next")}
              <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCalculator;
