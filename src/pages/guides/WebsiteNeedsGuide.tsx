import { useTranslation } from "react-i18next";
import GuideLayout from "./GuideLayout";

const RELATED: Record<string, Array<{ slug: string; titleKey: string }>> = {
  en: [
    { slug: "/guide/how-much-does-a-website-cost", titleKey: "guides.websiteCost.title" },
    { slug: "/guide/how-to-get-found-on-google", titleKey: "guides.google.title" },
  ],
  it: [
    { slug: "/it/guide/quanto-costa-un-sito-web", titleKey: "guides.websiteCost.title" },
    { slug: "/it/guide/come-farsi-trovare-su-google", titleKey: "guides.google.title" },
  ],
  ro: [
    { slug: "/ro/guide/cat-costa-un-site-web", titleKey: "guides.websiteCost.title" },
    { slug: "/ro/guide/cum-sa-apari-pe-google", titleKey: "guides.google.title" },
  ],
};

const CANONICAL: Record<string, string> = {
  en: "https://www.alecsdesign.xyz/guide/what-your-website-needs",
  it: "https://www.alecsdesign.xyz/it/guide/cosa-deve-avere-il-sito-web",
  ro: "https://www.alecsdesign.xyz/ro/guide/ce-trebuie-sa-aiba-site-ul",
};

export default function WebsiteNeedsGuide({ lang }: { lang: string }) {
  const { t } = useTranslation();
  const l = ["en", "it", "ro"].includes(lang) ? lang : "en";
  const related = (RELATED[l] || RELATED.en).map((r) => ({
    slug: r.slug,
    title: t(r.titleKey),
  }));

  return (
    <GuideLayout
      guideKey="websiteNeeds"
      lang={l}
      relatedGuides={related}
      canonical={CANONICAL[l] || CANONICAL.en}
    />
  );
}
