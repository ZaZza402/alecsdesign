import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  RefreshCw,
  MessageCircle,
  HelpCircle,
  Mail,
  Phone,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  Send,
  CheckCircle,
  Check,
} from "lucide-react";
import "./ContactForm.css";

interface FormData {
  needs: string;
  name: string;
  business: string;
  preference: string;
  contactDetail: string;
  message: string;
}

const ContactForm = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [data, setData] = useState<FormData>({
    needs: "",
    name: "",
    business: "",
    preference: "",
    contactDetail: "",
    message: "",
  });

  const needsOptions = [
    {
      value: "new-website",
      label: t("contact.form.needsOptions.newWebsite"),
      icon: Globe,
    },
    {
      value: "redesign",
      label: t("contact.form.needsOptions.redesign"),
      icon: RefreshCw,
    },
    {
      value: "consultation",
      label: t("contact.form.needsOptions.consultation"),
      icon: MessageCircle,
    },
    {
      value: "other",
      label: t("contact.form.needsOptions.other"),
      icon: HelpCircle,
    },
  ];

  const preferenceOptions = [
    {
      value: "email",
      label: t("contact.form.preferenceOptions.email"),
      icon: Mail,
    },
    { value: "whatsapp", label: "WhatsApp", icon: MessageSquare },
    {
      value: "phone",
      label: t("contact.form.preferenceOptions.phone"),
      icon: Phone,
    },
  ];

  const goNext = () => {
    setDirection(1);
    setStep((s) => s + 1);
  };
  const goBack = () => {
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const canProceedStep2 =
    data.name.trim() !== "" &&
    data.business.trim() !== "";

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      if (import.meta.env.DEV) {
        await new Promise((r) => setTimeout(r, 1200));
        setSubmitted(true);
        return;
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("failed");

      if (
        typeof window !== "undefined" &&
        (window as typeof window & { gtag?: Function }).gtag
      ) {
        (window as typeof window & { gtag: Function }).gtag(
          "event",
          "form_submit_success",
          {
            event_category: "Form",
            event_label: "Contact Form",
            value: 1,
          },
        );
        (window as typeof window & { gtag: Function }).gtag(
          "event",
          "generate_lead",
          {
            currency: "EUR",
            value: 500,
          },
        );
      }

      setSubmitted(true);
    } catch {
      setSubmitError(t("contact.errorMessage"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const panelVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -50 : 50, opacity: 0 }),
  };
  const transition = {
    duration: 0.22,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  };

  if (submitted) {
    return (
      <div className="cf cf--success">
        <div className="cf__success-icon">
          <CheckCircle size={32} />
        </div>
        <h3>{t("contact.successMessage")}</h3>
      </div>
    );
  }

  return (
    <div className="cf">
      {/* Progress bar */}
      <div className="cf__progress">
        <div
          className="cf__progress-bar"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      {/* Step indicator */}
      <div className="cf__steps">
        {[1, 2, 3].flatMap((n, i) => {
          const els = [
            <div
              key={n}
              className={`cf__step-dot ${n === step ? "active" : ""} ${n < step ? "done" : ""}`}
            >
              {n < step ? <Check size={11} /> : n}
            </div>,
          ];
          if (i < 2)
            els.push(
              <div
                key={`line-${n}`}
                className={`cf__step-line ${n < step ? "done" : ""}`}
              />,
            );
          return els;
        })}
      </div>

      {/* Animated panels */}
      <div className="cf__panels-wrap">
        <AnimatePresence custom={direction} mode="wait" initial={false}>
          <motion.div
            key={step}
            custom={direction}
            variants={panelVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className="cf__panel"
          >
            {/* ── STEP 1: project type ── */}
            {step === 1 && (
              <>
                <h3 className="cf__title">{t("contact.steps.step1Title")}</h3>
                <div className="cf__options">
                  {needsOptions.map((opt) => {
                    const Icon = opt.icon;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        className={`cf__option ${data.needs === opt.value ? "selected" : ""}`}
                        onClick={() => {
                          setData((d) => ({ ...d, needs: opt.value }));
                          setTimeout(goNext, 160);
                        }}
                      >
                        <Icon size={22} aria-hidden="true" />
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {/* ── STEP 2: about you ── */}
            {step === 2 && (
              <>
                <h3 className="cf__title">{t("contact.steps.step2Title")}</h3>
                <div className="cf__field">
                  <input
                    type="text"
                    className="cf__input"
                    placeholder={t("contact.form.namePlaceholder")}
                    value={data.name}
                    onChange={(e) =>
                      setData((d) => ({ ...d, name: e.target.value }))
                    }
                    autoComplete="name"
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    autoFocus
                  />
                </div>
                <div className="cf__field">
                  <textarea
                    className="cf__textarea"
                    rows={3}
                    placeholder={t("contact.form.businessPlaceholder")}
                    value={data.business}
                    onChange={(e) =>
                      setData((d) => ({ ...d, business: e.target.value }))
                    }
                    autoComplete="organization"
                  />
                </div>
                <div className="cf__actions">
                  <button
                    type="button"
                    className="cf__btn-back"
                    onClick={goBack}
                  >
                    <ArrowLeft size={16} />
                    {t("contact.steps.back")}
                  </button>
                  <button
                    type="button"
                    className="cf__btn-next"
                    onClick={goNext}
                    disabled={!canProceedStep2}
                  >
                    {t("contact.steps.next")}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </>
            )}

            {/* ── STEP 3: how to reach + optional message ── */}
            {step === 3 && (
              <>
                <h3 className="cf__title">{t("contact.steps.step3Title")}</h3>
                <div className="cf__preference">
                  {preferenceOptions.map((opt) => {
                    const Icon = opt.icon;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        className={`cf__pref-btn ${data.preference === opt.value ? "selected" : ""}`}
                        onClick={() =>
                          setData((d) => ({ ...d, preference: opt.value, contactDetail: "" }))
                        }
                      >
                        <Icon size={15} aria-hidden="true" />
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
                <AnimatePresence>
                  {data.preference && (
                    <motion.div
                      className="cf__field cf__field--contact-detail"
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: "1rem" }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                    >
                      <input
                        type={data.preference === "email" ? "email" : "tel"}
                        className="cf__input"
                        placeholder={
                          data.preference === "email"
                            ? "your@email.com"
                            : data.preference === "whatsapp"
                              ? "WhatsApp: +39 333 123 4567"
                              : "+39 06 123 4567"
                        }
                        value={data.contactDetail}
                        onChange={(e) =>
                          setData((d) => ({ ...d, contactDetail: e.target.value }))
                        }
                        autoComplete={data.preference === "email" ? "email" : "tel"}
                        // eslint-disable-next-line jsx-a11y/no-autofocus
                        autoFocus
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="cf__field">
                  <textarea
                    className="cf__textarea"
                    rows={3}
                    placeholder={t("contact.form.messagePlaceholder")}
                    value={data.message}
                    onChange={(e) =>
                      setData((d) => ({ ...d, message: e.target.value }))
                    }
                  />
                </div>
                {submitError && <p className="cf__error">{submitError}</p>}
                <div className="cf__actions">
                  <button
                    type="button"
                    className="cf__btn-back"
                    onClick={goBack}
                  >
                    <ArrowLeft size={16} />
                    {t("contact.steps.back")}
                  </button>
                  <button
                    type="button"
                    className="cf__btn-submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting || !data.preference || !data.contactDetail.trim()}
                  >
                    {isSubmitting ? (
                      t("contact.form.sending")
                    ) : (
                      <>
                        <Send size={16} aria-hidden="true" />
                        {t("contact.form.submit")}
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ContactForm;
