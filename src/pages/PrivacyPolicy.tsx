import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./LegalPage.css";

const PrivacyPolicy = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    navigate(`/${i18n.language}`);
  };

  return (
    <div className="legal-page">
      <div className="legal-container">
        <button onClick={handleBack} className="back-button">
          <ArrowLeft size={20} />
          <span>{t("legal.backToHome")}</span>
        </button>

        <h1 className="legal-title">{t("legal.privacy.title")}</h1>
        <p className="legal-update">
          {t("legal.lastUpdated")}: November 3, 2025
        </p>

        <div className="legal-content">
          <section className="legal-section">
            <h2>{t("legal.privacy.intro.title")}</h2>
            <p>{t("legal.privacy.intro.text")}</p>
          </section>

          <section className="legal-section">
            <h2>{t("legal.privacy.dataCollection.title")}</h2>
            <p>{t("legal.privacy.dataCollection.intro")}</p>
            <ul>
              <li>{t("legal.privacy.dataCollection.item1")}</li>
              <li>{t("legal.privacy.dataCollection.item2")}</li>
              <li>{t("legal.privacy.dataCollection.item3")}</li>
              <li>{t("legal.privacy.dataCollection.item4")}</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>{t("legal.privacy.dataUse.title")}</h2>
            <p>{t("legal.privacy.dataUse.intro")}</p>
            <ul>
              <li>{t("legal.privacy.dataUse.item1")}</li>
              <li>{t("legal.privacy.dataUse.item2")}</li>
              <li>{t("legal.privacy.dataUse.item3")}</li>
              <li>{t("legal.privacy.dataUse.item4")}</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>{t("legal.privacy.analytics.title")}</h2>
            <p>{t("legal.privacy.analytics.text")}</p>
          </section>

          <section className="legal-section">
            <h2>{t("legal.privacy.cookies.title")}</h2>
            <p>{t("legal.privacy.cookies.text")}</p>
          </section>

          <section className="legal-section">
            <h2>{t("legal.privacy.thirdParty.title")}</h2>
            <p>{t("legal.privacy.thirdParty.text")}</p>
          </section>

          <section className="legal-section">
            <h2>{t("legal.privacy.dataProtection.title")}</h2>
            <p>{t("legal.privacy.dataProtection.text")}</p>
          </section>

          <section className="legal-section">
            <h2>{t("legal.privacy.yourRights.title")}</h2>
            <p>{t("legal.privacy.yourRights.intro")}</p>
            <ul>
              <li>{t("legal.privacy.yourRights.item1")}</li>
              <li>{t("legal.privacy.yourRights.item2")}</li>
              <li>{t("legal.privacy.yourRights.item3")}</li>
              <li>{t("legal.privacy.yourRights.item4")}</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>{t("legal.privacy.contact.title")}</h2>
            <p>{t("legal.privacy.contact.text")}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
