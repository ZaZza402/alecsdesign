import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SEO } from "../utils/seo";
import "./GuidesHub.css";

// Guide slugs per language
const GUIDE_SLUGS = {
  en: {
    websiteCost: "/guide/how-much-does-a-website-cost",
    google: "/guide/how-to-get-found-on-google",
    websiteNeeds: "/guide/what-your-website-needs",
  },
  it: {
    websiteCost: "/it/guide/quanto-costa-un-sito-web",
    google: "/it/guide/come-farsi-trovare-su-google",
    websiteNeeds: "/it/guide/cosa-deve-avere-il-sito-web",
  },
  ro: {
    websiteCost: "/ro/guide/cat-costa-un-site-web",
    google: "/ro/guide/cum-sa-apari-pe-google",
    websiteNeeds: "/ro/guide/ce-trebuie-sa-aiba-site-ul",
  },
} as const;

type Lang = keyof typeof GUIDE_SLUGS;

// Each guide's key data (will use the locale JSON already loaded in i18n)
type GuideKey = "websiteCost" | "google" | "websiteNeeds";

const GUIDE_KEYS: GuideKey[] = ["websiteCost", "google", "websiteNeeds"];

interface GuideCardData {
  title: string;
  lead: string;
  readingTime: string;
}

// First two sentences from the lead
function excerpt(text: string): string {
  const m = text.match(/^.+?\. .+?\./);
  if (m) return m[0];
  return text;
}

export default function GuidesHub({ lang }: { lang: string }) {
  const { t } = useTranslation();
  const l = (["en", "it", "ro"].includes(lang) ? lang : "en") as Lang;
  const slugs = GUIDE_SLUGS[l];

  const cards = GUIDE_KEYS.map((key) => {
    const data = t(`guides.${key}`, {
      returnObjects: true,
    }) as GuideCardData & {
      [k: string]: unknown;
    };
    return {
      key,
      slug: slugs[key],
      title: data.title,
      lead: data.lead,
      readingTime: data.readingTime,
    };
  });

  const canonical =
    l === "en"
      ? "https://www.alecsdesign.xyz/guide/"
      : `https://www.alecsdesign.xyz/${l}/guide/`;

  const seoTitles: Record<Lang, string> = {
    en: "Web Design Guides for Small Businesses | alecsdesign",
    it: "Guide Web per Piccole Imprese | alecsdesign",
    ro: "Ghiduri Web pentru Afaceri Mici | alecsdesign",
  };

  const seoDescs: Record<Lang, string> = {
    en: "Free practical guides on website costs, Google rankings, and what your business site actually needs in 2026.",
    it: "Guide pratiche gratuite sui costi di un sito, il posizionamento su Google e cosa deve avere il tuo sito nel 2026.",
    ro: "Ghiduri practice gratuite despre costurile unui site, pozitionarea pe Google si ce trebuie sa aiba site-ul tau in 2026.",
  };

  return (
    <>
      <SEO
        title={seoTitles[l]}
        description={seoDescs[l]}
        canonical={canonical}
      />

      <div className="guides-hub">
        <div className="guides-hub__header">
          <p className="guides-hub__eyebrow">{t("guideUi.hub.eyebrow")}</p>
          <h1 className="guides-hub__title">{t("guideUi.hub.title")}</h1>
          <p className="guides-hub__subtitle">{t("guideUi.hub.subtitle")}</p>
        </div>

        <div className="guides-hub__list">
          {cards.map((card, i) => (
            <Link key={card.key} to={card.slug} className="guides-hub__entry">
              <span className="guides-hub__entry-num">0{i + 1}</span>
              <div className="guides-hub__entry-body">
                <h2 className="guides-hub__entry-title">{card.title}</h2>
                <p className="guides-hub__entry-lead">{excerpt(card.lead)}</p>
                <div className="guides-hub__entry-meta">
                  <span className="guides-hub__entry-time">
                    {card.readingTime}
                  </span>
                  <span className="guides-hub__entry-arrow">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
