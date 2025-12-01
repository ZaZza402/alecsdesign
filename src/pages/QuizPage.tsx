import { useTranslation } from "react-i18next";
import ProjectCalculator from "../components/calculator/ProjectCalculator";
import { SEO } from "../utils/seo";
import "./QuizPage.css";

const QuizPage = () => {
  const { t } = useTranslation();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Project Needs Assessment Calculator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    description: t("quiz.meta.description"),
    featureList:
      "Project cost estimation, Timeline calculation, Technology recommendation",
  };

  return (
    <div className="quiz-page">
      <SEO
        title={t("quiz.meta.title")}
        description={t("quiz.meta.description")}
        keywords="web design calculator, project cost estimator, website price calculator, web development quote"
        jsonLd={jsonLd}
      />
      <div className="quiz-container">
        <ProjectCalculator />
      </div>
    </div>
  );
};

export default QuizPage;
