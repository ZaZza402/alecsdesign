import { useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import { ExternalLink } from "lucide-react";
import { SEO } from "../utils/seo";
import "./PortfolioPage.css";

interface Project {
  id: string;
  image: string;
  url: string;
}

const PortfolioPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const projects: Project[] = [
    {
      id: "puntomigrare",
      image: "/portfolio/website-puntomigrare-mockup.webp",
      url: "https://www.puntomigrare.it",
    },
    {
      id: "psychologist",
      image: "/portfolio/website-psiholog-mockup.webp",
      url: "https://www.popescumaria.ro",
    },
    {
      id: "sartoria",
      image: "/portfolio/website-sartoria-mockup.webp",
      url: "https://sartoria-viorel.vercel.app",
    },
    {
      id: "restaurant",
      image: "/portfolio/website-restaurant-mockup.webp",
      url: "https://ristorante13.alecsdesign.xyz",
    },
    {
      id: "ctx",
      image: "/portfolio/website-fintech-template-mockup.webp",
      url: "https://ctx.alecsdesign.xyz",
    },
    {
      id: "velvet",
      image: "/portfolio/website-bar-velvet-mockup.webp",
      url: "https://velvet-shaker.alecsdesign.xyz",
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
    </div>
  );
};

export default PortfolioPage;
