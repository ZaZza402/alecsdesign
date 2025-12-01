import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Mail, Send, Check } from "lucide-react";
import { trackCTAClick, trackEvent } from "../utils/analytics";
import "./QuizPage.css";

interface CalculatorResultState {
  tier: "launchpad" | "dynamic" | "platform";
  model: "managed" | "owned";
  scores: {
    complexity: number;
    independence: number;
  };
  resultData: {
    title: string;
    description: string;
    priceRange: string;
    timeline: string;
    bestFor: string[];
    features: string[];
  };
  answers: Record<string, string | string[]>;
}

const QuizResults = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as CalculatorResultState;
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  const [shareStatus, setShareStatus] = useState<"idle" | "copied">("idle");

  // Helper to get proper route based on language
  const getLocalizedRoute = (path: string) => {
    const lang = i18n.language;
    return lang === "en" ? path : `/${lang}${path}`;
  };

  useEffect(() => {
    // Redirect to quiz if no results
    if (!state) {
      navigate(getLocalizedRoute("/quiz"));
    } else {
      // Track results view
      trackEvent({
        action: "calculator_results_view",
        category: "Calculator",
        label: `${state.tier} - ${state.model}`,
        value: state.scores.complexity,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, navigate, i18n.language]);

  if (!state) {
    return null;
  }

  const { model, scores, resultData } = state;

  const handleContactClick = () => {
    trackCTAClick("Contact from Results", "Calculator Results");
    navigate(getLocalizedRoute("/contact"));
  };

  const handleRestart = () => {
    trackEvent({
      action: "calculator_restart",
      category: "Calculator",
      label: "From Results Page",
    });
    navigate(getLocalizedRoute("/quiz"));
  };

  const handleShare = async () => {
    // Always use clipboard copy to avoid OS share dialog issues
    navigator.clipboard.writeText(window.location.href);
    setShareStatus("copied");
    setTimeout(() => setShareStatus("idle"), 2000);
    trackEvent({
      action: "share_results",
      category: "Calculator",
      label: "Clipboard Copy",
    });
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSending(true);
    try {
      // Simulate API call in development
      if (import.meta.env.DEV) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Email sent (DEV mode):", { email, resultData });
        setSendStatus("success");
        trackEvent({
          action: "email_results",
          category: "Calculator",
          label: "Success (Dev)",
        });
        setTimeout(() => {
          setShowEmailForm(false);
          setSendStatus("idle");
          setEmail("");
        }, 3000);
        setIsSending(false);
        return;
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Calculator User",
          contact: email,
          business: "N/A (Calculator Result)",
          needs: `Calculator Result: ${resultData.title} (${model} model). Complexity: ${scores.complexity}/100.`,
          preference: "Email",
          message: `User wants to save/discuss these results.\n\nTier: ${state.tier}\nModel: ${state.model}\nPrice Range: ${resultData.priceRange}\nTimeline: ${resultData.timeline}`,
        }),
      });

      if (response.ok) {
        setSendStatus("success");
        trackEvent({
          action: "email_results",
          category: "Calculator",
          label: "Success",
        });
        setTimeout(() => {
          setShowEmailForm(false);
          setSendStatus("idle");
          setEmail("");
        }, 3000);
      } else {
        const data = await response.json();
        console.error("Email send failed:", data);
        setSendStatus("error");
        alert(
          `${t("quiz.results.emailForm.alertError")}${
            data.error || "Unknown error"
          }. ${data.details || ""}`
        );
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setSendStatus("error");
      alert(t("quiz.results.emailForm.alertConnectionError"));
    } finally {
      setIsSending(false);
    }
  };

  // Complexity Meter Color
  const getMeterColor = (score: number) => {
    if (score <= 30) return "#10b981"; // Green
    if (score <= 70) return "#f59e0b"; // Orange
    return "#8b5cf6"; // Purple
  };

  return (
    <div className="quiz-results-page">
      <div className="quiz-results-container">
        {/* Header */}
        <motion.div
          className="results-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-white uppercase bg-black rounded-full">
            {t("quiz.results.title") || "Your Project Blueprint"}
          </div>
          <h1>{resultData.title}</h1>
          <p className="results-subtitle">{resultData.description}</p>
        </motion.div>

        {/* Scores Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Complexity Score */}
          <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                {t("quiz.results.complexityScore") || "Complexity Score"}
              </h3>
              <span className="text-2xl font-bold text-slate-900">
                {scores.complexity}/100
              </span>
            </div>
            <div className="h-4 bg-slate-100 rounded-full overflow-hidden mb-2">
              <motion.div
                className="h-full"
                style={{ backgroundColor: getMeterColor(scores.complexity) }}
                initial={{ width: 0 }}
                animate={{ width: `${scores.complexity}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <p className="text-xs text-slate-400">
              {scores.complexity <= 30
                ? t("quiz.results.complexityLevels.low")
                : scores.complexity <= 70
                ? t("quiz.results.complexityLevels.mid")
                : t("quiz.results.complexityLevels.high")}
            </p>
          </div>

          {/* Independence Score */}
          <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                {t("quiz.results.modelFit") || "Model Fit"}
              </h3>
              <span
                className={`text-lg font-bold px-3 py-1 rounded-lg ${
                  model === "managed"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-emerald-100 text-emerald-800"
                }`}
              >
                {model === "managed"
                  ? t("quiz.results.modelLabels.managed")
                  : t("quiz.results.modelLabels.owned")}
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              {model === "managed"
                ? t("quiz.results.modelDescriptions.managed")
                : t("quiz.results.modelDescriptions.owned")}
            </p>
          </div>
        </motion.div>

        {/* Main Result Card */}
        <motion.div
          className="results-section model-section relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  {t("quiz.results.recommendedPlan")}
                </h2>
                <div className="text-slate-500">
                  {t("quiz.results.timelineLabel")}{" "}
                  <span className="font-semibold text-slate-900">
                    {resultData.timeline}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold mb-1">
                  {t("quiz.results.estimatedRange")}
                </div>
                <div className="text-3xl font-bold text-slate-900">
                  {resultData.priceRange}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {model === "managed"
                    ? t("quiz.results.perMonth")
                    : t("quiz.results.oneTime")}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  {t("quiz.results.whatYouGet")}
                </h3>
                <ul className="space-y-3">
                  {resultData.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-slate-600"
                    >
                      <svg
                        className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  {t("quiz.results.whyThisFits")}
                </h3>
                <ul className="space-y-3">
                  {resultData.bestFor.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-slate-600"
                    >
                      <svg
                        className="w-5 h-5 text-blue-500 shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="results-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button
            className="cta-button cta-primary"
            onClick={handleContactClick}
          >
            {t("quiz.results.cta.primary") || "Book a Strategy Call"}
          </button>

          <button
            className="cta-button cta-secondary flex items-center justify-center gap-2"
            onClick={() => setShowEmailForm(!showEmailForm)}
          >
            <Mail size={18} />
            <span>{t("quiz.results.sentToTeam") || "Send to Team"}</span>
          </button>

          <button
            className="cta-button cta-secondary flex items-center justify-center gap-2"
            onClick={handleShare}
          >
            {shareStatus === "copied" ? (
              <Check size={18} />
            ) : (
              <Share2 size={18} />
            )}
            <span>
              {shareStatus === "copied"
                ? t("quiz.results.copied") || "Copied!"
                : t("quiz.results.share") || "Share"}
            </span>
          </button>

          <button className="cta-button cta-restart" onClick={handleRestart}>
            {t("quiz.results.cta.restart") || "Start Over"}
          </button>
        </motion.div>

        {/* Email Form */}
        <AnimatePresence>
          {showEmailForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full max-w-md mx-auto mt-6 overflow-hidden"
            >
              <form
                onSubmit={handleSendEmail}
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  {t("quiz.results.emailForm.title")}
                </h3>
                <p className="text-sm text-slate-500 mb-4">
                  {t("quiz.results.emailForm.description")}
                </p>

                <div className="flex gap-2">
                  <input
                    type="email"
                    id="result-email"
                    name="email"
                    autoComplete="email"
                    aria-label={
                      t("quiz.results.emailForm.placeholder") || "Email"
                    }
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                  />
                  <button
                    type="submit"
                    disabled={isSending || sendStatus === "success"}
                    className={`px-4 py-2 rounded-lg font-bold text-white transition-colors flex items-center gap-2 ${
                      sendStatus === "success"
                        ? "bg-green-500"
                        : sendStatus === "error"
                        ? "bg-red-500"
                        : "bg-black hover:bg-slate-800"
                    }`}
                  >
                    {isSending ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : sendStatus === "success" ? (
                      <Check size={18} />
                    ) : (
                      <Send size={18} />
                    )}
                  </button>
                </div>
                {sendStatus === "success" && (
                  <p className="text-green-600 text-xs mt-2 font-medium">
                    {t("quiz.results.emailForm.success")}
                  </p>
                )}
                {sendStatus === "error" && (
                  <p className="text-red-600 text-xs mt-2 font-medium">
                    {t("quiz.results.emailForm.error")}
                  </p>
                )}
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back to Home */}
        <motion.div
          className="results-back"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link to={`/${i18n.language}`}>{t("legal.backToHome")}</Link>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizResults;
