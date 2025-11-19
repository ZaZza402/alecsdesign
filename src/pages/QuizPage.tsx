import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import CookieBanner from "../components/ui/CookieBanner";
import ScrollProgress from "../components/ui/ScrollProgress";
import MetallicBackground from "../components/ui/backgrounds/MetallicBackground";
import { trackQuizEvent, trackEvent } from "../utils/analytics";
import "./QuizPage.css";

interface QuizAnswer {
  questionId: string;
  value: string | string[];
}

interface QuizOption {
  value: string;
  label: string;
  description: string;
  impact: string;
  priceImpact: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  subtitle: string;
  type: "single" | "multiple";
  required: boolean;
  conditional?: {
    showIf: string;
    values: string[];
  };
  options: QuizOption[];
}

const QuizPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  // Track quiz start
  useEffect(() => {
    if (!quizStarted) {
      trackQuizEvent("start");
      setQuizStarted(true);
    }
  }, [quizStarted]);

  // Track quiz abandonment on unmount
  useEffect(() => {
    return () => {
      if (currentStep < totalSteps - 1 && answers.length > 0) {
        trackQuizEvent("abandon", `Step ${currentStep + 1} of ${totalSteps}`);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get all questions
  const getQuestions = (): QuizQuestion[] => {
    const questions: QuizQuestion[] = [];
    for (let i = 1; i <= 12; i++) {
      const q = t(`quiz.questions.q${i}`, {
        returnObjects: true,
      }) as QuizQuestion;
      if (q && typeof q === "object") {
        questions.push(q);
      }
    }
    return questions;
  };

  const questions = getQuestions();
  const visibleQuestions = questions.filter((q) => {
    if (!q.conditional) return true;

    // Check if conditional question should be shown
    const conditionalAnswer = answers.find(
      (a) => a.questionId === q.conditional!.showIf
    );
    if (!conditionalAnswer) return true;

    const answerValue = Array.isArray(conditionalAnswer.value)
      ? conditionalAnswer.value[0]
      : conditionalAnswer.value;

    return q.conditional.values.includes(answerValue);
  });

  const totalSteps = visibleQuestions.length;
  const currentQuestion = visibleQuestions[currentStep];
  const progress = ((currentStep + 1) / totalSteps) * 100;

  // Scroll to top when question changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  // Initialize selected options from existing answer
  useEffect(() => {
    if (currentQuestion) {
      const existingAnswer = answers.find(
        (a) => a.questionId === currentQuestion.id
      );
      if (existingAnswer) {
        setSelectedOptions(
          Array.isArray(existingAnswer.value)
            ? existingAnswer.value
            : [existingAnswer.value]
        );
      } else {
        setSelectedOptions([]);
      }
    }
    // Only depend on currentStep to avoid infinite loop
    // currentQuestion and answers are stable relative to currentStep changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  const handleOptionClick = (value: string) => {
    if (!currentQuestion) return;

    if (currentQuestion.type === "single") {
      setSelectedOptions([value]);
    } else {
      // Multiple selection
      if (value === "basic-only") {
        // If "Just the Basics" is selected, clear all others
        setSelectedOptions(["basic-only"]);
      } else {
        // Remove "basic-only" if selecting other options
        const newSelected = selectedOptions.filter((v) => v !== "basic-only");

        if (selectedOptions.includes(value)) {
          setSelectedOptions(newSelected.filter((v) => v !== value));
        } else {
          setSelectedOptions([...newSelected, value]);
        }
      }
    }
  };

  const handleNext = () => {
    if (!currentQuestion || selectedOptions.length === 0) return;

    // Save answer
    const newAnswers = answers.filter(
      (a) => a.questionId !== currentQuestion.id
    );
    newAnswers.push({
      questionId: currentQuestion.id,
      value:
        currentQuestion.type === "single"
          ? selectedOptions[0]
          : selectedOptions,
    });
    setAnswers(newAnswers);

    // Track progress
    trackEvent({
      action: "quiz_progress",
      category: "Quiz",
      label: `Step ${currentStep + 1} completed`,
      value: Math.round(((currentStep + 1) / totalSteps) * 100),
    });

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Quiz complete - calculate results
      handleFinish(newAnswers);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = (finalAnswers: QuizAnswer[]) => {
    setIsCalculating(true);
    trackQuizEvent("complete", `${totalSteps} questions`);

    // Calculate results and navigate to results page with data
    setTimeout(() => {
      const results = calculateResults(finalAnswers);
      navigate(`/${i18n.language}/quiz/results`, {
        state: { results, answers: finalAnswers },
      });
    }, 1500);
  };

  const calculateResults = (finalAnswers: QuizAnswer[]) => {
    let complexity:
      | "simple"
      | "moderate"
      | "complex"
      | "advanced"
      | "enterprise" = "simple";
    let timeline: "fast" | "standard" | "extended" | "long" | "custom" =
      "standard";
    let recommendedModel:
      | "subscribe"
      | "buy-essentials"
      | "buy-growth"
      | "buy-custom"
      | "consultation" = "consultation";
    let estimatedPrice = { min: 0, max: 0 };
    const features: string[] = [];
    const addons: string[] = [];

    // Analyze website type
    const websiteType = finalAnswers.find((a) => a.questionId === "websiteType")
      ?.value as string;
    switch (websiteType) {
      case "landing":
        complexity = "simple";
        estimatedPrice = { min: 500, max: 900 };
        recommendedModel = "subscribe";
        timeline = "fast";
        break;
      case "business":
        complexity = "moderate";
        estimatedPrice = { min: 900, max: 1500 };
        recommendedModel = "buy-essentials";
        timeline = "standard";
        break;
      case "ecommerce":
        complexity = "complex";
        estimatedPrice = { min: 1500, max: 3000 };
        recommendedModel = "buy-growth";
        timeline = "extended";
        addons.push("E-commerce Integration");
        break;
      case "booking":
        complexity = "complex";
        estimatedPrice = { min: 1200, max: 2500 };
        recommendedModel = "buy-growth";
        timeline = "extended";
        addons.push("Booking System");
        break;
      case "webapp":
        complexity = "enterprise";
        estimatedPrice = { min: 3000, max: 10000 };
        recommendedModel = "buy-custom";
        timeline = "long";
        break;
      default:
        recommendedModel = "consultation";
    }

    // Adjust for content creation
    const contentReady = finalAnswers.find(
      (a) => a.questionId === "contentReady"
    )?.value as string;
    if (contentReady === "full-service") {
      estimatedPrice.min += 300;
      estimatedPrice.max += 800;
      addons.push("Professional Content Creation");
    } else if (contentReady === "need-help") {
      estimatedPrice.min += 150;
      estimatedPrice.max += 400;
      addons.push("Content Strategy Consultation");
    }

    // Competition research
    const competition = finalAnswers.find(
      (a) => a.questionId === "competitionResearch"
    )?.value as string;
    if (competition === "yes-detailed") {
      estimatedPrice.min += 200;
      estimatedPrice.max += 400;
      addons.push("Detailed Competitor Analysis");
    } else if (competition === "yes-basic") {
      estimatedPrice.min += 100;
      estimatedPrice.max += 150;
      addons.push("Basic Competitor Research");
    }

    // SEO level
    const seoLevel = finalAnswers.find((a) => a.questionId === "seoLevel")
      ?.value as string;
    features.push("Basic SEO Setup");
    if (seoLevel === "advanced" || seoLevel === "local") {
      estimatedPrice.min += 150;
      estimatedPrice.max += 300;
      addons.push("Advanced SEO");
      if (complexity === "simple") complexity = "moderate";
    } else if (seoLevel === "enterprise") {
      estimatedPrice.min += 400;
      estimatedPrice.max += 800;
      addons.push("Enterprise SEO Strategy");
      if (complexity === "simple" || complexity === "moderate")
        complexity = "complex";
    }

    // Analytics
    const analytics = finalAnswers.find(
      (a) => a.questionId === "analytics"
    )?.value;
    const analyticsArray = Array.isArray(analytics) ? analytics : [analytics];
    features.push("Google Analytics");
    if (analyticsArray.includes("heatmaps")) {
      estimatedPrice.min += 100;
      estimatedPrice.max += 200;
      addons.push("Heatmap Integration");
    }
    if (analyticsArray.includes("advanced")) {
      estimatedPrice.min += 300;
      estimatedPrice.max += 600;
      addons.push("Custom Analytics Dashboard");
    }

    // Animations
    const animations = finalAnswers.find((a) => a.questionId === "animations")
      ?.value as string;
    if (animations === "none") {
      estimatedPrice.min -= 100;
      estimatedPrice.max -= 200;
      features.push("Clean, Fast-Loading Design");
    } else if (animations === "advanced") {
      estimatedPrice.min += 200;
      estimatedPrice.max += 400;
      addons.push("Advanced Animations");
    } else if (animations === "showcase") {
      estimatedPrice.min += 500;
      estimatedPrice.max += 1000;
      addons.push("Showcase-Level Animations");
      if (complexity !== "enterprise") complexity = "advanced";
    } else {
      features.push("Modern Animations");
    }

    // Products/E-commerce
    const products = finalAnswers.find((a) => a.questionId === "products")
      ?.value as string;
    if (products === "few-products") {
      estimatedPrice.min += 400;
      estimatedPrice.max += 800;
      addons.push("Basic E-commerce (Under 20 products)");
    } else if (products === "many-products") {
      estimatedPrice.min += 800;
      estimatedPrice.max += 1500;
      addons.push("Full E-commerce (20-100 products)");
      if (complexity === "simple" || complexity === "moderate")
        complexity = "complex";
    } else if (products === "large-catalog") {
      estimatedPrice.min += 1500;
      estimatedPrice.max += 3000;
      addons.push("Enterprise E-commerce (100+ products)");
      complexity = "enterprise";
    } else if (products === "services") {
      estimatedPrice.min += 200;
      estimatedPrice.max += 500;
      addons.push("Service Showcase with Booking");
    }

    // Languages
    const languages = finalAnswers.find((a) => a.questionId === "languages")
      ?.value as string;
    features.push("Fully Responsive Design");
    if (languages === "two") {
      estimatedPrice.min += 150;
      estimatedPrice.max += 300;
      addons.push("Bilingual (2 languages)");
    } else if (languages === "three") {
      estimatedPrice.min += 300;
      estimatedPrice.max += 600;
      addons.push("Trilingual (3 languages)");
    } else if (languages === "many") {
      estimatedPrice.min += 600;
      estimatedPrice.max += 1200;
      addons.push("Multilingual (4+ languages)");
    }

    // Design approach
    const design = finalAnswers.find((a) => a.questionId === "design")
      ?.value as string;
    if (design === "template") {
      estimatedPrice.min -= 200;
      estimatedPrice.max -= 300;
      features.push("Template-Based Design");
    } else if (design === "custom") {
      estimatedPrice.min += 200;
      estimatedPrice.max += 500;
      addons.push("Fully Custom Design");
    } else if (design === "premium") {
      estimatedPrice.min += 500;
      estimatedPrice.max += 1200;
      addons.push("Premium Custom Design");
      if (complexity !== "enterprise") complexity = "advanced";
    } else {
      features.push("Semi-Custom Design");
    }

    // User accounts
    const userAccounts = finalAnswers.find(
      (a) => a.questionId === "userAccounts"
    )?.value as string;
    if (userAccounts === "simple" || userAccounts === "social") {
      estimatedPrice.min += 300;
      estimatedPrice.max += 600;
      addons.push("User Authentication");
      if (complexity === "simple") complexity = "moderate";
    } else if (userAccounts === "advanced") {
      estimatedPrice.min += 800;
      estimatedPrice.max += 1500;
      addons.push("Advanced User System");
      if (complexity === "simple" || complexity === "moderate")
        complexity = "complex";
    }

    // Timeline adjustment
    const timelineAnswer = finalAnswers.find((a) => a.questionId === "timeline")
      ?.value as string;
    if (timelineAnswer === "urgent") {
      estimatedPrice.min += 300;
      estimatedPrice.max += 600;
      timeline = "fast";
      addons.push("Rush Fee (ASAP delivery)");
    } else if (timelineAnswer === "flexible") {
      timeline = "extended";
    } else if (timelineAnswer === "planning") {
      estimatedPrice.min -= 100;
      estimatedPrice.max -= 200;
      timeline = "custom";
    }

    // Budget consideration for model recommendation
    const budget = finalAnswers.find((a) => a.questionId === "budget")
      ?.value as string;
    if (budget === "under-500") {
      recommendedModel = "subscribe";
    } else if (budget === "500-1000" && estimatedPrice.max <= 1000) {
      recommendedModel =
        estimatedPrice.min < 900 ? "buy-essentials" : "subscribe";
    } else if (budget === "unsure") {
      recommendedModel = "consultation";
    }

    // Ensure min price doesn't go below 0
    estimatedPrice.min = Math.max(estimatedPrice.min, 0);

    // If estimated price is very high, suggest consultation
    if (estimatedPrice.min > 3000) {
      recommendedModel = "consultation";
    }

    return {
      complexity,
      timeline,
      recommendedModel,
      estimatedPrice,
      features,
      addons,
      totalQuestions: finalAnswers.length,
    };
  };

  if (isCalculating) {
    return (
      <>
        <Header />
        <MetallicBackground />
        <div className="quiz-page">
          <div className="quiz-container">
            <div className="quiz-calculating">
              <motion.div
                className="calculating-spinner"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <svg width="60" height="60" viewBox="0 0 60 60">
                  <circle
                    cx="30"
                    cy="30"
                    r="25"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="40 120"
                  />
                </svg>
              </motion.div>
              <h2>{t("quiz.progress.calculating")}</h2>
            </div>
          </div>
        </div>
        <Footer />
        <CookieBanner />
        <ScrollProgress />
      </>
    );
  }

  if (!currentQuestion) {
    return (
      <>
        <Header />
        <MetallicBackground />
        <div className="quiz-page">
          <div className="quiz-container">
            <div className="quiz-error">
              <p>Error loading quiz questions</p>
            </div>
          </div>
        </div>
        <Footer />
        <CookieBanner />
        <ScrollProgress />
      </>
    );
  }

  return (
    <>
      <Header />
      <MetallicBackground />
      <div className="quiz-page">
        <div className="quiz-container">
          {/* Header */}
          <div className="quiz-header">
            <h1>{t("quiz.meta.title")}</h1>
            <p className="quiz-subtitle">{t("quiz.meta.subtitle")}</p>
            <div className="quiz-meta">
              <span>
                {t("quiz.progress.step", {
                  current: currentStep + 1,
                  total: totalSteps,
                })}
              </span>
              <span>•</span>
              <span>{t("quiz.meta.estimatedTime")}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="quiz-progress-bar">
            <motion.div
              className="quiz-progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              className="quiz-question"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="question-header">
                <div className="question-text">
                  <h2 className="question-title">{currentQuestion.question}</h2>
                  <p className="question-subtitle">
                    {currentQuestion.subtitle}
                  </p>
                </div>
                <div className="question-nav">
                  <button
                    className="quiz-btn quiz-btn-back"
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    title={t("quiz.navigation.back")}
                  >
                    ←
                  </button>
                  <button
                    className="quiz-btn quiz-btn-next"
                    onClick={handleNext}
                    disabled={selectedOptions.length === 0}
                    title={
                      currentStep === totalSteps - 1
                        ? t("quiz.navigation.finish")
                        : t("quiz.navigation.next")
                    }
                  >
                    {currentStep === totalSteps - 1 ? "✓" : "→"}
                  </button>
                </div>
              </div>

              <div className="quiz-options">
                {currentQuestion.options &&
                  Array.isArray(currentQuestion.options) &&
                  currentQuestion.options.map((option) => {
                    const isSelected = selectedOptions.includes(option.value);

                    return (
                      <motion.button
                        key={option.value}
                        className={`quiz-option ${
                          isSelected ? "selected" : ""
                        }`}
                        onClick={() => handleOptionClick(option.value)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="option-header">
                          <div className="option-checkbox">
                            {isSelected && (
                              <motion.svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                              >
                                <path
                                  d="M13 4L6 11L3 8"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </motion.svg>
                            )}
                          </div>
                          <h3>{option.label}</h3>
                        </div>
                        <p className="option-description">
                          {option.description}
                        </p>
                        <div className="option-impact">
                          <span className="impact-label">{option.impact}</span>
                          {option.priceImpact !== "none" &&
                            option.priceImpact !== "consultation" && (
                              <span
                                className={`price-impact ${option.priceImpact}`}
                              >
                                {option.priceImpact === "discount" && "↓"}
                                {option.priceImpact === "low" && "+"}
                                {option.priceImpact === "medium" && "++"}
                                {option.priceImpact === "high" && "+++"}
                                {option.priceImpact === "very-high" && "++++"}
                              </span>
                            )}
                        </div>
                      </motion.button>
                    );
                  })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <Footer />
      <CookieBanner />
      <ScrollProgress />
    </>
  );
};

export default QuizPage;
