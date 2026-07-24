import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight, Home } from "lucide-react";
import { SEO } from "../utils/seo";
import "./HelpPage.css";

type HelpPageProps = { lang: string };

const HelpPage = ({ lang }: HelpPageProps) => {
  const { t } = useTranslation();
  const prefix = lang === "en" ? "" : `/${lang}`;
  const canonical =
    lang === "en"
      ? "https://www.alecsdesign.xyz/help"
      : `https://www.alecsdesign.xyz/${lang}/help`;
  const examples = t("help.sections.examples", {
    returnObjects: true,
  }) as string[];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="help-page">
      <SEO
        title={`${t("help.seo.title")} | AlecsDesign`}
        description={t("help.seo.description")}
        keywords={t("help.seo.keywords")}
        canonical={canonical}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: t("help.title"),
          serviceType: "Digital support",
          provider: {
            "@type": "Organization",
            name: "alecsdesign",
            url: "https://www.alecsdesign.xyz",
          },
          areaServed: ["IT", "RO", "EU"],
          description: t("help.seo.description"),
        }}
      />

      <div className="help-page__wrap">
        <Link to={prefix || "/"} className="help-page__home-link">
          <Home size={16} />
          <span>{t("help.homeButton")}</span>
        </Link>

        <header className="help-page__hero">
          <p className="help-page__eyebrow">{t("help.eyebrow")}</p>
          <h1 className="help-page__title">{t("help.title")}</h1>
          <p className="help-page__subtitle">{t("help.subtitle")}</p>
          <p className="help-page__note">{t("help.freeNote")}</p>
          <Link to={`${prefix}/help/request`} className="help-page__cta">
            <span>{t("help.requestButton")}</span>
            <ArrowRight size={16} />
          </Link>
        </header>

        <section className="help-page__grid" aria-label={t("help.title")}>
          <article className="help-page__card">
            <h2>{t("help.sections.whatItIsTitle")}</h2>
            <p>{t("help.sections.whatItIsBody")}</p>
          </article>
          <article className="help-page__card">
            <h2>{t("help.sections.whatToSendTitle")}</h2>
            <p>{t("help.sections.whatToSendBody")}</p>
          </article>
          <article className="help-page__card">
            <h2>{t("help.sections.howItWorksTitle")}</h2>
            <p>{t("help.sections.howItWorksBody")}</p>
          </article>
          <article className="help-page__card">
            <h2>{t("help.sections.responseTitle")}</h2>
            <p>{t("help.sections.responseBody")}</p>
          </article>
          <article className="help-page__card help-page__card--wide">
            <h2>{t("help.sections.limitsTitle")}</h2>
            <p>{t("help.sections.limitsBody")}</p>
            <div className="help-page__examples">
              <h3>{t("help.sections.examplesTitle")}</h3>
              <ul>
                {examples.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};

export default HelpPage;
