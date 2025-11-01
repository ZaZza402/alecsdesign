import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Phone,
  MessageCircle,
} from "lucide-react";
import "./Footer.css";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const [showContact, setShowContact] = useState(false);

  // Obfuscated contact info to prevent crawler harvesting
  const getEmail = () => {
    const parts = ["mka.alecs", "gmail", "com"];
    return `${parts[0]}@${parts[1]}.${parts[2]}`;
  };

  const getPhone = () => {
    const parts = ["380", "150", "3074"];
    return `+${parts[0]} ${parts[1]} ${parts[2]}`;
  };

  const getWhatsApp = () => {
    return `https://wa.me/380150${String.fromCharCode(51, 48, 55, 52)}`;
  };

  const getFacebook = () => {
    return "https://www.facebook.com/ax.m826/";
  };

  const getInstagram = () => {
    return "https://www.instagram.com/alex.zm8/";
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Company info */}
          <div className="footer-column">
            <h3 className="footer-heading">{t("footer.company.title")}</h3>
            <p className="footer-text">{t("footer.company.description")}</p>
            <div className="footer-contact">
              {!showContact ? (
                <button
                  className="reveal-contact-btn"
                  onClick={() => setShowContact(true)}
                >
                  <Mail size={18} />
                  <span>{t("footer.revealContact")}</span>
                </button>
              ) : (
                <>
                  <div className="contact-item">
                    <Mail size={18} />
                    <a href={`mailto:${getEmail()}`}>{getEmail()}</a>
                  </div>
                  <div className="contact-item">
                    <Phone size={18} />
                    <a href={`tel:${getPhone().replace(/\s/g, "")}`}>
                      {getPhone()}
                    </a>
                  </div>
                  <div className="contact-item">
                    <MessageCircle size={18} />
                    <a
                      href={getWhatsApp()}
                      target="_blank"
                      rel="noopener noreferrer"
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
                <a href="#about">{t("footer.quickLinks.about")}</a>
              </li>
              <li>
                <a href="#portfolio">{t("footer.quickLinks.portfolio")}</a>
              </li>
              <li>
                <a href="#pricing">{t("footer.quickLinks.pricing")}</a>
              </li>
              <li>
                <a href="#contact">{t("footer.quickLinks.contact")}</a>
              </li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div className="footer-column">
            <h3 className="footer-heading">{t("footer.legal.title")}</h3>
            <ul className="footer-links">
              <li>
                <a href="#privacy">{t("footer.legal.privacy")}</a>
              </li>
              <li>
                <a href="#terms">{t("footer.legal.terms")}</a>
              </li>
            </ul>

            <div className="social-links">
              <h4 className="social-heading">{t("footer.social.title")}</h4>
              <div className="social-icons">
                <a
                  href={getFacebook()}
                  className="social-icon"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href={getInstagram()}
                  className="social-icon"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            © {currentYear} {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
