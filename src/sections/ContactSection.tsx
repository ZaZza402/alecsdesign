import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { useForm } from "react-hook-form";
import { Send, CheckCircle, XCircle, Clock, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { trackSectionView } from "../utils/analytics";
import "./ContactSection.css";

interface ContactFormData {
  name: string;
  contact: string;
  business: string;
  needs: string;
  preference: string;
  message: string;
}

interface Toast {
  type: "success" | "error";
  message: string;
}

const ContactSection = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [toast, setToast] = useState<Toast | null>(null);
  const [isWhatsAppAvailable, setIsWhatsAppAvailable] = useState(false);

  // Track section view
  useEffect(() => {
    if (inView) {
      trackSectionView("Contact Section");
    }
  }, [inView]);

  // Check WhatsApp availability (9 AM - 10 PM local time)
  useEffect(() => {
    const checkAvailability = () => {
      const now = new Date();
      const hour = now.getHours();
      setIsWhatsAppAvailable(hour >= 9 && hour < 22);
    };

    checkAvailability();
    const interval = setInterval(checkAvailability, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>();

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000); // Auto-hide after 5 seconds
  };

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Simulate API call in development
      if (import.meta.env.DEV) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Form submitted (DEV mode):", data);
        showToast("success", t("contact.successMessage"));
        reset();
        return;
      }

      // Send form data to serverless function
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        // Track form submission error
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "form_submit_error", {
            event_category: "Form",
            event_label: "Contact Form",
          });
        }
        throw new Error(result.error || "Failed to send message");
      }

      // Track successful form submission
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "form_submit_success", {
          event_category: "Form",
          event_label: "Contact Form",
          value: 1,
        });
        window.gtag("event", "generate_lead", {
          currency: "EUR",
          value: 500,
        });
      }

      // Show success message
      showToast("success", t("contact.successMessage"));
      reset();
    } catch (error) {
      // Log error only in development
      if (import.meta.env.DEV) {
        console.error("Error submitting form:", error);
      }
      showToast(
        "error",
        t("contact.errorMessage") ||
          "Failed to send message. Please try again or contact me directly."
      );
    }
  };

  return (
    <section className="contact-section" id="contact" ref={ref}>
      {/* Toast Notification */}
      {toast && (
        <div className={`toast-notification toast-${toast.type}`}>
          <div className="toast-content">
            {toast.type === "success" ? (
              <CheckCircle size={24} />
            ) : (
              <XCircle size={24} />
            )}
            <p>{toast.message}</p>
          </div>
          <button
            className="toast-close"
            onClick={() => setToast(null)}
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      )}

      <div className={`contact-container ${inView ? "animate-in" : ""}`}>
        <div className="contact-header">
          <h2 className="contact-title">{t("contact.title")}</h2>
          <p className="contact-subtitle">{t("contact.subtitle")}</p>

          {/* Response Time & Availability Indicators */}
          <div
            className="contact-indicators"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="indicator-item">
              <Clock size={18} />
              <span>
                {t("contact.responseTime")}{" "}
                <strong>{t("contact.responseTimeValue")}</strong>
              </span>
            </div>
            <div
              className={`indicator-item ${
                isWhatsAppAvailable ? "available" : "unavailable"
              }`}
            >
              <MessageSquare size={18} />
              <span>
                {t("contact.whatsappStatus")}{" "}
                <strong className="status-badge">
                  {isWhatsAppAvailable
                    ? t("contact.whatsappAvailable")
                    : t("contact.whatsappOffline")}
                </strong>
              </span>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-grid">
            {/* Name field */}
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                {t("contact.form.name")} *
              </label>
              <input
                type="text"
                id="name"
                autoComplete="name"
                className={`form-input ${errors.name ? "error" : ""}`}
                {...register("name", {
                  required: t("contact.form.nameRequired"),
                })}
              />
              {errors.name && (
                <span className="error-message">{errors.name.message}</span>
              )}
            </div>

            {/* Contact field */}
            <div className="form-group">
              <label htmlFor="contact" className="form-label">
                {t("contact.form.contact")} *
              </label>
              <input
                type="text"
                id="contact"
                autoComplete="email"
                className={`form-input ${errors.contact ? "error" : ""}`}
                {...register("contact", {
                  required: t("contact.form.contactRequired"),
                })}
              />
              {errors.contact && (
                <span className="error-message">{errors.contact.message}</span>
              )}
            </div>
          </div>

          {/* Business description */}
          <div className="form-group">
            <label htmlFor="business" className="form-label">
              {t("contact.form.business")} *
            </label>
            <textarea
              id="business"
              autoComplete="organization"
              rows={3}
              className={`form-textarea ${errors.business ? "error" : ""}`}
              {...register("business", {
                required: t("contact.form.businessRequired"),
              })}
            />
            {errors.business && (
              <span className="error-message">{errors.business.message}</span>
            )}
          </div>

          <div className="form-grid">
            {/* Needs dropdown */}
            <div className="form-group">
              <label htmlFor="needs" className="form-label">
                {t("contact.form.needs")} *
              </label>
              <select
                id="needs"
                className={`form-select ${errors.needs ? "error" : ""}`}
                {...register("needs", {
                  required: t("contact.form.needsRequired"),
                })}
              >
                <option value="">{t("contact.form.needsPlaceholder")}</option>
                <option value="new-website">
                  {t("contact.form.needsOptions.newWebsite")}
                </option>
                <option value="redesign">
                  {t("contact.form.needsOptions.redesign")}
                </option>
                <option value="consultation">
                  {t("contact.form.needsOptions.consultation")}
                </option>
                <option value="other">
                  {t("contact.form.needsOptions.other")}
                </option>
              </select>
              {errors.needs && (
                <span className="error-message">{errors.needs.message}</span>
              )}
            </div>

            {/* Contact preference dropdown */}
            <div className="form-group">
              <label htmlFor="preference" className="form-label">
                {t("contact.form.preference")} *
              </label>
              <select
                id="preference"
                className={`form-select ${errors.preference ? "error" : ""}`}
                {...register("preference", {
                  required: t("contact.form.preferenceRequired"),
                })}
              >
                <option value="">
                  {t("contact.form.preferencePlaceholder")}
                </option>
                <option value="email">
                  {t("contact.form.preferenceOptions.email")}
                </option>
                <option value="phone">
                  {t("contact.form.preferenceOptions.phone")}
                </option>
                <option value="whatsapp">
                  {t("contact.form.preferenceOptions.whatsapp")}
                </option>
              </select>
              {errors.preference && (
                <span className="error-message">
                  {errors.preference.message}
                </span>
              )}
            </div>
          </div>

          {/* Additional message */}
          <div className="form-group">
            <label htmlFor="message" className="form-label">
              {t("contact.form.message")}
            </label>
            <textarea
              id="message"
              rows={4}
              className="form-textarea"
              {...register("message")}
            />
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>{t("contact.form.sending")}</span>
            ) : (
              <>
                <span>{t("contact.form.submit")}</span>
                <Send size={20} />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
