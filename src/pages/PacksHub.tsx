import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getPackList } from "../utils/packsData";
import { SEO } from "../utils/seo";
import {
  trackDesignCardClick,
  trackDesignContactIntent,
  trackPageView,
} from "../utils/analytics";
import "./PacksHub.css";

const packs = getPackList();

export default function PacksHub({ lang = "en" }: { lang?: string }) {
  const { t } = useTranslation();
  const currentLang = ["en", "it", "ro"].includes(lang) ? lang : "en";
  const basePath =
    currentLang === "en" ? "/designs" : `/${currentLang}/designs`;
  const contactPath =
    currentLang === "en" ? "/contact" : `/${currentLang}/contact`;

  const hubTitle = t("packs.hub.title");
  const hubSubtitle = t("packs.hub.subtitle");
  const viewLabel = t("packs.page.viewPack");

  useEffect(() => {
    if (typeof window === "undefined") return;
    trackPageView(window.location.href, hubTitle);
  }, [hubTitle, currentLang]);

  return (
    <>
      <SEO
        title={hubTitle}
        description={hubSubtitle}
        canonical={`https://www.alecsdesign.xyz${basePath}`}
      />

      <div className="packs-hub">
        <div className="packs-hub__header">
          <div className="packs-hub__header-main">
            <p className="packs-hub__eyebrow">{t("packs.hub.eyebrow")}</p>
            <h1 className="packs-hub__title">{hubTitle}</h1>
            <p className="packs-hub__subtitle">{hubSubtitle}</p>
            <p className="packs-hub__positioning">
              {t("packs.hub.positioning")}
            </p>
            <div className="packs-hub__quality-list" role="list">
              <span className="packs-hub__quality-item" role="listitem">
                {t("packs.hub.qualityOne")}
              </span>
              <span className="packs-hub__quality-item" role="listitem">
                {t("packs.hub.qualityTwo")}
              </span>
              <span className="packs-hub__quality-item" role="listitem">
                {t("packs.hub.qualityThree")}
              </span>
            </div>
          </div>
          <aside
            className="packs-hub__cta-rail"
            aria-label={t("packs.hub.ctaTitle")}
          >
            <p className="packs-hub__cta-eyebrow">
              {t("packs.hub.ctaEyebrow")}
            </p>
            <h2 className="packs-hub__cta-title">{t("packs.hub.ctaTitle")}</h2>
            <p className="packs-hub__cta-text">{t("packs.hub.ctaText")}</p>
            <a
              className="packs-hub__cta-button"
              href={`${contactPath}?service=designs`}
              onClick={() => trackDesignContactIntent("Designs Hub CTA Rail")}
            >
              {t("packs.hub.ctaButton")}
            </a>
          </aside>
        </div>

        <div className="packs-hub__list" role="list">
          {packs.map((pack) => {
            const localized = pack.translations?.[currentLang];
            const title = localized?.product?.title ?? pack.product.title;
            const tagline = localized?.product?.tagline ?? pack.product.tagline;
            const intro = localized?.intro ?? pack.meta.description;
            const href = `${basePath}/${pack.slug}`;
            const previewSrc =
              pack.images?.overview ??
              "/images/packs/machinery/15-warehouse-logistics-vector-icons-pack.jpg";

            return (
              <Link
                key={pack.id}
                to={href}
                className="packs-hub__card"
                role="listitem"
                onClick={() => trackDesignCardClick(pack.slug, "Designs Hub")}
              >
                <div className="packs-hub__card-main">
                  <div className="packs-hub__card-content">
                    <div className="packs-hub__card-top">
                      <span className="packs-hub__card-label">
                        {t("packs.hub.cardLabel")}
                      </span>
                      <span className="packs-hub__card-arrow">→</span>
                    </div>
                    <h2 className="packs-hub__card-title">{title}</h2>
                    <p className="packs-hub__card-tagline">{tagline}</p>
                    <p className="packs-hub__card-description">{intro}</p>
                    {pack.showcase?.problem && (
                      <p className="packs-hub__card-proof">
                        {pack.showcase.problem}
                      </p>
                    )}
                    <span className="packs-hub__card-link">{viewLabel}</span>
                  </div>
                  <div className="packs-hub__card-preview" aria-hidden="true">
                    <img src={previewSrc} alt="" loading="lazy" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
