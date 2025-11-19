import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import CookieBanner from "../components/ui/CookieBanner";
import ScrollProgress from "../components/ui/ScrollProgress";
import LanguageSuggestionBanner from "../components/ui/LanguageSuggestionBanner";
import MetallicBackground from "../components/ui/backgrounds/MetallicBackground";
import "./LegalPage.css";

const CookiePolicy = () => {
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
      <MetallicBackground />
      <LanguageSuggestionBanner />
      <Header />
      <div className="legal-page" style={{ paddingTop: "80px" }}>
        <div className="legal-container">
          <button onClick={handleBack} className="back-button">
            <ArrowLeft size={20} />
            <span>{t("legal.backToHome")}</span>
          </button>

          <h1 className="legal-title">{t("legal.cookies.title")}</h1>
          <p className="legal-update">
            {t("legal.lastUpdated")}: November 17, 2025
          </p>

          <div className="legal-content">
            <section className="legal-section">
              <h2>{t("legal.cookies.what.title")}</h2>
              <p>{t("legal.cookies.what.text")}</p>
            </section>

            <section className="legal-section">
              <h2>{t("legal.cookies.types.title")}</h2>

              <h3>{t("legal.cookies.types.essential.title")}</h3>
              <p>{t("legal.cookies.types.essential.text")}</p>

              <h3>{t("legal.cookies.types.analytics.title")}</h3>
              <p>{t("legal.cookies.types.analytics.text")}</p>

              <h3>{t("legal.cookies.types.functional.title")}</h3>
              <p>{t("legal.cookies.types.functional.text")}</p>
            </section>

            <section className="legal-section">
              <h2>{t("legal.cookies.weUse.title")}</h2>
              <ul>
                <li>
                  <strong>{t("legal.cookies.weUse.item1.name")}</strong>:{" "}
                  {t("legal.cookies.weUse.item1.desc")}
                </li>
                <li>
                  <strong>{t("legal.cookies.weUse.item2.name")}</strong>:{" "}
                  {t("legal.cookies.weUse.item2.desc")}
                </li>
                <li>
                  <strong>{t("legal.cookies.weUse.item3.name")}</strong>:{" "}
                  {t("legal.cookies.weUse.item3.desc")}
                </li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>{t("legal.cookies.thirdParty.title")}</h2>
              <p>{t("legal.cookies.thirdParty.text")}</p>
            </section>

            <section className="legal-section">
              <h2>{t("legal.cookies.manage.title")}</h2>
              <p>{t("legal.cookies.manage.text")}</p>
            </section>

            <section className="legal-section">
              <h2>{t("legal.cookies.updates.title")}</h2>
              <p>{t("legal.cookies.updates.text")}</p>
            </section>

            <section className="legal-section">
              <h2>{t("legal.cookies.contact.title")}</h2>
              <p>{t("legal.cookies.contact.text")}</p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
      <CookieBanner />
      <ScrollProgress />
    </>
  );
};

export default CookiePolicy;
