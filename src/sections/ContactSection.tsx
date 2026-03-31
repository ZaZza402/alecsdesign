import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { Clock, MessageSquare } from "lucide-react";
import { trackSectionView } from "../utils/analytics";
import ContactForm from "../components/ui/ContactForm";
import "./ContactSection.css";

const ContactSection = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [isWhatsAppAvailable, setIsWhatsAppAvailable] = useState(false);

  useEffect(() => {
    if (inView) trackSectionView("Contact Section");
  }, [inView]);

  useEffect(() => {
    const check = () => {
      const h = new Date().getHours();
      setIsWhatsAppAvailable(h >= 9 && h < 22);
    };
    check();
    const interval = setInterval(check, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="contact-section" id="contact" ref={ref}>
      <div className={`contact-container ${inView ? "animate-in" : ""}`}>
        <div className="contact-header">
          <h2 className="contact-title">{t("contact.title")}</h2>
          <p className="contact-subtitle">{t("contact.subtitle")}</p>
          <div className="contact-indicators">
            <div className="indicator-item">
              <Clock size={16} />
              <span>
                {t("contact.responseTime")}{" "}
                <strong>{t("contact.responseTimeValue")}</strong>
              </span>
            </div>
            <div
              className={`indicator-item ${isWhatsAppAvailable ? "available" : "unavailable"}`}
            >
              <MessageSquare size={16} />
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
        <ContactForm />
      </div>
    </section>
  );
};

export default ContactSection;