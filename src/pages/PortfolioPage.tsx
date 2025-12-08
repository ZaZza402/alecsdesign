import { useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { ExternalLink, X } from "lucide-react";
import Modal from "react-modal";
import { SEO } from "../utils/seo";
import "./PortfolioPage.css";

// Bind modal to app element
Modal.setAppElement("#root");

interface Project {
  id: string;
  image: string;
  url: string;
  canPreview: boolean;
}

const PortfolioPage = () => {
  const { t } = useTranslation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get intro text arrays from translation
  const websitePoints = t("portfolioPage.intro.websitePoints", {
    returnObjects: true,
  }) as string[];
  const webappPoints = t("portfolioPage.intro.webappPoints", {
    returnObjects: true,
  }) as string[];

  const projects: Project[] = [
    {
      id: "puntomigrare",
      image: "/portfolio-assets/website-puntomigrare-mockup.webp",
      url: "https://www.puntomigrare.it",
      canPreview: true,
    },
    {
      id: "psychologist",
      image: "/portfolio-assets/website-psiholog-mockup.webp",
      url: "https://www.popescumaria.ro",
      canPreview: false, // Blocked by X-Frame-Options
    },
    {
      id: "sartoria",
      image: "/portfolio-assets/website-sartoria-mockup.webp",
      url: "https://www.sartoriaviorel.it",
      canPreview: true,
    },
    {
      id: "restaurant",
      image: "/portfolio-assets/website-restaurant-mockup.webp",
      url: "https://ristorante13.alecsdesign.xyz",
      canPreview: true,
    },
    {
      id: "ctx",
      image: "/portfolio-assets/website-fintech-template-mockup.webp",
      url: "https://ctx.alecsdesign.xyz",
      canPreview: true,
    },
    {
      id: "velvet",
      image: "/portfolio-assets/website-bar-velvet-mockup.webp",
      url: "https://velvet-shaker.alecsdesign.xyz",
      canPreview: false,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("portfolioPage.title"),
    description: t("portfolioPage.subtitle"),
    url: typeof window !== "undefined" ? window.location.href : "",
    hasPart: projects.map((project) => ({
      "@type": "CreativeWork",
      name: t(`portfolioPage.projects.${project.id}.title`),
      description: t(`portfolioPage.projects.${project.id}.description`),
      url: project.url,
    })),
  };

  const openPreview = (
    e: React.MouseEvent,
    url: string,
    title: string,
    canPreview: boolean
  ) => {
    if (!canPreview) return;
    e.preventDefault();
    setCurrentUrl(url);
    setCurrentTitle(title);
    setIsLoading(true);
    setModalIsOpen(true);
  };

  const closePreview = () => {
    setModalIsOpen(false);
    setCurrentUrl("");
    setCurrentTitle("");
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="portfolio-page">
      <SEO
        title={`${t("portfolioPage.title")} | AlecsDesign`}
        description={t("portfolioPage.subtitle")}
        keywords="web design portfolio, react projects, typescript websites, tailwind css examples"
        jsonLd={jsonLd}
      />
      <div className="portfolio-page-container">
        <div className="portfolio-page-header">
          <h1 className="portfolio-page-title">
            <Trans
              i18nKey="portfolioPage.subtitle"
              components={[<span className="text-primary-light" />]}
            />
          </h1>
        </div>

        {/* Educational Article Section */}
        <article className="portfolio-intro-article">
          <h2 className="article-heading">
            {t("portfolioPage.intro.heading")}
          </h2>

          <div className="article-content">
            <p
              className="article-paragraph"
              dangerouslySetInnerHTML={{
                __html: t("portfolioPage.intro.paragraph1"),
              }}
            />
            <p
              className="article-paragraph"
              dangerouslySetInnerHTML={{
                __html: t("portfolioPage.intro.paragraph2"),
              }}
            />
            <p
              className="article-paragraph"
              dangerouslySetInnerHTML={{
                __html: t("portfolioPage.intro.paragraph3"),
              }}
            />
            <p
              className="article-callout"
              dangerouslySetInnerHTML={{
                __html: t("portfolioPage.intro.paragraph4"),
              }}
            />
          </div>

          <h3 className="comparison-heading">
            {t("portfolioPage.intro.comparisonHeading")}
          </h3>

          <div className="comparison-grid">
            <div className="comparison-card website-card">
              <h4 className="comparison-title">
                {t("portfolioPage.intro.websiteLabel")}
              </h4>
              <ul className="comparison-list">
                {Array.isArray(websitePoints) &&
                  websitePoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
              </ul>
            </div>

            <div className="comparison-card webapp-card">
              <h4 className="comparison-title">
                {t("portfolioPage.intro.webappLabel")}
              </h4>
              <ul className="comparison-list">
                {Array.isArray(webappPoints) &&
                  webappPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="article-closing">
            <h3 className="closing-heading">
              {t("portfolioPage.intro.closingHeading")}
            </h3>
            <p
              className="closing-text"
              dangerouslySetInnerHTML={{
                __html: t("portfolioPage.intro.closingText"),
              }}
            />
          </div>
        </article>

        <div className="portfolio-grid">
          {projects.map((project) => {
            // Get tech stack as array from translation
            const stack = t(`portfolioPage.projects.${project.id}.stack`, {
              returnObjects: true,
            }) as string[];

            return (
              <article key={project.id} className="portfolio-card">
                <div className="portfolio-card-image-container">
                  <img
                    src={project.image}
                    alt={t(`portfolioPage.projects.${project.id}.title`)}
                    className="portfolio-card-image"
                    loading="lazy"
                  />
                </div>
                <div className="portfolio-card-content">
                  <h2 className="portfolio-card-title">
                    {t(`portfolioPage.projects.${project.id}.title`)}
                  </h2>
                  <p className="portfolio-card-description">
                    {t(`portfolioPage.projects.${project.id}.description`)}
                  </p>

                  <div className="portfolio-tech-stack">
                    <span className="tech-stack-label">
                      {t("portfolioPage.techStack")}
                    </span>
                    <div className="tech-tags">
                      {Array.isArray(stack) &&
                        stack.map((tech, index) => (
                          <span key={index} className="tech-tag">
                            {tech}
                          </span>
                        ))}
                    </div>
                  </div>

                  <div className="portfolio-card-footer">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="visit-site-btn"
                      onClick={(e) =>
                        openPreview(
                          e,
                          project.url,
                          t(`portfolioPage.projects.${project.id}.title`),
                          project.canPreview
                        )
                      }
                    >
                      {t("portfolioPage.visitWebsite")}{" "}
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
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
            <div className="browser-actions">
              <button
                onClick={closePreview}
                className="close-preview"
                aria-label="Close preview"
              >
                <X size={20} />
              </button>
            </div>
            <div className="browser-title">{currentTitle}</div>
            <div style={{ width: 36 }}></div> {/* Spacer for centering */}
          </div>
          <div className="browser-content">
            {isLoading && (
              <div className="preview-loader">
                <div className="spinner"></div>
                <p>Loading preview...</p>
              </div>
            )}
            {currentUrl && (
              <iframe
                src={currentUrl}
                className="preview-iframe"
                title="Website Preview"
                onLoad={handleIframeLoad}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              />
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PortfolioPage;
