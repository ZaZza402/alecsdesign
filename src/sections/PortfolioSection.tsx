import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Check, ChevronDown } from "lucide-react";
import "./PortfolioSection.css";

interface Project {
  id: string;
  url: string;
  image: string;
  category: string;
  model: string;
  description: string;
  features: string[];
  tech: string;
}

const PortfolioSection = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(
    new Set()
  );
  const [filter, setFilter] = useState<string>("all");
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const projects = t("portfolio.projects", {
    returnObjects: true,
  }) as Project[];

  const toggleProject = (projectId: string) => {
    const isCurrentlyExpanded = expandedProjects.has(projectId);

    setExpandedProjects((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });

    // Scroll card into view when expanding
    if (!isCurrentlyExpanded) {
      setTimeout(() => {
        const cardElement = cardRefs.current[projectId];
        if (cardElement) {
          cardElement.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }
      }, 50);
    }
  };

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    if (filter === "buy") return project.model.toLowerCase().includes("buy");
    if (filter === "subscribe")
      return project.model.toLowerCase().includes("subscribe");
    return true;
  });

  return (
    <section id="portfolio" className="portfolio-section" ref={ref}>
      <div className={`portfolio-container ${inView ? "animate-in" : ""}`}>
        <div className="portfolio-header">
          <h2 className="portfolio-title">{t("portfolio.title")}</h2>
          <p className="portfolio-subtitle">{t("portfolio.subtitle")}</p>
        </div>

        {/* Filter Buttons */}
        <div
          className="portfolio-filters"
          data-aos="fade-up"
          data-aos-duration="600"
        >
          <button
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            {t("portfolio.filterAll")}
          </button>
          <button
            className={`filter-btn ${filter === "buy" ? "active" : ""}`}
            onClick={() => setFilter("buy")}
          >
            {t("portfolio.filterBuy")}
          </button>
          <button
            className={`filter-btn ${filter === "subscribe" ? "active" : ""}`}
            onClick={() => setFilter("subscribe")}
          >
            {t("portfolio.filterSubscribe")}
          </button>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => {
            const isExpanded = expandedProjects.has(project.id);
            return (
              <div
                key={project.id}
                ref={(el) => {
                  cardRefs.current[project.id] = el;
                }}
                className={`project-card ${isExpanded ? "expanded" : ""}`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-duration="600"
              >
                {/* Always visible: Image */}
                <div className="project-image-wrapper">
                  <img
                    src={project.image}
                    alt={project.category}
                    className="project-image"
                    loading="lazy"
                  />
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-image-overlay"
                    aria-label={t("portfolio.viewProject")}
                  >
                    <ExternalLink size={32} />
                  </a>
                </div>

                {/* Expandable content */}
                <div
                  className={`project-content ${
                    isExpanded ? "expanded" : "collapsed"
                  }`}
                >
                  <div className="project-header">
                    <span className="project-category">{project.category}</span>
                    <div className="project-model-badge">{project.model}</div>
                  </div>

                  {isExpanded && (
                    <>
                      <p className="project-description">
                        {project.description}
                      </p>

                      <div className="project-features">
                        <h4 className="features-title">
                          {t("portfolio.featuresTitle")}:
                        </h4>
                        <ul className="features-list">
                          {project.features.map((feature, idx) => (
                            <li key={idx} className="feature-item">
                              <Check size={16} className="feature-check" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="project-tech">
                        <strong>{t("portfolio.techStackTitle")}:</strong>{" "}
                        {project.tech}
                      </div>
                    </>
                  )}

                  {/* Action Buttons */}
                  <div className="project-actions">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-cta project-cta-visit"
                    >
                      <ExternalLink size={16} />
                      {t("portfolio.visitLive")}
                    </a>
                    <button
                      onClick={() => toggleProject(project.id)}
                      className="project-cta project-cta-toggle"
                    >
                      {isExpanded
                        ? t("portfolio.showLess")
                        : t("portfolio.seeDetails")}
                      <ChevronDown
                        size={16}
                        className={`chevron-icon ${
                          isExpanded ? "rotated" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
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
