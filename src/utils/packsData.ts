const packModules = import.meta.glob("../../data/packs/*.json", {
  eager: true,
});

export interface PackItem {
  id: string;
  slug: string;
  meta: {
    title: string;
    description: string;
  };
  product: {
    title: string;
    tagline: string;
  };
  translations?: Record<
    string,
    {
      meta?: { title?: string; description?: string };
      product?: { title?: string; tagline?: string };
      intro?: string;
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
