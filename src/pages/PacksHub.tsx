import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { getPackList } from "./packData";
import "./PacksHub.css";

const packs = getPackList();

export default function PacksHub({ lang = "en" }: { lang?: string }) {
  const { t } = useTranslation();
  const currentLang = ["en", "it", "ro"].includes(lang) ? lang : "en";
  const basePath = currentLang === "en" ? "/packs" : `/${currentLang}/packs`;

  const hubTitle = t("packs.hub.title");
  const hubSubtitle = t("packs.hub.subtitle");
  const viewLabel = t("packs.page.viewPack");

  return (
    <>
      <Helmet>
        <title>{hubTitle}</title>
        <meta name="description" content={hubSubtitle} />
        <link rel="canonical" href={`https://www.alecsdesign.xyz${basePath}`} />
        <link
          rel="alternate"
          hrefLang="en"
          href="https://www.alecsdesign.xyz/packs"
        />
        <link
          rel="alternate"
          hrefLang="it"
          href="https://www.alecsdesign.xyz/it/packs"
        />
        <link
          rel="alternate"
          hrefLang="ro"
          href="https://www.alecsdesign.xyz/ro/packs"
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://www.alecsdesign.xyz/packs"
        />
      </Helmet>

      <div className="packs-hub">
        <div className="packs-hub__header">
          <p className="packs-hub__eyebrow">{t("packs.hub.eyebrow")}</p>
          <h1 className="packs-hub__title">{hubTitle}</h1>
          <p className="packs-hub__subtitle">{hubSubtitle}</p>
        </div>

        <div className="packs-hub__list" role="list">
          {packs.map((pack) => {
            const localized = pack.translations?.[currentLang];
            const title = localized?.product?.title ?? pack.product.title;
            const tagline = localized?.product?.tagline ?? pack.product.tagline;
            const intro = localized?.intro ?? pack.meta.description;
            const href = `${basePath}/${pack.slug}`;

            return (
              <Link
                key={pack.id}
                to={href}
                className="packs-hub__card"
                role="listitem"
              >
                <div className="packs-hub__card-top">
                  <span className="packs-hub__card-label">
                    {t("packs.hub.cardLabel")}
                  </span>
                  <span className="packs-hub__card-arrow">→</span>
                </div>
                <h2 className="packs-hub__card-title">{title}</h2>
                <p className="packs-hub__card-tagline">{tagline}</p>
                <p className="packs-hub__card-description">{intro}</p>
                <span className="packs-hub__card-link">{viewLabel}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
