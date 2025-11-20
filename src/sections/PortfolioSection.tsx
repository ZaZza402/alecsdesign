import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { ExternalLink } from "lucide-react";
import { trackSectionView } from "../utils/analytics";
import "./PortfolioSection.css";

interface Project {
  id: string;
  url: string;
  image: string;
  category: string;
  techStack: string;
}

const PortfolioSection = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Track section view
  useEffect(() => {
    if (inView) {
      trackSectionView("Portfolio Section");
    }
  }, [inView]);

  const projects = t("portfolio.projects", {
    returnObjects: true,
  }) as Project[];

  // Reorder: velvet-shaker (bar) → immigration-agency (services) → psychologist
  const reorderedProjects = [
    projects.find((p) => p.id === "velvet-shaker"),
    projects.find((p) => p.id === "immigration-agency"),
    projects.find((p) => p.id === "psychologist"),
  ].filter(Boolean) as Project[];

  return (
    <section id="portfolio" className="portfolio-section" ref={ref}>
      <div className={`portfolio-container ${inView ? "animate-in" : ""}`}>
        <div className="portfolio-header">
          <h2 className="portfolio-title">{t("portfolio.title")}</h2>
          <p className="portfolio-subtitle">{t("portfolio.subtitle")}</p>
        </div>

        <div className="projects-grid">
          {reorderedProjects.map((project, index) => (
            <div
              key={project.id}
              className="project-card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
              data-aos-duration="600"
            >
              <div className="project-image-wrapper">
                <img
                  src={project.image}
                  alt={project.category}
                  className="project-image"
                  loading="lazy"
                />
              </div>

              <div className="project-overlay">
                <div className="project-info">
                  <h3 className="project-title">{project.category}</h3>
                  <p className="project-tech">{project.techStack}</p>
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-visit-link"
                >
                  <ExternalLink size={20} />
                  {t("portfolio.visitLive")}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="portfolio-cta-section">
          <h3 className="portfolio-cta-title">{t("portfolio.cta.title")}</h3>
          <p className="portfolio-cta-subtitle">
            {t("portfolio.cta.subtitle")}
          </p>
          <a href="#contact" className="portfolio-cta-button">
            {t("portfolio.cta.button")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
