import { useTranslation } from "react-i18next";
import GuideLayout from "./GuideLayout";

const RELATED: Record<string, Array<{ slug: string; titleKey: string }>> = {
  en: [
    {
      slug: "/guide/how-to-get-found-on-google",
      titleKey: "guides.google.title",
    },
    {
      slug: "/guide/what-your-website-needs",
      titleKey: "guides.websiteNeeds.title",
    },
  ],
  it: [
    {
      slug: "/it/guide/come-farsi-trovare-su-google",
      titleKey: "guides.google.title",
    },
    {
      slug: "/it/guide/cosa-deve-avere-il-sito-web",
      titleKey: "guides.websiteNeeds.title",
    },
  ],
  ro: [
    {
      slug: "/ro/guide/cum-sa-apari-pe-google",
      titleKey: "guides.google.title",
    },
    {
      slug: "/ro/guide/ce-trebuie-sa-aiba-site-ul",
      titleKey: "guides.websiteNeeds.title",
    },
  ],
};

const CANONICAL: Record<string, string> = {
  en: "https://www.alecsdesign.xyz/guide/how-much-does-a-website-cost",
  it: "https://www.alecsdesign.xyz/it/guide/quanto-costa-un-sito-web",
  ro: "https://www.alecsdesign.xyz/ro/guide/cat-costa-un-site-web",
};

export default function WebsiteCostGuide({ lang }: { lang: string }) {
  const { t } = useTranslation();
  const l = ["en", "it", "ro"].includes(lang) ? lang : "en";
  const related = (RELATED[l] || RELATED.en).map((r) => ({
    slug: r.slug,
    title: t(r.titleKey),
  }));

  return (
    <GuideLayout
      guideKey="websiteCost"
      lang={l}
      relatedGuides={related}
      canonical={CANONICAL[l] || CANONICAL.en}
    />
  );
}
