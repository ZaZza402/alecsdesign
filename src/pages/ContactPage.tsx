import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Send,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import {
  trackButtonClick,
  trackEmailClick,
  trackWhatsAppClick,
} from "../utils/analytics";
import { SEO } from "../utils/seo";
import "./ContactPage.css";

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

const ContactPage = () => {
  const { t } = useTranslation();
  const [toast, setToast] = useState<Toast | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>();

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
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

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      showToast("success", t("contact.successMessage"));
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      showToast(
        "error",
        t("contact.errorMessage") ||
          "Failed to send message. Please try again or contact me directly."
      );
    }
  };

  // Contact Info Helpers
  const getEmail = () => {
    const parts = ["start", "alecsdesign", "xyz"];
    return `${parts[0]}@${parts[1]}.${parts[2]}`;
  };

  const getPhone = () => {
    const parts = ["39", "380", "150", "3074"];
    return `+${parts[0]} ${parts[1]} ${parts[2]} ${parts[3]}`;
  };

  const getWhatsApp = () => {
    return `https://wa.me/393801503074`;
  };

  return (
    <div className="contact-page">
      <SEO
        title={`${t("contact.title")} | AlecsDesign`}
        description={t("contact.subtitle")}
        keywords="contact web developer rome, web design quote, hire react developer, website consultation"
      />
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

      <div className="contact-page-container">
        {/* Left Column: Info */}
        <div className="contact-info-column">
          <h1 className="contact-page-title">{t("contact.title")}</h1>
          <p className="contact-page-subtitle">{t("contact.subtitle")}</p>

          <div className="contact-methods">
            <div className="contact-method-item">
              <div className="contact-icon-box">
                <Mail size={24} />
              </div>
              <div className="contact-method-content">
                <h3>{t("contact.methods.emailUs")}</h3>
                <a
                  href={`mailto:${getEmail()}`}
                  onClick={() => trackEmailClick("Contact Page")}
                >
                  {getEmail()}
                </a>
              </div>
            </div>

            <div className="contact-method-item">
              <div className="contact-icon-box">
                <Phone size={24} />
              </div>
              <div className="contact-method-content">
                <h3>{t("contact.methods.callUs")}</h3>
                <a
                  href={`tel:${getPhone().replace(/\s/g, "")}`}
                  onClick={() => trackButtonClick("Phone Call", "Contact Page")}
                >
                  {getPhone()}
                </a>
              </div>
            </div>

            <div className="contact-method-item">
              <div className="contact-icon-box">
                <MessageCircle size={28} />
              </div>
              <div className="contact-method-content">
                <h3>{t("contact.methods.whatsapp")}</h3>
                <a
                  href={getWhatsApp()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("Contact Page")}
                >
                  {t("contact.methods.chatOnWhatsApp")}
                </a>
              </div>
            </div>

            <div className="contact-method-item">
              <div className="contact-icon-box">
                <MapPin size={24} />
              </div>
              <div className="contact-method-content">
                <h3>{t("contact.methods.location")}</h3>
                <p>{t("footer.company.location")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="contact-form-column">
          <div className="contact-form-header">
            <h2>{t("contact.methods.sendMessage")}</h2>
            <p className="text-slate-500">
              {t("contact.methods.sendMessageDesc")}
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  {t("contact.form.name")} *
                </label>
                <input
                  type="text"
                  id="name"
                  autoComplete="name"
                  placeholder={t("contact.form.namePlaceholder")}
                  className={`form-input ${errors.name ? "error" : ""}`}
                  {...register("name", {
                    required: t("contact.form.nameRequired"),
                  })}
                />
                {errors.name && (
                  <span className="error-message">
                    <AlertCircle size={12} />
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="contact" className="form-label">
                  {t("contact.form.contact")} *
                </label>
                <input
                  type="text"
                  id="contact"
                  autoComplete="email"
                  placeholder={t("contact.form.contactPlaceholder")}
                  className={`form-input ${errors.contact ? "error" : ""}`}
                  {...register("contact", {
                    required: t("contact.form.contactRequired"),
                  })}
                />
                {errors.contact && (
                  <span className="error-message">
                    <AlertCircle size={12} />
                    {errors.contact.message}
                  </span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="business" className="form-label">
                {t("contact.form.business")} *
              </label>
              <textarea
                id="business"
                autoComplete="organization"
                rows={3}
                placeholder={t("contact.form.businessPlaceholder")}
                className={`form-textarea ${errors.business ? "error" : ""}`}
                {...register("business", {
                  required: t("contact.form.businessRequired"),
                })}
              />
              {errors.business && (
                <span className="error-message">
                  <AlertCircle size={12} />
                  {errors.business.message}
                </span>
              )}
            </div>

            <div className="form-grid">
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
                  <span className="error-message">
                    <AlertCircle size={12} />
                    {errors.needs.message}
                  </span>
                )}
              </div>

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
                    <AlertCircle size={12} />
                    {errors.preference.message}
                  </span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">
                {t("contact.form.message")}
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder={t("contact.form.messagePlaceholder")}
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
      </div>
    </div>
  );
};
export default ContactPage;
