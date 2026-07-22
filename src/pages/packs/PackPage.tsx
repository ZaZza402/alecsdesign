import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { getPackBySlug } from "../packData";
import "../PacksHub.css";

interface PackItem {
  id: string;
  slug: string;
  meta: {
    title: string;
    description: string;
    keywords?: string[];
  };
  product: {
    title: string;
    tagline: string;
    price: string;
    currency: string;
    buyLink: string;
    license: string;
  };
  images?: {
    overview?: string;
    featureOne?: string;
    featureTwo?: string;
  };
  specs?: {
    formatsIncluded?: string[];
    canvasSize?: string;
    vectorStyle?: string;
    fileCount?: string;
  };
  includedItems?: string[];
  faq?: Array<{ question: string; answer: string }>;
  translations?: Record<
    string,
    {
      meta?: { title?: string; description?: string };
      product?: { title?: string; tagline?: string };
      intro?: string;
      faq?: Array<{ question: string; answer: string }>;
    }
  >;
}

function getLocalizedPack(packItem: PackItem, lang: string) {
  const translation =
    packItem.translations?.[lang] ?? packItem.translations?.en;
  return {
    meta: {
      title: translation?.meta?.title ?? packItem.meta.title,
      description: translation?.meta?.description ?? packItem.meta.description,
      keywords: packItem.meta.keywords ?? [],
    },
    product: {
      title: translation?.product?.title ?? packItem.product.title,
      tagline: translation?.product?.tagline ?? packItem.product.tagline,
      price: packItem.product.price,
      currency: packItem.product.currency,
      buyLink: packItem.product.buyLink,
      license: packItem.product.license,
    },
    intro: translation?.intro ?? packItem.meta.description,
    faq: translation?.faq ?? packItem.faq ?? [],
  };
}

