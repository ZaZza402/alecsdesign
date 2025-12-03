import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "../utils/seo";
import profileImage from "../assets/zxcvbnm.webp";
import "./AboutPage.css";

const AboutPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      <SEO
        title={`${t("about.seo.title")} | AlecsDesign`}
        description={t("about.seo.description")}
        keywords="web developer, about alex, alecsdesign, italy web design"
      />

      <div className="about-container">
        <div className="about-grid">
          <h1 className="about-headline">{t("about.title")}</h1>

          <div className="about-content-column">
            <div className="about-body">
              {t("about.body")
                .split("\n\n")
                .map((paragraph, index) => (
                  <p
                    key={index}
                    style={{ marginBottom: "1.5rem" }}
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  />
                ))}
            </div>

            <div className="about-signature">{t("about.signature")}</div>

            <div className="about-cta-container">
              <Link to="/contact" className="about-cta-btn">
                {t("about.cta")}
              </Link>
            </div>
          </div>

          <div className="about-image-column">
            <div className="about-image-wrapper">
              <div className="about-image-frame"></div>
              <img
                src={profileImage}
                alt="Alex - Web Developer"
                className="about-image"
              />
            </div>

            <div className="about-location">
              <MapPin size={16} />
              <span>{t("about.location")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
