import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Phone,
  MessageCircle,
} from "lucide-react";
import {
  trackButtonClick,
  trackEmailClick,
  trackWhatsAppClick,
  trackExternalLink,
} from "../../utils/analytics";
import "./Footer.css";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [showContact, setShowContact] = useState(false);

  // Helper to get proper route based on language (English uses root, others use /lang prefix)
  const getLocalizedRoute = (path: string) => {
    const lang = i18n.language;
    return lang === "en" ? path : `/${lang}${path}`;
  };

  // Obfuscated contact info to prevent crawler harvesting
  const getEmail = () => {
    const parts = ["mka.alecs", "gmail", "com"];
    return `${parts[0]}@${parts[1]}.${parts[2]}`;
  };

  const getPhone = () => {
    const parts = ["39", "380", "150", "3074"];
    return `+${parts[0]} ${parts[1]} ${parts[2]} ${parts[3]}`;
  };

  const getWhatsApp = () => {
    return `https://wa.me/393801503074`;
  };

  const getFacebook = () => {
    return "https://www.facebook.com/AxiomWeb/";
  };

  const getInstagram = () => {
    return "https://www.instagram.com/alecs.dsgn/";
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Company info */}
          <div className="footer-column">
            <h3 className="footer-heading">
              alecsdesign
              <svg
                className="footer-heart"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              xyz
            </h3>
            <p className="footer-text">{t("footer.company.description")}</p>
            <div className="footer-contact">
              {!showContact ? (
                <button
                  className="reveal-contact-btn"
                  onClick={() => {
                    trackButtonClick("Reveal Contact Info", "Footer");
                    setShowContact(true);
                  }}
                >
                  <Mail size={18} />
                  <span>{t("footer.revealContact")}</span>
                </button>
              ) : (
                <>
                  <div className="contact-item">
                    <Mail size={18} />
                    <a
                      href={`mailto:${getEmail()}`}
                      onClick={() => trackEmailClick("Footer")}
                    >
                      {getEmail()}
                    </a>
                  </div>
                  <div className="contact-item">
                    <Phone size={18} />
                    <a
                      href={`tel:${getPhone().replace(/\s/g, "")}`}
                      onClick={() => trackButtonClick("Phone Call", "Footer")}
                    >
                      {getPhone()}
                    </a>
                  </div>
                  <div className="contact-item">
                    <MessageCircle size={18} />
                    <a
                      href={getWhatsApp()}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackWhatsAppClick("Footer")}
                    >
                      WhatsApp
                    </a>
                  </div>
                </>
              )}
              <div className="contact-item">
                <MapPin size={18} />
                <span>{t("footer.company.location")}</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="footer-column">
            <h3 className="footer-heading">{t("footer.quickLinks.title")}</h3>
            <ul className="footer-links">
              <li>
                <button
                  onClick={() => {
                    trackButtonClick("About", "Footer Quick Links");
                    navigate(getLocalizedRoute("/about"));
                    window.scrollTo(0, 0);
                  }}
                >
                  {t("footer.quickLinks.about")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    trackButtonClick("Portfolio", "Footer Quick Links");
                    navigate(getLocalizedRoute("/portfolio"));
                    window.scrollTo(0, 0);
                  }}
                >
                  {t("footer.quickLinks.portfolio")}
                </button>
              </li>
              <li>
                <a href="#pricing">{t("footer.quickLinks.pricing")}</a>
              </li>
              <li>
                <button
                  onClick={() => {
                    trackButtonClick("Services & Rates", "Footer Quick Links");
                    navigate(getLocalizedRoute("/services-rates"));
                  }}
                >
                  {t("nav.servicesRates")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    trackButtonClick("Contact", "Footer Quick Links");
                    navigate(getLocalizedRoute("/contact"));
                    window.scrollTo(0, 0);
                  }}
                >
                  {t("footer.quickLinks.contact")}
                </button>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="footer-column">
            <h3 className="footer-heading">{t("footer.social.title")}</h3>
            <div className="social-links">
              <div className="social-icons">
                <a
                  href={getFacebook()}
                  className="social-icon"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackExternalLink(getFacebook(), "Facebook")}
                >
                  <Facebook size={20} />
                </a>
                <a
                  href={getInstagram()}
                  className="social-icon"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackExternalLink(getInstagram(), "Instagram")}
                >
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <h4 className="footer-legal-heading">{t("footer.legal.title")}</h4>
            <ul className="footer-legal-links">
              <li>
                <button
                  onClick={() => navigate(getLocalizedRoute("/privacy-policy"))}
                >
                  {t("footer.legal.privacy")}
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    navigate(getLocalizedRoute("/terms-conditions"))
                  }
                >
                  {t("footer.legal.terms")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate(getLocalizedRoute("/cookie-policy"))}
                >
                  {t("footer.legal.cookies")}
                </button>
              </li>
            </ul>
          </div>
          <p className="copyright">
            © {currentYear} alecsdesign.xyz - All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