export default function PackPage({ lang = "en" }: { lang?: string }) {
  const { slug } = useParams();
  const { t } = useTranslation();
  const currentLang = ["en", "it", "ro"].includes(lang ?? "en")
    ? (lang ?? "en")
    : "en";
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(0);
  }, [slug]);

  const currentPack = slug
    ? (getPackBySlug(slug) as PackItem | undefined)
    : undefined;

  if (!slug || !currentPack) {
    return (
      <div className="pack-page">
        <Helmet>
          <title>{t("packs.page.notFoundTitle")}</title>
          <meta
            name="description"
            content={t("packs.page.notFoundDescription")}
          />
        </Helmet>
        <Link
          to={currentLang === "en" ? "/packs" : `/${currentLang}/packs`}
          className="pack-page__back"
        >
          ← {t("packs.page.backToPacks")}
        </Link>
        <h1 className="pack-page__title">{t("packs.page.notFoundTitle")}</h1>
        <p className="pack-page__tagline">
          {t("packs.page.notFoundDescription")}
        </p>
      </div>
    );
  }

  const localized = getLocalizedPack(currentPack, currentLang);
  const currentUrl =
    currentLang === "en"
      ? `https://alecsdesign.xyz/packs/${currentPack.slug}`
      : `https://alecsdesign.xyz/${currentLang}/packs/${currentPack.slug}`;
  const galleryImages = [
    currentPack.images?.overview,
    currentPack.images?.featureOne,
    currentPack.images?.featureTwo,
  ].filter((src): src is string => Boolean(src));
  const hasMultipleImages = galleryImages.length > 1;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: localized.product.title,
    description: localized.meta.description,
    image: [
      `https://alecsdesign.xyz${currentPack.images?.overview ?? "/images/packs/machinery/overview-grid.svg"}`,
    ],
    brand: {
      "@type": "Brand",
      name: "Alecs Design",
    },
    offers: {
      "@type": "Offer",
      price: localized.product.price,
      priceCurrency: localized.product.currency,
      availability: "https://schema.org/InStock",
      url: localized.product.buyLink,
    },
    keywords: localized.meta.keywords,
  };

  return (
    <div className="pack-page">
      <Helmet>
        <title>{localized.meta.title}</title>
        <meta name="description" content={localized.meta.description} />
        <meta name="keywords" content={localized.meta.keywords.join(", ")} />
        <link rel="canonical" href={currentUrl} />
        <link
          rel="alternate"
          hrefLang="en"
          href={`https://alecsdesign.xyz/packs/${currentPack.slug}`}
        />
        <link
          rel="alternate"
          hrefLang="it"
          href={`https://alecsdesign.xyz/it/packs/${currentPack.slug}`}
        />
        <link
          rel="alternate"
          hrefLang="ro"
          href={`https://alecsdesign.xyz/ro/packs/${currentPack.slug}`}
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`https://alecsdesign.xyz/packs/${currentPack.slug}`}
        />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <Link
        to={currentLang === "en" ? "/packs" : `/${currentLang}/packs`}
        className="pack-page__back"
      >
        ← {t("packs.page.backToPacks")}
      </Link>

      <div className="pack-page__hero">
        <div className="pack-page__content">
          <p className="pack-page__eyebrow">{t("packs.page.collection")}</p>
          <h1 className="pack-page__title">{localized.product.title}</h1>
          <p className="pack-page__tagline">{localized.product.tagline}</p>
          <p className="pack-page__tagline">{localized.intro}</p>
          <div className="pack-page__actions">
            <a
              href={localized.product.buyLink}
              target="_blank"
              rel="noreferrer"
              className="pack-page__button pack-page__button--primary"
            >
              {t("packs.page.buyNow")}
            </a>
            <Link
              to={currentLang === "en" ? "/packs" : `/${currentLang}/packs`}
              className="pack-page__button pack-page__button--secondary"
            >
              {t("packs.page.backToPacks")}
            </Link>
          </div>
        </div>

        <div
          className="pack-page__image-slider"
          aria-label={localized.product.title}
        >
          <div
            className="pack-page__image-track"
            style={{ transform: `translateX(-${activeImage * 100}%)` }}
          >
            {galleryImages.map((src, index) => (
              <div key={`${src}-${index}`} className="pack-page__image-slide">
                <img
                  src={src}
                  alt={`${localized.product.title} ${index + 1}`}
                />
              </div>
            ))}
          </div>

          {hasMultipleImages && (
            <div className="pack-page__image-controls">
              <button
                type="button"
                className="pack-page__image-button"
                onClick={() =>
                  setActiveImage((prev) =>
                    prev === 0 ? galleryImages.length - 1 : prev - 1,
                  )
                }
                aria-label={t("packs.page.previousImage")}
              >
                ←
              </button>

              <div
                className="pack-page__image-dots"
                role="tablist"
                aria-label="Gallery navigation"
              >
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`pack-page__image-dot${activeImage === index ? " pack-page__image-dot--active" : ""}`}
                    onClick={() => setActiveImage(index)}
                    aria-label={`${t("packs.page.image")} ${index + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                className="pack-page__image-button"
                onClick={() =>
                  setActiveImage((prev) =>
                    prev === galleryImages.length - 1 ? 0 : prev + 1,
                  )
                }
                aria-label={t("packs.page.nextImage")}
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="pack-page__grid">
        <div className="pack-page__panel">
          <h2 className="pack-page__panel-title">
            {t("packs.page.specifications")}
          </h2>
          <div className="pack-page__meta-list">
            <div className="pack-page__meta-item">
              <span className="pack-page__meta-label">
                {t("packs.page.price")}
              </span>
              <p className="pack-page__meta-value">
                {localized.product.price} {localized.product.currency}
              </p>
            </div>
            <div className="pack-page__meta-item">
              <span className="pack-page__meta-label">
                {t("packs.page.license")}
              </span>
              <p className="pack-page__meta-value">
                {localized.product.license}
              </p>
            </div>
            <div className="pack-page__meta-item">
              <span className="pack-page__meta-label">
                {t("packs.page.formats")}
              </span>
              <p className="pack-page__meta-value">
                {currentPack.specs?.formatsIncluded?.join(", ")}
              </p>
            </div>
            <div className="pack-page__meta-item">
              <span className="pack-page__meta-label">
                {t("packs.page.canvasSize")}
              </span>
              <p className="pack-page__meta-value">
                {currentPack.specs?.canvasSize}
              </p>
            </div>
            <div className="pack-page__meta-item">
              <span className="pack-page__meta-label">
                {t("packs.page.vectorStyle")}
              </span>
              <p className="pack-page__meta-value">
                {currentPack.specs?.vectorStyle}
              </p>
            </div>
            <div className="pack-page__meta-item">
              <span className="pack-page__meta-label">
                {t("packs.page.fileCount")}
              </span>
              <p className="pack-page__meta-value">
                {currentPack.specs?.fileCount}
              </p>
            </div>
          </div>
        </div>

        <div className="pack-page__panel">
          <h2 className="pack-page__panel-title">
            {t("packs.page.includedItems")}
          </h2>
          <div className="pack-page__items">
            {currentPack.includedItems?.map((item) => (
              <div key={item} className="pack-page__item">
                <p className="pack-page__item-text">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pack-page__panel" style={{ marginTop: "1.25rem" }}>
        <h2 className="pack-page__panel-title">{t("packs.page.faq")}</h2>
        <div className="pack-page__faq-list">
          {localized.faq.map((entry) => (
            <div key={entry.question} className="pack-page__faq-item">
              <p className="pack-page__faq-question">{entry.question}</p>
              <p className="pack-page__faq-answer">{entry.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
