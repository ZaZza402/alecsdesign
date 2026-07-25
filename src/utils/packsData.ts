const packModules = import.meta.glob("../../data/packs/*.json", {
  eager: true,
});

export interface PackItem {
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
    price?: string;
    currency?: string;
    buyLink?: string;
    license?: string;
  };
  images?: {
    overview?: string;
    featureOne?: string;
    featureTwo?: string;
    wireframe?: string;
    finalDetail?: string;
  };
  specs?: {
    formatsIncluded?: string[];
    canvasSize?: string;
    vectorStyle?: string;
    fileCount?: string;
  };
  includedItems?: string[];
  faq?: Array<{ question: string; answer: string }>;
  showcase?: {
    brief?: string;
    problem?: string;
    solution?: string;
    craftsmanshipProof?: {
      title?: string;
      description?: string;
      wireframeImage?: string;
      finalImage?: string;
      wireframeLabel?: string;
      finalLabel?: string;
    };
    usageMockups?: string[];
  };
  cta?: {
    title?: string;
    subtitle?: string;
    primaryLabel?: string;
    secondaryLabel?: string;
    scopeOptions?: string[];
  };
  seo?: {
    intentKeywords?: string[];
    processDescriptors?: string[];
  };
  translations?: Record<
    string,
    {
      meta?: { title?: string; description?: string };
      product?: { title?: string; tagline?: string };
      intro?: string;
      showcase?: {
        brief?: string;
        problem?: string;
        solution?: string;
        craftsmanshipProof?: {
          title?: string;
          description?: string;
          wireframeLabel?: string;
          finalLabel?: string;
        };
      };
      cta?: {
        title?: string;
        subtitle?: string;
        primaryLabel?: string;
        secondaryLabel?: string;
        scopeOptions?: string[];
      };
      imageAlts?: {
        overview?: string;
        featureOne?: string;
        featureTwo?: string;
        wireframe?: string;
        finalDetail?: string;
      };
      faq?: Array<{ question: string; answer: string }>;
    }
  >;
}

export function getPackList(): PackItem[] {
  return Object.values(packModules)
    .map((module) => module as { default?: PackItem } | PackItem)
    .map((entry) => ("default" in entry ? entry.default : entry))
    .filter((pack): pack is PackItem =>
      Boolean(pack && typeof pack === "object"),
    );
}

export function getPackBySlug(slug: string): PackItem | undefined {
  return getPackList().find((pack) => pack.slug === slug);
}
