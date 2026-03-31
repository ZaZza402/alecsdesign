import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import {
  trackButtonClick,
  trackEmailClick,
  trackWhatsAppClick,
} from "../utils/analytics";
import { SEO } from "../utils/seo";
import ContactForm from "../components/ui/ContactForm";
import "./ContactPage.css";

const ContactPage = () => {
  const { t } = useTranslation();
  const [contactRevealed, setContactRevealed] = useState(false);

  const getEmail = () => {
    const parts = ["start", "alecsdesign", "xyz"];
    return `${parts[0]}@${parts[1]}.${parts[2]}`;
  };

  const getPhone = () => {
    const parts = ["39", "380", "150", "3074"];
    return `+${parts[0]} ${parts[1]} ${parts[2]} ${parts[3]}`;
  };

  const getWhatsApp = () => `https://wa.me/393801503074`;

  return (
    <div className="contact-page">
      <SEO
        title={`${t("contact.title")} | AlecsDesign`}
        description={t("contact.subtitle")}
        keywords="contact web developer rome, web design quote, hire react developer, website consultation"
      />

      <div className="contact-page-container">
        {/* Left column: contact info */}
        <div className="contact-info-column">
          <h1 className="contact-page-title">{t("contact.title")}</h1>
          <p className="contact-page-subtitle">{t("contact.subtitle")}</p>

          <div className="contact-methods">
            <div className="contact-method-item">
              <div className="contact-icon-box">
                <Mail size={22} />
              </div>
              <div className="contact-method-content">
                <h3>{t("contact.methods.emailUs")}</h3>
                {contactRevealed ? (
                  <a
                    href={`mailto:${getEmail()}`}
                    onClick={() => trackEmailClick("Contact Page")}
                  >
                    {getEmail()}
                  </a>
                ) : (
                  <button
                    className="reveal-btn"
                    onClick={() => setContactRevealed(true)}
                  >
                    {t("footer.revealContact")}
                  </button>
                )}
              </div>
            </div>

            <div className="contact-method-item">
              <div className="contact-icon-box">
                <Phone size={22} />
              </div>
              <div className="contact-method-content">
                <h3>{t("contact.methods.callUs")}</h3>
                {contactRevealed ? (
                  <a
                    href={`tel:${getPhone().replace(/\s/g, "")}`}
                    onClick={() => trackButtonClick("Phone Call", "Contact Page")}
                  >
                    {getPhone()}
                  </a>
                ) : (
                  <button
                    className="reveal-btn"
                    onClick={() => setContactRevealed(true)}
                  >
                    {t("footer.revealContact")}
                  </button>
                )}
              </div>
            </div>

            <div className="contact-method-item">
              <div className="contact-icon-box">
                <MessageCircle size={22} />
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
                <MapPin size={22} />
              </div>
              <div className="contact-method-content">
                <h3>{t("contact.methods.location")}</h3>
                <p>{t("footer.company.location")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: 3-step form */}
        <div className="contact-form-column">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;