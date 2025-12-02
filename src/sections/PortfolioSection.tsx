import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { X, ExternalLink, ChevronRight } from "lucide-react";
import "./PortfolioSection.css";

// Bind modal to appElement for accessibility
Modal.setAppElement("#root");

interface Project {
  id: string;
  url: string;
  image: string;
  title: string;
  description: string;
  canPreview: boolean;
}

const PortfolioSection = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const projects: Project[] = [
    {
      id: "immigration-agency",
      url: "https://www.puntomigrare.it",
      image: "/portfolio-assets/website-puntomigrare-mockup.webp",
      title: "Punto Migrare",
      description: t("portfolio.projects.immigration-agency.description"),
      canPreview: true,
    },
    {
      id: "psychologist",
      url: "https://www.popescumaria.ro",
      image: "/portfolio-assets/website-psiholog-mockup.webp",
      title: "Psiholog Portfolio",
      description: t("portfolio.projects.psychologist.description"),
      canPreview: false,
    },
    {
      id: "sartoria",
      url: "https://sartoria-viorel.vercel.app",
      image: "/portfolio-assets/website-sartoria-mockup.webp",
      title: "Sartoria Vio",
      description: t("portfolio.projects.sartoria.description"),
      canPreview: false,
    },
    {
      id: "restaurant",
      url: "https://ristorante13.alecsdesign.xyz",
      image: "/portfolio-assets/website-restaurant-mockup.webp",
      title: "Ristorante 13",
      description: t("portfolio.projects.restaurant.description"),
      canPreview: false,
    },
  ];

  const openPreview = (project: Project, e: React.MouseEvent) => {
    if (!project.canPreview) {
      // Allow default behavior (open in new tab) if preview is not supported
      return;
    }
    e.preventDefault();
    setCurrentUrl(project.url);
    setModalIsOpen(true);
    setIsLoading(true);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  const closePreview = () => {
    setModalIsOpen(false);
    setCurrentUrl("");
    document.body.style.overflow = "unset";
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <section className="portfolio-section" id="portfolio">
      <div className="portfolio-container">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`portfolio-item ${index % 2 !== 0 ? "reverse" : ""}`}
          >
            <div className="portfolio-image-container">
              <img
                src={project.image}
                alt={project.title}
                className="portfolio-image"
                loading="lazy"
              />
            </div>
            <div className="portfolio-content">
              <h3 className="portfolio-logo">{project.title}</h3>
              <p className="portfolio-description">{project.description}</p>
              <a
                href={project.url}
                target={project.canPreview ? "_self" : "_blank"}
                rel={project.canPreview ? "" : "noopener noreferrer"}
                onClick={(e) => openPreview(project, e)}
                className="portfolio-cta"
              >
                {t("portfolio.visitWebsite")} <ChevronRight size={16} />
              </a>
            </div>
          </div>
        ))}

        <div className="portfolio-footer">
          <button
            onClick={() => {
              const lang = i18n.language;
              const route = lang === "en" ? "/portfolio" : `/${lang}/portfolio`;
              navigate(route);
              window.scrollTo(0, 0);
            }}
            className="view-all-btn"
          >
            {t("portfolio.viewAllProjects")}
          </button>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closePreview}
        contentLabel="Website Preview"
        className="preview-modal"
        overlayClassName="preview-overlay"
        closeTimeoutMS={300}
      >
        <div className="browser-frame">
          <div className="browser-header">
            <div className="browser-controls">
              <span className="control red"></span>
              <span className="control yellow"></span>
              <span className="control green"></span>
            </div>
            <div className="browser-address-bar">
              <span className="lock-icon">🔒</span>
              <span className="address-url">{currentUrl}</span>
            </div>
            <div className="browser-actions">
              <a
                href={currentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="open-external"
                title="Open in new tab"
              >
                <ExternalLink size={18} />
              </a>
              <button
                onClick={closePreview}
                className="close-preview"
                title="Close preview"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          <div className="browser-content">
            {isLoading && (
              <div className="preview-loader">
                <div className="spinner"></div>
                <p>Loading preview...</p>
              </div>
            )}
            <iframe
              src={currentUrl}
              title="Website Preview"
              className="preview-iframe"
              onLoad={handleIframeLoad}
            />
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default PortfolioSection;
