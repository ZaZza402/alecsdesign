import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { SEO } from "../utils/seo";
import "./HelpRequestPage.css";

type HelpRequestPageProps = { lang: string };
type RequestFormState = {
  category: string;
  details: string;
  email: string;
  honeypot: string;
};
type CategoryOption = { value: string; label: string };

const HelpRequestPage = ({ lang }: HelpRequestPageProps) => {
  const { t } = useTranslation();
  const prefix = lang === "en" ? "" : `/${lang}`;
  const activeLang = lang === "it" || lang === "ro" ? lang : "en";
  const canonical =
    lang === "en"
      ? "https://www.alecsdesign.xyz/help/request"
      : `https://www.alecsdesign.xyz/${lang}/help/request`;
  const helpPageUrl =
    lang === "en"
      ? "https://www.alecsdesign.xyz/help"
      : `https://www.alecsdesign.xyz/${lang}/help`;
  const requestSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["ContactPage", "WebPage"],
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: t("helpRequest.seo.title"),
        description: t("helpRequest.seo.description"),
        inLanguage: activeLang,
        isPartOf: {
          "@id": "https://www.alecsdesign.xyz/#website",
        },
      },
      {
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: t("helpRequest.seo.title"),
        serviceType: "Digital support request",
        provider: {
          "@type": "Organization",
          name: "alecsdesign",
          url: "https://www.alecsdesign.xyz",
        },
        areaServed: ["IT", "RO", "EU"],
        availableLanguage: ["en", "it", "ro"],
        potentialAction: {
          "@type": "CommunicateAction",
          name: t("helpRequest.submit"),
          target: canonical,
        },
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
            item: helpPageUrl,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: t("helpRequest.seo.title"),
            item: canonical,
          },
        ],
      },
    ],
  };
  const categories = useMemo(
    () =>
      t("helpRequest.categories", { returnObjects: true }) as CategoryOption[],
    [t],
  );

  const [form, setForm] = useState<RequestFormState>({
    category: "",
    details: "",
    email: "",
    honeypot: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isValid =
    form.category.trim() !== "" &&
    form.details.trim().length >= 10 &&
    form.email.trim().includes("@");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid) return;
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      if (import.meta.env.DEV) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        setIsSubmitted(true);
        return;
      }

      const response = await fetch("/api/help", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Request failed");
      setIsSubmitted(true);
    } catch {
      setErrorMessage(t("helpRequest.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="help-request-page">
      <SEO
        title={`${t("helpRequest.seo.title")} | AlecsDesign`}
        description={t("helpRequest.seo.description")}
        keywords={t("helpRequest.seo.keywords")}
        canonical={canonical}
        jsonLd={requestSchema}
      />
      <div className="help-request-page__wrap">
        <Link to={prefix || "/"} className="help-request-page__home-link">
          <Home size={16} />
          <span>{t("helpRequest.homeButton")}</span>
        </Link>

        <div className="help-request-page__layout">
          <header className="help-request-page__intro">
            <p className="help-request-page__eyebrow">
              {t("helpRequest.eyebrow")}
            </p>
            <h1 className="help-request-page__title">
              {t("helpRequest.title")}
            </h1>
            <p className="help-request-page__subtitle">
              {t("helpRequest.subtitle")}
            </p>
            <p className="help-request-page__note">
              {t("helpRequest.formNote")}
            </p>
          </header>

          <section
            className="help-request-page__card"
            aria-label={t("helpRequest.title")}
          >
            {isSubmitted ? (
              <div className="help-request-page__success">
                <h2>{t("helpRequest.successTitle")}</h2>
                <p>{t("helpRequest.successBody")}</p>
              </div>
            ) : (
              <form className="help-request-form" onSubmit={handleSubmit}>
                <div className="help-request-form__field">
                  <label htmlFor="help-category">
                    {t("helpRequest.fields.category")}
                  </label>
                  <select
                    id="help-category"
                    value={form.category}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        category: event.target.value,
                      }))
                    }
                    required
                  >
                    <option value="">
                      {t("helpRequest.categoryPlaceholder")}
                    </option>
                    {categories.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="help-request-form__field">
                  <label htmlFor="help-details">
                    {t("helpRequest.fields.details")}
                  </label>
                  <textarea
                    id="help-details"
                    rows={7}
                    value={form.details}
                    placeholder={t("helpRequest.detailsPlaceholder")}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        details: event.target.value,
                      }))
                    }
                    required
                  />
                </div>

                <div className="help-request-form__field">
                  <label htmlFor="help-email">
                    {t("helpRequest.fields.email")}
                  </label>
                  <input
                    id="help-email"
                    type="email"
                    value={form.email}
                    placeholder={t("helpRequest.emailPlaceholder")}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="help-request-form__honeypot" aria-hidden="true">
                  <label htmlFor="help-honeypot">
                    {t("helpRequest.fields.honeypot")}
                  </label>
                  <input
                    id="help-honeypot"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.honeypot}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        honeypot: event.target.value,
                      }))
                    }
                  />
                </div>

                {errorMessage ? (
                  <p className="help-request-form__error">{errorMessage}</p>
                ) : null}

                <button
                  type="submit"
                  className="help-request-form__submit"
                  disabled={isSubmitting || !isValid}
                >
                  {isSubmitting
                    ? `${t("helpRequest.submit")}...`
                    : t("helpRequest.submit")}
                </button>
              </form>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default HelpRequestPage;
