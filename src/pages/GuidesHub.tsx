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

interface HubStrings {
  eyebrow: string;
  title: string;
  subtitle: string;
  label: string;
  readMore: string;
}

const HUB_STRINGS: Record<Lang, HubStrings> = {
  en: {
    eyebrow: "Free guides",
    title: "Practical guides for small business owners",
    subtitle:
      "Straight answers to the questions most web developers won't explain clearly. No jargon, no sales pitch.",
    label: "Guide",
    readMore: "Read guide →",
  },
  it: {
    eyebrow: "Guide gratuite",
    title: "Guide pratiche per chi ha un'attività",
    subtitle:
      "Risposte chiare alle domande che i web developer di solito evitano. Senza tecnicismi, senza vendite.",
    label: "Guida",
    readMore: "Leggi la guida →",
  },
  ro: {
    eyebrow: "Ghiduri gratuite",
    title: "Ghiduri practice pentru antreprenori",
    subtitle:
      "Raspunsuri clare la intrebarile pe care developerii web de obicei le evita. Fara jargon, fara vanzari.",
    label: "Ghid",
    readMore: "Citeste ghidul →",
  },
};

// Each guide's key data (will use the locale JSON already loaded in i18n)
type GuideKey = "websiteCost" | "google" | "websiteNeeds";

const GUIDE_KEYS: GuideKey[] = ["websiteCost", "google", "websiteNeeds"];

interface GuideCardData {
  title: string;
  lead: string;
  readingTime: string;
}

export default function GuidesHub({ lang }: { lang: string }) {
  const { t } = useTranslation();
  const l = (["en", "it", "ro"].includes(lang) ? lang : "en") as Lang;
  const strings = HUB_STRINGS[l];
  const slugs = GUIDE_SLUGS[l];

  // Pull card data from already-loaded i18n resources
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
        <p className="guides-hub__eyebrow">{strings.eyebrow}</p>
        <h1 className="guides-hub__title">{strings.title}</h1>
        <p className="guides-hub__subtitle">{strings.subtitle}</p>

        <div className="guides-hub__grid">
          {cards.map((card) => (
            <Link key={card.key} to={card.slug} className="guides-hub__card">
              <div className="guides-hub__card-body">
                <span className="guides-hub__card-label">{strings.label}</span>
                <h2 className="guides-hub__card-title">{card.title}</h2>
                <p className="guides-hub__card-lead">
                  {card.lead.length > 120
                    ? card.lead.slice(0, 117) + "..."
                    : card.lead}
                </p>
                <div className="guides-hub__card-footer">
                  <span className="guides-hub__card-time">
                    {card.readingTime}
                  </span>
                  <span className="guides-hub__card-cta">
                    {strings.readMore}
                  </span>
                </div>
              </div>
              <span className="guides-hub__card-arrow">›</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
