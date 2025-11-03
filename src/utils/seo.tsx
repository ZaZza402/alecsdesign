import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
  };
  canonical?: string;
  noindex?: boolean;
}

export const SEO = ({
  title = "alecsdesign - Web Developer in Rome | Your 24/7 Digital Business Partner",
  description = "Transform your business with scalable web solutions that work 24/7. Expert web developer in Rome specializing in React applications, e-commerce, and SEO-optimized websites. Your digital growth partner who builds solutions, not just websites.",
  keywords = "web developer Rome, sviluppo web Roma, web design Italy, React developer Rome, business web solutions, e-commerce development, SEO optimization, scalable websites, digital business partner, sviluppatore web Roma",
  ogImage = "https://www.alecsdesign.xyz/og-image.jpg",
  ogType = "website",
  article,
  canonical,
  noindex = false,
}: SEOProps) => {
  const fullUrl = `https://www.alecsdesign.xyz${window.location.pathname}`;
  const canonicalUrl = canonical || fullUrl;

  useEffect(() => {
    // Set page title
    document.title = title;

    // Helper to set or update meta tags
    const setMetaTag = (
      name: string,
      content: string,
      attribute: "name" | "property" = "name"
    ) => {
      let element = document.querySelector(
        `meta[${attribute}="${name}"]`
      ) as HTMLMetaElement;

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.content = content;
    };

    // Helper to set link tags
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(
        `link[rel="${rel}"]`
      ) as HTMLLinkElement;

      if (!element) {
        element = document.createElement("link");
        element.rel = rel;
        document.head.appendChild(element);
      }

      element.href = href;
    };

    // Basic meta tags
    setMetaTag("description", description);
    setMetaTag("keywords", keywords);

    // Robots meta tag
    if (noindex) {
      setMetaTag("robots", "noindex, nofollow");
    } else {
      setMetaTag(
        "robots",
        "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      );
    }

    // Open Graph tags
    setMetaTag("og:title", title, "property");
    setMetaTag("og:description", description, "property");
    setMetaTag("og:url", fullUrl, "property");
    setMetaTag("og:type", ogType, "property");
    setMetaTag("og:image", ogImage, "property");
    setMetaTag("og:site_name", "alecsdesign", "property");
    setMetaTag("og:locale", "en_US", "property");
    setMetaTag("og:locale:alternate", "it_IT", "property");
    setMetaTag("og:locale:alternate", "ro_RO", "property");

    // Twitter Card tags
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:description", description);
    setMetaTag("twitter:image", ogImage);

    // Article-specific tags
    if (article && ogType === "article") {
      if (article.publishedTime) {
        setMetaTag("article:published_time", article.publishedTime, "property");
      }
      if (article.modifiedTime) {
        setMetaTag("article:modified_time", article.modifiedTime, "property");
      }
      if (article.author) {
        setMetaTag("article:author", article.author, "property");
      }
      if (article.tags) {
        article.tags.forEach((tag) => {
          const tagElement = document.createElement("meta");
          tagElement.setAttribute("property", "article:tag");
          tagElement.content = tag;
          document.head.appendChild(tagElement);
        });
      }
    }

    // Canonical URL
    setLinkTag("canonical", canonicalUrl);

    // Alternate language URLs
    setLinkTag("alternate", `${fullUrl}?lang=en`);
    setLinkTag("alternate", `${fullUrl}?lang=it`);
    setLinkTag("alternate", `${fullUrl}?lang=ro`);
  }, [
    title,
    description,
    keywords,
    ogImage,
    ogType,
    article,
    canonicalUrl,
    fullUrl,
    noindex,
  ]);

  return null;
};

// Structured Data Schemas
export const generateLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.alecsdesign.xyz/#business",
    name: "alecsdesign",
    description:
      "Professional web development services specializing in modern React applications, e-commerce solutions, and custom web design for small businesses.",
    url: "https://www.alecsdesign.xyz",
    telephone: "+380 150 3074",
    email: "mka.alecs@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rome",
      addressRegion: "Lazio",
      addressCountry: "IT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "41.9028",
      longitude: "12.4964",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Rome",
      },
      {
        "@type": "State",
        name: "Lazio",
      },
      {
        "@type": "Country",
        name: "Italy",
      },
      {
        "@type": "Place",
        name: "Europe",
      },
    ],
    priceRange: "€150 - €2000+",
    openingHours: "Mo-Fr 09:00-18:00",
    sameAs: [
      "https://www.facebook.com/ax.m826/",
      "https://www.instagram.com/alex.zm8/",
      "https://wa.me/3801503074",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Modern Web Application Development",
            description:
              "Custom React applications with Vite, TypeScript, and Tailwind CSS",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "E-commerce Solutions",
            description:
              "Scalable online shops with modern payment integrations",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SEO Optimization",
            description: "Search engine optimization for better visibility",
          },
        },
      ],
    },
  };
};

export const generateWebsiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.alecsdesign.xyz/#website",
    url: "https://www.alecsdesign.xyz",
    name: "alecsdesign",
    description: "Professional web development services in Rome, Italy",
    inLanguage: ["en", "it", "ro"],
  };
};

export const generateBreadcrumbSchema = (
  items: { name: string; url: string }[]
) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

// Component to inject structured data
export const StructuredData = ({ data }: { data: object }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};
