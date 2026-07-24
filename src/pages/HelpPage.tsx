import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SEO } from "../utils/seo";
import "./HelpPage.css";

type HelpPageProps = { lang: string };
type FaqSchemaItem = { question: string; answer: string };

const HelpPage = ({ lang }: HelpPageProps) => {
  const { t } = useTranslation();
  const prefix = lang === "en" ? "" : `/${lang}`;
  const activeLang = lang === "it" || lang === "ro" ? lang : "en";
  const languageCode = activeLang;
  const canonical =
    lang === "en"
      ? "https://www.alecsdesign.xyz/help"
      : `https://www.alecsdesign.xyz/${lang}/help`;
  const examples = t("help.sections.examples", {
    returnObjects: true,
  }) as string[];
  const helpImageSrc = `/images/help/${activeLang}/help.webp`;
  const requestUrl = `https://www.alecsdesign.xyz${prefix}/help/request`;

  const localizedFaq = t("help.seoFaq", {
    returnObjects: true,
  }) as FaqSchemaItem[];
  const fallbackFaq: FaqSchemaItem[] = [
    {
      question: t("help.sections.whatItIsTitle"),
      answer: t("help.sections.whatItIsBody"),
    },
    {
      question: t("help.sections.whatToSendTitle"),
      answer: t("help.sections.whatToSendBody"),
    },
    {
      question: t("help.sections.howItWorksTitle"),
      answer: t("help.sections.howItWorksBody"),
    },
    {
      question: t("help.sections.responseTitle"),
      answer: t("help.sections.responseBody"),
    },
    {
      question: t("help.sections.limitsTitle"),
      answer: t("help.sections.limitsBody"),
    },
  ];
  const faqSource =
    Array.isArray(localizedFaq) && localizedFaq.length > 0
      ? localizedFaq
      : fallbackFaq;

  const faqEntities = faqSource.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  }));

  const helpSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: t("help.seo.title"),
        description: t("help.seo.description"),
        inLanguage: languageCode,
        isPartOf: {
          "@id": "https://www.alecsdesign.xyz/#website",
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `https://www.alecsdesign.xyz${helpImageSrc}`,
          width: 2800,
          height: 1500,
        },
      },
      {
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: t("help.title"),
        description: t("help.seo.description"),
        serviceType: "Digital support",
        provider: {
          "@type": "Organization",
          name: "alecsdesign",
          url: "https://www.alecsdesign.xyz",
        },
        areaServed: ["IT", "RO", "EU"],
        availableLanguage: ["en", "it", "ro"],
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: requestUrl,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonical}#faq`,
        mainEntity: faqEntities,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.alecsdesign.xyz/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: t("help.seo.title"),
            item: canonical,
          },
        ],
      },
    ],
  };

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
        jsonLd={helpSchema}
      />

      <section className="help-page__media-strip" aria-label={t("help.title")}>
        <figure className="help-page__media-card">
          <img
            src={helpImageSrc}
            alt={t("help.title")}
            loading="lazy"
            decoding="async"
            width={2800}
            height={1500}
          />
        </figure>
      </section>

      <div className="help-page__wrap">
        <Link
          to={`${prefix}/help/request`}
          className="help-page__cta help-page__cta--top"
        >
          <span>{t("help.requestButton")}</span>
          <ArrowRight size={16} />
        </Link>

        <header className="help-page__hero">
          <p className="help-page__eyebrow">{t("help.eyebrow")}</p>
          <h1 className="help-page__title">{t("help.title")}</h1>
          <p className="help-page__subtitle">{t("help.subtitle")}</p>
          <p className="help-page__note">{t("help.freeNote")}</p>
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

        <div className="help-page__bottom-cta-wrap">
          <Link
            to={`${prefix}/help/request`}
            className="help-page__cta help-page__cta--bottom"
          >
            <span>{t("help.requestButton")}</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
