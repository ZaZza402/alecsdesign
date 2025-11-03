import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";
import Sidebar from "../components/layout/Sidebar";
import BottomNav from "../components/layout/BottomNav";
import MobileLanguageLabel from "../components/ui/MobileLanguageLabel";
import "./NotFound.css";

const NotFound = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGoHome = () => {
    navigate(`/${i18n.language}`);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <>
      <Sidebar />
      <MobileLanguageLabel />
      <div className="notfound-page">
        <div className="notfound-background">
          <div className="notfound-circle circle-1"></div>
          <div className="notfound-circle circle-2"></div>
          <div className="notfound-circle circle-3"></div>
        </div>

        <div className="notfound-container">
          <div className="notfound-icon-wrapper">
            <Search className="notfound-icon" size={80} />
          </div>

          <h1 className="notfound-title">404</h1>
          <h2 className="notfound-subtitle">{t("notFound.title")}</h2>
          <p className="notfound-description">{t("notFound.description")}</p>

          <div className="notfound-actions">
            <button
              onClick={handleGoBack}
              className="notfound-btn notfound-btn-secondary"
            >
              <ArrowLeft size={20} />
              <span>{t("notFound.goBack")}</span>
            </button>
            <button
              onClick={handleGoHome}
              className="notfound-btn notfound-btn-primary"
            >
              <Home size={20} />
              <span>{t("notFound.goHome")}</span>
            </button>
          </div>

          <div className="notfound-suggestions">
            <p className="suggestions-title">
              {t("notFound.suggestions.title")}
            </p>
            <ul className="suggestions-list">
              <li>{t("notFound.suggestions.item1")}</li>
              <li>{t("notFound.suggestions.item2")}</li>
              <li>{t("notFound.suggestions.item3")}</li>
            </ul>
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  );
};

export default NotFound;
