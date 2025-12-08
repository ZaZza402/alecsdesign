import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import FAQSearch from "../components/faq/FAQSearch";
import Footer from "../components/layout/Footer";
import { HelpCircle } from "lucide-react";
import "./FAQPage.css";

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
  keywords?: string[];
}

const FAQPage: React.FC = () => {
  const { t, i18n } = useTranslation();

  // Load FAQ data from translations
  const faqData = useMemo(() => {
    const faqs = t("faq.questions", { returnObjects: true }) as FAQItem[];
    return Array.isArray(faqs) ? faqs : [];
  }, [t]);

  // Generate FAQ Schema for Google
  const faqSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqData.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer.replace(/<[^>]*>/g, ""), // Strip HTML for schema
        },
      })),
    };
  }, [faqData]);

  const currentUrl = `https://alecsdesign.xyz/${i18n.language}/faq`;
  const pageTitle = t("faq.metaTitle");
  const pageDescription = t("faq.metaDescription");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={t("faq.metaKeywords")} />
        <link rel="canonical" href={currentUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />

        {/* FAQ Schema */}
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>

        {/* Alternate Language Links */}
        <link
          rel="alternate"
          hrefLang="en"
          href="https://alecsdesign.xyz/en/faq"
        />
        <link
          rel="alternate"
          hrefLang="it"
          href="https://alecsdesign.xyz/it/faq"
        />
        <link
          rel="alternate"
          hrefLang="ro"
          href="https://alecsdesign.xyz/ro/faq"
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://alecsdesign.xyz/en/faq"
        />
      </Helmet>

      <div className="faq-page" style={{ paddingTop: "80px" }}>
        <div className="faq-page-container">
          {/* Header Section */}
          <div className="faq-header">
            <div className="faq-icon-box">
              <HelpCircle size={48} />
            </div>
            <h1 className="faq-page-title">{t("faq.title")}</h1>
            <p className="faq-page-subtitle">{t("faq.subtitle")}</p>
          </div>

          {/* FAQ Search Component */}
          <FAQSearch faqs={faqData} />

          {/* Additional Help Section */}
          <div className="faq-help-section">
            <h3>{t("faq.stillNeedHelp")}</h3>
            <p>{t("faq.contactPrompt")}</p>
            <a
              href={`/${i18n.language}/contact`}
              className="faq-contact-button"
            >
              {t("faq.contactButton")}
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQPage;
