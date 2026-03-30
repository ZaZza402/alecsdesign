import React from "react";
import { Globe, CalendarCheck, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { trackCTAClick } from "../utils/analytics";
import "./ServicesSection.css";

const ServicesSection: React.FC = () => {
  const { t } = useTranslation();

  const services = [
    {
      key: "website",
      Icon: Globe,
    },
    {
      key: "bookings",
      Icon: CalendarCheck,
    },
    {
      key: "custom",
      Icon: Sparkles,
    },
  ];

  const handleWhatsAppClick = () => {
    trackCTAClick("WhatsApp", "Services Section");
    window.open("https://wa.me/393801503074", "_blank", "noopener,noreferrer");
  };

  return (
    <section className="services-section" aria-labelledby="services-heading">
      <div className="services-section__container">
        <h2
          id="services-heading"
          className="services-section__title"
          data-aos="fade-up"
        >
          {t("services.title")}
        </h2>
        <p
          className="services-section__subtitle"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {t("services.subtitle")}
        </p>

        <div className="services-section__grid">
          {services.map((service, index) => (
            <div
              key={service.key}
              className="services-card"
              data-aos="fade-up"
              data-aos-delay={String(index * 100)}
            >
              <div className="services-card__header">
                <span className="services-card__icon" aria-hidden="true">
                  <service.Icon size={22} strokeWidth={2} />
                </span>
                <h3 className="services-card__title">
                  {t(`services.${service.key}.title`)}
                </h3>
              </div>
              <p className="services-card__description">
                {t(`services.${service.key}.description`)}
              </p>
            </div>
          ))}
        </div>

        <div className="services-section__cta" data-aos="fade-up">
          <button
            onClick={handleWhatsAppClick}
            className="services-cta-button"
            aria-label="Message Alex on WhatsApp to discuss your project"
          >
            {t("services.cta")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
