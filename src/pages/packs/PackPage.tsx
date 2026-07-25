import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getPackBySlug, type PackItem } from "../../utils/packsData";
import { SEO } from "../../utils/seo";
import {
  trackDesignAssetCheckout,
  trackDesignContactIntent,
  trackDesignGalleryInteraction,
  trackPageView,
} from "../../utils/analytics";
import "../PacksHub.css";

function getLocalizedPack(
  packItem: PackItem,
  lang: string,
  t: (key: string) => string,
) {
  const translation =
    packItem.translations?.[lang] ?? packItem.translations?.en;
  const baseProof = packItem.showcase?.craftsmanshipProof;
  const translatedProof = translation?.showcase?.craftsmanshipProof;

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
    showcase: {
      brief: translation?.showcase?.brief ?? packItem.showcase?.brief ?? "",
      problem:
        translation?.showcase?.problem ?? packItem.showcase?.problem ?? "",
      solution:
        translation?.showcase?.solution ?? packItem.showcase?.solution ?? "",
      usageMockups: packItem.showcase?.usageMockups ?? [],
      craftsmanshipProof: {
        title:
          translatedProof?.title ??
          baseProof?.title ??
          t("packs.page.craftsmanshipTitle"),
        description:
          translatedProof?.description ??
          baseProof?.description ??
          t("packs.page.craftsmanshipDescription"),
        wireframeImage:
          baseProof?.wireframeImage ??
          packItem.images?.wireframe ??
          packItem.images?.featureOne ??
          packItem.images?.overview,
        finalImage:
          baseProof?.finalImage ??
          packItem.images?.finalDetail ??
          packItem.images?.overview,
        wireframeLabel:
          translatedProof?.wireframeLabel ??
          baseProof?.wireframeLabel ??
          t("packs.page.wireframe"),
        finalLabel:
          translatedProof?.finalLabel ??
          baseProof?.finalLabel ??
          t("packs.page.finalRender"),
      },
    },
    cta: {
      title:
        translation?.cta?.title ??
        packItem.cta?.title ??
        t("packs.page.defaultCtaTitle"),
      subtitle:
        translation?.cta?.subtitle ??
        packItem.cta?.subtitle ??
        t("packs.page.defaultCtaSubtitle"),
      primaryLabel:
        translation?.cta?.primaryLabel ??
        packItem.cta?.primaryLabel ??
        t("packs.page.contactNow"),
      secondaryLabel:
        translation?.cta?.secondaryLabel ??
        packItem.cta?.secondaryLabel ??
        t("packs.page.buyNow"),
      scopeOptions:
        translation?.cta?.scopeOptions ?? packItem.cta?.scopeOptions ?? [],
    },
    imageAlts: {
      overview:
        translation?.imageAlts?.overview ?? `${t("packs.page.image")} 1`,
      featureOne:
        translation?.imageAlts?.featureOne ?? `${t("packs.page.image")} 2`,
      featureTwo:
        translation?.imageAlts?.featureTwo ?? `${t("packs.page.image")} 3`,
      wireframe: translation?.imageAlts?.wireframe ?? t("packs.page.wireframe"),
      finalDetail:
        translation?.imageAlts?.finalDetail ?? t("packs.page.finalRender"),
    },
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
        <SEO
          title={t("packs.page.notFoundTitle")}
          description={t("packs.page.notFoundDescription")}
        />
        <Link
          to={currentLang === "en" ? "/designs" : `/${currentLang}/designs`}
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

  const localized = getLocalizedPack(currentPack, currentLang, t);
  const contactPath =
    currentLang === "en" ? "/contact" : `/${currentLang}/contact`;
  const contactHref = `${contactPath}?service=designs`;
  const currentUrl =
    currentLang === "en"
      ? `https://www.alecsdesign.xyz/designs/${currentPack.slug}`
      : `https://www.alecsdesign.xyz/${currentLang}/designs/${currentPack.slug}`;
  const galleryImages = [
    currentPack.images?.overview,
    currentPack.images?.featureOne,
    currentPack.images?.featureTwo,
  ].filter((src): src is string => Boolean(src));
  const hasMultipleImages = galleryImages.length > 1;
  const toAbsoluteUrl = (src?: string) =>
    src
      ? src.startsWith("http")
        ? src
        : `https://www.alecsdesign.xyz${src}`
      : undefined;

  const schemaImages = Array.from(
    new Set(
      [
        currentPack.images?.overview,
        currentPack.images?.featureOne,
        currentPack.images?.featureTwo,
        localized.showcase.craftsmanshipProof.wireframeImage,
        localized.showcase.craftsmanshipProof.finalImage,
      ]
        .map(toAbsoluteUrl)
        .filter((value): value is string => Boolean(value)),
    ),
  );

  const creativeWorkSchema = {
    "@type": "CreativeWork",
    "@id": `${currentUrl}#creative-work`,
    name: localized.product.title,
    description: localized.meta.description,
    image: schemaImages,
    inLanguage: currentLang,
    keywords: [
      ...localized.meta.keywords,
      ...(currentPack.seo?.processDescriptors ?? []),
    ],
    creator: {
      "@type": "Organization",
      name: "Alecs Design",
      url: "https://www.alecsdesign.xyz",
    },
    url: currentUrl,
  };

  const hasOffer = Boolean(
    localized.product.buyLink &&
    localized.product.price &&
    localized.product.currency,
  );

  const productSchema = hasOffer
    ? {
        "@type": "Product",
        "@id": `${currentUrl}#product`,
        name: localized.product.title,
        description: localized.meta.description,
        image: schemaImages,
        brand: {
          "@type": "Brand",
          name: "Alecs Design",
        },
        isRelatedTo: { "@id": `${currentUrl}#creative-work` },
        offers: {
          "@type": "Offer",
          price: localized.product.price,
          priceCurrency: localized.product.currency,
          availability: "https://schema.org/InStock",
          url: localized.product.buyLink,
        },
        keywords: localized.meta.keywords,
      }
    : null;

  const schema = {
    "@context": "https://schema.org",
    "@graph": productSchema
      ? [creativeWorkSchema, productSchema]
      : [creativeWorkSchema],
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    trackPageView(window.location.href, localized.meta.title);
  }, [localized.meta.title, currentPack.slug]);

  return (
    <div className="pack-page">
      <SEO
        title={localized.meta.title}
        description={localized.meta.description}
        keywords={localized.meta.keywords.join(", ")}
        canonical={currentUrl}
        ogType="article"
        jsonLd={schema}
      />

      <Link
        to={currentLang === "en" ? "/designs" : `/${currentLang}/designs`}
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
            <Link
              to={contactHref}
              className="pack-page__button pack-page__button--primary"
              onClick={() =>
                trackDesignContactIntent(
                  "Design Detail Primary CTA",
                  currentPack.slug,
                )
              }
            >
              {t("packs.page.contactNow")}
            </Link>
            <Link
              to={currentLang === "en" ? "/designs" : `/${currentLang}/designs`}
              className="pack-page__button pack-page__button--secondary"
            >
              {t("packs.page.backToPacks")}
            </Link>
            {localized.product.buyLink && (
              <a
                href={localized.product.buyLink}
                target="_blank"
                rel="noreferrer"
                className="pack-page__button pack-page__button--ghost"
                onClick={() => trackDesignAssetCheckout(currentPack.slug)}
              >
                {t("packs.page.buyNow")}
              </a>
            )}
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
                  alt={
                    index === 0
                      ? localized.imageAlts.overview
                      : index === 1
                        ? localized.imageAlts.featureOne
                        : localized.imageAlts.featureTwo
                  }
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
                  setActiveImage((prev) => {
                    const nextIndex =
                      prev === 0 ? galleryImages.length - 1 : prev - 1;
                    trackDesignGalleryInteraction(
                      "previous",
                      currentPack.slug,
                      nextIndex,
                    );
                    return nextIndex;
                  })
                }
                aria-label={t("packs.page.previousImage")}
              >
                ←
              </button>

              <div
                className="pack-page__image-dots"
                role="tablist"
                aria-label={t("packs.page.galleryNavigation")}
              >
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`pack-page__image-dot${activeImage === index ? " pack-page__image-dot--active" : ""}`}
                    onClick={() => {
                      setActiveImage(index);
                      trackDesignGalleryInteraction(
                        "dot",
                        currentPack.slug,
                        index,
                      );
                    }}
                    aria-label={`${t("packs.page.image")} ${index + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                className="pack-page__image-button"
                onClick={() =>
                  setActiveImage((prev) => {
                    const nextIndex =
                      prev === galleryImages.length - 1 ? 0 : prev + 1;
                    trackDesignGalleryInteraction(
                      "next",
                      currentPack.slug,
                      nextIndex,
                    );
                    return nextIndex;
                  })
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
            {t("packs.page.processTitle")}
          </h2>
          <div className="pack-page__process-list">
            <div className="pack-page__process-item">
              <span className="pack-page__meta-label">
                {t("packs.page.brief")}
              </span>
              <p className="pack-page__meta-value">
                {localized.showcase.brief}
              </p>
            </div>
            <div className="pack-page__process-item">
              <span className="pack-page__meta-label">
                {t("packs.page.problem")}
              </span>
              <p className="pack-page__meta-value">
                {localized.showcase.problem}
              </p>
            </div>
            <div className="pack-page__process-item">
              <span className="pack-page__meta-label">
                {t("packs.page.solution")}
              </span>
              <p className="pack-page__meta-value">
                {localized.showcase.solution}
              </p>
            </div>
          </div>
        </div>

        <div className="pack-page__panel">
          <h2 className="pack-page__panel-title">
            {t("packs.page.craftsmanshipTitle")}
          </h2>
          <p
            className="pack-page__meta-value"
            style={{ marginBottom: "0.8rem" }}
          >
            {localized.showcase.craftsmanshipProof.description}
          </p>
          <div className="pack-page__proof-grid">
            <div className="pack-page__proof-card">
              <span className="pack-page__meta-label">
                {localized.showcase.craftsmanshipProof.wireframeLabel ??
                  t("packs.page.wireframe")}
              </span>
              {localized.showcase.craftsmanshipProof.wireframeImage && (
                <img
                  src={localized.showcase.craftsmanshipProof.wireframeImage}
                  alt={localized.imageAlts.wireframe}
                  className="pack-page__proof-image"
                  loading="lazy"
                />
              )}
            </div>
            <div className="pack-page__proof-card">
              <span className="pack-page__meta-label">
                {localized.showcase.craftsmanshipProof.finalLabel ??
                  t("packs.page.finalRender")}
              </span>
              {localized.showcase.craftsmanshipProof.finalImage && (
                <img
                  src={localized.showcase.craftsmanshipProof.finalImage}
                  alt={localized.imageAlts.finalDetail}
                  className="pack-page__proof-image"
                  loading="lazy"
                />
              )}
            </div>
          </div>
          {localized.showcase.usageMockups.length > 0 && (
            <div style={{ marginTop: "0.9rem" }}>
              <span className="pack-page__meta-label">
                {t("packs.page.usageMockups")}
              </span>
              <ul className="pack-page__usage-list">
                {localized.showcase.usageMockups.map((mockup) => (
                  <li key={mockup} className="pack-page__usage-item">
                    {mockup}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="pack-page__grid pack-page__grid--details">
        <div className="pack-page__panel">
          <h2 className="pack-page__panel-title">
            {t("packs.page.specifications")}
          </h2>
          <div className="pack-page__meta-list">
            <div className="pack-page__meta-item">
              <span className="pack-page__meta-label">
                {t("packs.page.license")}
              </span>
              <p className="pack-page__meta-value">
                {localized.product.license ?? "-"}
              </p>
            </div>
            <div className="pack-page__meta-item">
              <span className="pack-page__meta-label">
                {t("packs.page.formats")}
              </span>
              <p className="pack-page__meta-value">
                {currentPack.specs?.formatsIncluded?.join(", ") ?? "-"}
              </p>
            </div>
            <div className="pack-page__meta-item">
              <span className="pack-page__meta-label">
                {t("packs.page.canvasSize")}
              </span>
              <p className="pack-page__meta-value">
                {currentPack.specs?.canvasSize ?? "-"}
              </p>
            </div>
            <div className="pack-page__meta-item">
              <span className="pack-page__meta-label">
                {t("packs.page.vectorStyle")}
              </span>
              <p className="pack-page__meta-value">
                {currentPack.specs?.vectorStyle ?? "-"}
              </p>
            </div>
            <div className="pack-page__meta-item">
              <span className="pack-page__meta-label">
                {t("packs.page.fileCount")}
              </span>
              <p className="pack-page__meta-value">
                {currentPack.specs?.fileCount ?? "-"}
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
        <h2 className="pack-page__panel-title">{t("packs.page.scopeTitle")}</h2>
        <p className="pack-page__meta-value" style={{ marginBottom: "0.6rem" }}>
          {localized.cta.title}
        </p>
        <p className="pack-page__meta-value" style={{ marginBottom: "0.9rem" }}>
          {localized.cta.subtitle}
        </p>
        {localized.cta.scopeOptions.length > 0 && (
          <ul
            className="pack-page__scope-list"
            aria-label={t("packs.page.scopeTitle")}
          >
            {localized.cta.scopeOptions.map((scope) => (
              <li key={scope} className="pack-page__scope-item">
                {scope}
              </li>
            ))}
          </ul>
        )}
        <p className="pack-page__scope-hint">{t("packs.page.scopeHint")}</p>
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
