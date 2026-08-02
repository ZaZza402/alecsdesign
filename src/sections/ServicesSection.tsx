import React, { useRef } from "react";
import { Globe, CalendarCheck, Sparkles } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import { trackCTAClick } from "../utils/analytics";
import StoryMascot from "../components/ui/StoryMascot";
import "./ServicesSection.css";

const ServicesSection: React.FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

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
    <section
      ref={sectionRef}
      className="services-section"
      aria-labelledby="services-heading"
    >
      <div className="services-section__container">
        <motion.h2
          id="services-heading"
          className="services-section__title"
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {t("services.title")}
        </motion.h2>

        <StoryMascot
          pose="crafting-gesture"
          align="right"
          size="md"
          delay={0.12}
        />

        <motion.p
          className="services-section__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {t("services.subtitle")}
        </motion.p>

        <div className="services-section__grid">
          {services.map((service, index) => (
            <motion.div
              key={service.key}
              className="services-card"
              initial={{ opacity: 0, y: 26 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.55,
                delay: 0.18 + index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
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
            </motion.div>
          ))}
        </div>

        <motion.div
          className="services-section__cta"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.button
            onClick={handleWhatsAppClick}
            className="services-cta-button"
            aria-label="Message Alex on WhatsApp to discuss your project"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            {t("services.cta")}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
