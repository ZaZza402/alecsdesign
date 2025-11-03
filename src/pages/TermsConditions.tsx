import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Sidebar from "../components/layout/Sidebar";
import BottomNav from "../components/layout/BottomNav";
import MobileLanguageLabel from "../components/ui/MobileLanguageLabel";
import "./LegalPage.css";

const TermsConditions = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    navigate(`/${i18n.language}`);
  };

  return (
    <>
      <Sidebar />
      <MobileLanguageLabel />
      <div className="legal-page">
      <div className="legal-container">
        <button onClick={handleBack} className="back-button">
          <ArrowLeft size={20} />
          <span>{t("legal.backToHome")}</span>
        </button>

        <h1 className="legal-title">{t("legal.terms.title")}</h1>
        <p className="legal-update">
          {t("legal.lastUpdated")}: November 3, 2025
        </p>

        <div className="legal-content">
          <section className="legal-section">
            <h2>{t("legal.terms.acceptance.title")}</h2>
            <p>{t("legal.terms.acceptance.text")}</p>
          </section>

          <section className="legal-section">
            <h2>{t("legal.terms.services.title")}</h2>
            <p>{t("legal.terms.services.text")}</p>
          </section>

          <section className="legal-section">
            <h2>{t("legal.terms.project.title")}</h2>
            <p>{t("legal.terms.project.intro")}</p>
            <ul>
              <li>{t("legal.terms.project.item1")}</li>
              <li>{t("legal.terms.project.item2")}</li>
              <li>{t("legal.terms.project.item3")}</li>
              <li>{t("legal.terms.project.item4")}</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>{t("legal.terms.payment.title")}</h2>
            <p>{t("legal.terms.payment.text")}</p>
          </section>

          <section className="legal-section">
            <h2>{t("legal.terms.intellectual.title")}</h2>
            <p>{t("legal.terms.intellectual.text")}</p>
          </section>

          <section className="legal-section">
            <h2>{t("legal.terms.warranty.title")}</h2>
            <p>{t("legal.terms.warranty.text")}</p>
          </section>

          <section className="legal-section">
            <h2>{t("legal.terms.limitation.title")}</h2>
            <p>{t("legal.terms.limitation.text")}</p>
          </section>

          <section className="legal-section">
            <h2>{t("legal.terms.termination.title")}</h2>
            <p>{t("legal.terms.termination.text")}</p>
          </section>

          <section className="legal-section">
            <h2>{t("legal.terms.governing.title")}</h2>
            <p>{t("legal.terms.governing.text")}</p>
          </section>

          <section className="legal-section">
            <h2>{t("legal.terms.changes.title")}</h2>
            <p>{t("legal.terms.changes.text")}</p>
          </section>

          <section className="legal-section">
            <h2>{t("legal.terms.contact.title")}</h2>
            <p>{t("legal.terms.contact.text")}</p>
          </section>
        </div>
      </div>
    </div>
      <BottomNav />
    </>
  );
};

export default TermsConditions;
