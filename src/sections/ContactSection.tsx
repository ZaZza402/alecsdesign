import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { useForm } from "react-hook-form";
import { Send } from "lucide-react";
import "./ContactSection.css";

interface ContactFormData {
  name: string;
  contact: string;
  business: string;
  needs: string;
  preference: string;
  message: string;
}

const ContactSection = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    // TODO: Implement form submission (send to email service or API)
    console.log("Form data:", data);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert(t("contact.successMessage"));
    reset();
  };

  return (
    <section className="contact-section" id="contact" ref={ref}>
      <div className={`contact-container ${inView ? "animate-in" : ""}`}>
        <div className="contact-header">
          <h2 className="contact-title">{t("contact.title")}</h2>
          <p className="contact-subtitle">{t("contact.subtitle")}</p>
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
