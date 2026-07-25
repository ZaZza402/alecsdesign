import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { SEO } from "../utils/seo";
import { trackButtonClick } from "../utils/analytics";
import "./HelpRequestPage.css";

type HelpRequestPageProps = { lang: string };
type RequestFormState = {
  category: string;
  details: string;
  email: string;
  honeypot: string;
};
type CategoryOption = { value: string; label: string };
type ShareNavigator = Navigator & {
  share?: (data: { title?: string; text?: string; url?: string }) => Promise<void>;
  clipboard?: { writeText?: (text: string) => Promise<void> };
};

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
  const helpImageSrc = `/images/help/${activeLang}/help.webp`;
  const helpImageAbsolute = `https://www.alecsdesign.xyz${helpImageSrc}`;
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
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: helpImageAbsolute,
          width: 2800,
          height: 1500,
        },
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
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);
  const canUseNativeShare = useMemo(() => {
    if (typeof window === "undefined") return false;
    const browserNavigator = window.navigator as ShareNavigator;
    return typeof browserNavigator.share === "function";
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!shareFeedback) return;
    const timeoutId = window.setTimeout(() => setShareFeedback(null), 3200);
    return () => window.clearTimeout(timeoutId);
  }, [shareFeedback]);

  const handleShare = async () => {
    const browserNavigator: ShareNavigator | null =
      typeof window !== "undefined" ? (window.navigator as ShareNavigator) : null;

    const copyLink = async () => {
      try {
        if (
          browserNavigator?.clipboard?.writeText &&
          typeof window !== "undefined" &&
          window.isSecureContext
        ) {
          await browserNavigator.clipboard.writeText(canonical);
          return true;
        }

        if (typeof document !== "undefined") {
          const textarea = document.createElement("textarea");
          textarea.value = canonical;
          textarea.setAttribute("readonly", "true");
          textarea.style.position = "absolute";
          textarea.style.left = "-9999px";
          document.body.appendChild(textarea);
          textarea.select();
          const successful = document.execCommand("copy");
          document.body.removeChild(textarea);
          if (successful) return true;
        }
      } catch {
        return false;
      }

      return false;
    };

    const shareData = {
      title: t("helpRequest.seo.title"),
      text: t("helpRequest.shareText"),
      url: canonical,
    };

    try {
      if (browserNavigator?.share) {
        await browserNavigator.share(shareData);
        trackButtonClick("Share Help Request Page", "Help Request Page");
        return;
      }

      if (await copyLink()) {
        setShareFeedback(t("helpRequest.shareCopied"));
        trackButtonClick("Copy Help Request Link", "Help Request Page");
        return;
      }

      setShareFeedback(t("helpRequest.shareUnavailable"));
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;

      if (await copyLink()) {
        setShareFeedback(t("helpRequest.shareCopied"));
        trackButtonClick("Copy Help Request Link", "Help Request Page");
        return;
      }

      setShareFeedback(t("helpRequest.shareUnavailable"));
    }
  };

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
        ogImage={helpImageAbsolute}
        canonical={canonical}
        jsonLd={requestSchema}
      />
      <div className="help-request-page__wrap">
        <div className="help-request-page__top-actions">
          <Link to={prefix || "/"} className="help-request-page__home-link">
            <Home size={16} />
            <span>{t("helpRequest.homeButton")}</span>
          </Link>
          <button
            type="button"
            className="help-request-page__share-button"
            onClick={handleShare}
          >
            {canUseNativeShare
              ? t("helpRequest.shareButton")
              : t("helpRequest.copyLinkButton")}
          </button>
        </div>
        {shareFeedback ? (
          <p
            className="help-request-page__share-feedback"
            role="status"
            aria-live="polite"
          >
            {shareFeedback}
          </p>
        ) : null}

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
