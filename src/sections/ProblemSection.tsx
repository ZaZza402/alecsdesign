import { useTranslation } from "react-i18next";
import "./ProblemSection.css";

const ProblemSection = () => {
  const { t } = useTranslation();

  const points = [
    { key: "point1" },
    { key: "point2" },
    { key: "point3" },
    { key: "point4" },
  ];

  return (
    <section className="problem-section">
      <div className="problem-container">
        <div className="problem-content">
          <h2
            className="problem-title"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            {t("problem.title")}
          </h2>

          <div className="points-list">
            {points.map((point, index) => {
              return (
                <div
                  key={point.key}
                  className="point-item"
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-delay={index * 100}
                >
                  <span className="point-bullet">—</span>
                  <p className="point-text">{t(`problem.${point.key}`)}</p>
                </div>
              );
            })}
          </div>

          <p
            className="problem-description"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="400"
          >
            {t("problem.description")}
          </p>

          <button
            onClick={() => {
              const section = document.getElementById("how-it-works");
              section?.scrollIntoView({ behavior: "smooth" });
            }}
            className="problem-cta"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="500"
          >
            {t("problem.cta")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
