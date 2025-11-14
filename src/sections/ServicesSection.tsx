import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import i18n from "../i18n";
import "./ServicesSection.css";

const ServicesSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleViewFullRates = () => {
    navigate(`/${i18n.language}/services-rates`);
  };

  return (
    <section id="services" className="services-section">
      <div className="services-container">
        <div className="services-header">
          <h2 className="services-title">
            {t("servicesRates.servicesOverview.title")}
          </h2>
          <p className="services-subtitle">
            {t("servicesRates.servicesOverview.subtitle")}
          </p>
        </div>

        <div className="services-preview">
          <div className="service-category">
            <h3 className="category-title">
              {t("servicesRates.servicesOverview.webDesign")}
            </h3>
            <p className="category-description">
              {t("servicesRates.servicesOverview.webDesignDesc")}
            </p>
          </div>

          <div className="service-category">
            <h3 className="category-title">
              {t("servicesRates.servicesOverview.webDevelopment")}
            </h3>
            <p className="category-description">
              {t("servicesRates.servicesOverview.webDevelopmentDesc")}
            </p>
          </div>

          <div className="service-category">
            <h3 className="category-title">
              {t("servicesRates.servicesOverview.maintenance")}
            </h3>
            <p className="category-description">
              {t("servicesRates.servicesOverview.maintenanceDesc")}
            </p>
          </div>
        </div>

        <div className="services-cta">
          <button
            className="view-full-rates-button"
            onClick={handleViewFullRates}
          >
            <span>{t("servicesRates.servicesOverview.viewFullRates")}</span>
            <ExternalLink size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
