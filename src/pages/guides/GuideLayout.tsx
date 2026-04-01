import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { SEO } from "../../utils/seo";
import "./GuideLayout.css";

// ─── Types ───────────────────────────────────────────────────────────────────

interface GuideSection {
  id: string;
  heading: string;
  paras: string[];
}

interface CostTable {
  heading: string;
  intro: string;
  headers: string[];
  rows: string[][];
  note: string;
}

interface FaqItem {
  q: string;
  a: string;
}

interface GuideData {
  meta: {
    title: string;
    description: string;
    readingTime: string;
    published: string;
  };
  breadcrumb: string;
  title: string;
  lead: string;
  sections: GuideSection[];
  costTable?: CostTable;
  faq: { heading: string; items: FaqItem[] };
  related: string;
  authorBio: string;
  authorCta: string;
}

interface RelatedGuide {
  slug: string;
  title: string;
}

interface GuideLayoutProps {
  guideKey: "websiteCost" | "google" | "websiteNeeds";
  lang: string;
  relatedGuides: RelatedGuide[];
  canonical: string;
}

// ─── FAQ Accordion ────────────────────────────────────────────────────────────

function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="guide-faq__list">
      {items.map((item, i) => (
        <div
          key={i}
          className={`guide-faq__item${open === i ? " guide-faq__item--open" : ""}`}
        >
          <button
            className="guide-faq__question"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span>{item.q}</span>
            <svg
              className="guide-faq__icon"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M10 4v12M4 10h12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div className="guide-faq__answer" aria-hidden={open !== i}>
            <p>{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Guide Layout ─────────────────────────────────────────────────────────────

export default function GuideLayout({
  guideKey,
  lang,
  relatedGuides,
  canonical,
}: GuideLayoutProps) {
  const { t } = useTranslation();
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  const data = t(`guides.${guideKey}`, { returnObjects: true }) as GuideData;

  const hubSlug = lang === "en" ? "/guide/" : `/${lang}/guide/`;

  // Build JSON-LD structured data
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.meta.title,
    description: data.meta.description,
    author: {
      "@type": "Person",
      name: "Alex",
      url: "https://www.alecsdesign.xyz/about",
    },
    publisher: {
      "@type": "Organization",
      name: "alecsdesign",
      url: "https://www.alecsdesign.xyz",
    },
    datePublished: data.meta.published,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "alecsdesign",
        item: "https://www.alecsdesign.xyz",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: data.breadcrumb,
        item: `https://www.alecsdesign.xyz${hubSlug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: data.title,
        item: canonical,
      },
    ],
  };

  return (
    <>
      <SEO
        title={data.meta.title}
        description={data.meta.description}
        ogType="article"
        canonical={canonical}
        article={{ publishedTime: data.meta.published, author: "Alex" }}
        jsonLd={
          [articleJsonLd, faqJsonLd, breadcrumbJsonLd] as unknown as object
        }
      />

      <div className="guide-layout">
        {/* Breadcrumb — full on desktop, back-link only on mobile */}
        <nav className="guide-breadcrumb" aria-label="breadcrumb">
          <Link
            to={hubSlug}
            className="guide-breadcrumb__back"
            aria-label="Back to guides"
          >
            ← {data.breadcrumb}
          </Link>
          <span
            className="guide-breadcrumb__sep guide-breadcrumb__desktop"
            aria-hidden="true"
          >
            ›
          </span>
          <Link to="/" className="guide-breadcrumb__desktop">
            alecsdesign
          </Link>
          <span
            className="guide-breadcrumb__sep guide-breadcrumb__desktop"
            aria-hidden="true"
          >
            ›
          </span>
          <Link to={hubSlug} className="guide-breadcrumb__desktop">
            {data.breadcrumb}
          </Link>
          <span
            className="guide-breadcrumb__sep guide-breadcrumb__desktop"
            aria-hidden="true"
          >
            ›
          </span>
          <span className="guide-breadcrumb__desktop guide-breadcrumb__current">
            {data.title}
          </span>
        </nav>

        {/* Reading meta strip */}
        <div className="guide-meta">
          <span>{data.meta.readingTime}</span>
          <span className="guide-meta__dot" aria-hidden="true" />
          <span>{t("guideUi.meta.byLine")}</span>
          <span className="guide-meta__dot" aria-hidden="true" />
          <span>{data.meta.published}</span>
        </div>

        {/* Title */}
        <h1 className="guide-title">{data.title}</h1>

        {/* Lead */}
        <p className="guide-lead">{data.lead}</p>

        {/* Mobile TOC — collapsible, above article, hidden on desktop */}
        <div className="guide-mobile-toc">
          <button
            className="guide-mobile-toc__toggle"
            onClick={() => setMobileTocOpen(!mobileTocOpen)}
            aria-expanded={mobileTocOpen}
          >
            <span>{t("guideUi.toc.title")}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
              className={mobileTocOpen ? "guide-mobile-toc__chevron--open" : ""}
            >
              <path
                d="M5 8l5 5 5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {mobileTocOpen && (
            <ul className="guide-mobile-toc__list">
              {data.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="guide-mobile-toc__link"
                    onClick={() => setMobileTocOpen(false)}
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Two-column body */}
        <div className="guide-body">
          {/* ── Article column ── */}
          <article className="guide-article">
            {data.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="guide-section"
              >
                <h2 className="guide-section__heading">{section.heading}</h2>
                <div className="guide-section__paras">
                  {section.paras.map((para, pi) => (
                    <p key={pi}>{para}</p>
                  ))}
                </div>
              </section>
            ))}

            {/* Cost table (Guide 1 only) */}
            {data.costTable && (
              <div className="guide-table-block">
                <h3 className="guide-table-block__heading">
                  {data.costTable.heading}
                </h3>
                <p className="guide-table-block__intro">
                  {data.costTable.intro}
                </p>
                <table className="guide-table">
                  <thead>
                    <tr>
                      {data.costTable.headers.map((h, i) => (
                        <th key={i}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.costTable.rows.map((row, ri) => (
                      <tr key={ri}>
                        {row.map((cell, ci) => (
                          <td key={ci}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="guide-table-note">{data.costTable.note}</p>
              </div>
            )}

            {/* FAQ — answers questions raised by the article */}
            <div className="guide-faq">
              <h2 className="guide-faq__heading">{data.faq.heading}</h2>
              <FaqAccordion items={data.faq.items} />
            </div>

            {/* CTA block — after content is consumed */}
            <div className="guide-cta-block">
              <div className="guide-cta-block__text">
                <p>
                  <strong>{t("guideUi.cta.heading")}</strong> {data.authorCta}
                </p>
              </div>
              <a
                href="https://wa.me/393801503074"
                target="_blank"
                rel="noopener noreferrer"
                className="guide-cta-block__btn"
              >
                {t("guideUi.cta.btn")}
              </a>
            </div>

            {/* Author box */}
            <div className="guide-author">
              <div className="guide-author__avatar" aria-hidden="true">
                A
              </div>
              <div className="guide-author__info">
                <p className="guide-author__name">Alex</p>
                <p className="guide-author__bio">{data.authorBio}</p>
                <a
                  href="https://wa.me/393801503074"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="guide-author__cta"
                >
                  {data.authorCta} →
                </a>
              </div>
            </div>

            {/* Related guides */}
            {relatedGuides.length > 0 && (
              <div className="guide-related">
                <p className="guide-related__heading">{data.related}</p>
                <div className="guide-related__cards">
                  {relatedGuides.map((rel) => (
                    <Link
                      key={rel.slug}
                      to={rel.slug}
                      className="guide-related__card"
                    >
                      <p className="guide-related__card-label">{t("guideUi.related.label")}</p>
                      <p className="guide-related__card-title">{rel.title}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* ── Sidebar ── */}
          <aside className="guide-sidebar" aria-label="Table of contents">
            <nav className="guide-toc">
              <p className="guide-toc__heading">{t("guideUi.toc.title")}</p>
              <ul className="guide-toc__list">
                {data.sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="guide-toc__link">
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="guide-sidebar-cta">
              <p className="guide-sidebar-cta__heading">{t("guideUi.sidebar.heading")}</p>
              <p className="guide-sidebar-cta__body">
                {t("guideUi.sidebar.body")}
              </p>
              <a
                href="https://wa.me/393801503074"
                target="_blank"
                rel="noopener noreferrer"
                className="guide-sidebar-cta__btn"
              >
                {t("guideUi.sidebar.btn")}
              </a>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
