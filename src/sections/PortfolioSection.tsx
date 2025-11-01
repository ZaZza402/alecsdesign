import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Clock } from "lucide-react";
import "./PortfolioSection.css";

const PortfolioSection = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const projects = [
    {
      key: "project1",
      isComingSoon: false,
      link: "#", // Update with actual link
    },
    {
      key: "project2",
      isComingSoon: false,
      link: "#", // Update with actual link
    },
    {
      key: "comingSoon",
      isComingSoon: true,
    },
  ];

  return (
    <section className="portfolio-section" ref={ref}>
      <div className={`portfolio-container ${inView ? "animate-in" : ""}`}>
        <div className="portfolio-header">
          <h2 className="portfolio-title">{t("portfolio.title")}</h2>
          <p className="portfolio-subtitle">{t("portfolio.subtitle")}</p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={project.key}
              className={`project-card ${
                project.isComingSoon ? "coming-soon" : ""
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {project.isComingSoon ? (
                <>
                  <div className="coming-soon-icon">
                    <Clock size={40} strokeWidth={1.5} />
                  </div>
                  <h3 className="project-title">
                    {t("portfolio.comingSoon.title")}
                  </h3>
                  <p className="project-description">
                    {t("portfolio.comingSoon.description")}
                  </p>
                </>
              ) : (
                <>
                  <div className="project-image-placeholder">
                    <div className="placeholder-pattern"></div>
                  </div>
                  <div className="project-content">
                    <h3 className="project-title">
                      {t(`portfolio.${project.key}.name`)}
                    </h3>
                    <p className="project-client">
                      <strong>{t("portfolio.client")}:</strong>{" "}
                      {t(`portfolio.${project.key}.client`)}
                    </p>
                    <div className="project-problem">
                      <strong>{t("portfolio.problem")}:</strong>{" "}
                      {t(`portfolio.${project.key}.problem`)}
                    </div>
                    <div className="project-solution">
                      <strong>{t("portfolio.solution")}:</strong>{" "}
                      {t(`portfolio.${project.key}.solution`)}
                    </div>
                    <div className="project-result">
                      <strong>{t("portfolio.result")}:</strong>{" "}
                      {t(`portfolio.${project.key}.result`)}
                    </div>
                  </div>
                  <a
                    href={project.link}
                    className="project-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{t("portfolio.viewProject")}</span>
                    <ExternalLink size={18} />
                  </a>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
