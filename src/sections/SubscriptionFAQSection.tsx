import { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { ChevronDown, Search, MessageCircle, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trackSectionView } from "../utils/analytics";
import "./SubscriptionFAQSection.css";

const FAQ_KEYS = ["q1", "q2", "q3", "q4", "q5", "q6"];

const SubscriptionFAQSection = () => {
  const { t, i18n, ready } = useTranslation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const currentLang = i18n.language;

  // Track section view
  useEffect(() => {
    if (inView) {
      trackSectionView("FAQ Section");
    }
  }, [inView]);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Filter FAQs based on search
  const filteredFAQs = useMemo(() => {
    if (!ready) return [];
    if (!searchQuery.trim()) return FAQ_KEYS;

    return FAQ_KEYS.filter((faqKey) => {
      const question = t(
        `pricing.subscriptionFAQ.${faqKey}.question`
      ).toLowerCase();
      const answer = t(
        `pricing.subscriptionFAQ.${faqKey}.answer`
      ).toLowerCase();
      const query = searchQuery.toLowerCase();

      return question.includes(query) || answer.includes(query);
    });
  }, [searchQuery, t, ready]);

  // Calculate reading time (rough estimate: 200 words per minute)
  const getReadingTime = (text: string) => {
    const wordCount = text.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / 200);
    return minutes;
  };

  if (!ready) return <div>Loading...</div>;

  return (
    <section className="subscription-faq-section" ref={ref}>
      <div
        className={`subscription-faq-container ${inView ? "animate-in" : ""}`}
      >
        <div className="subscription-faq-header">
          <h2 className="subscription-faq-title">
            {t("pricing.subscriptionFAQ.title")}
          </h2>
          <p className="subscription-faq-subtitle">
            {t("pricing.subscriptionFAQ.subtitle")}
          </p>
        </div>

        {/* Search Bar */}
        <div
          className="faq-search-wrapper"
          data-aos="fade-up"
          data-aos-duration="600"
        >
          <div className="faq-search-box">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder={t("pricing.subscriptionFAQ.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="faq-search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="search-clear"
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {filteredFAQs.length === 0 ? (
          <div className="faq-no-results" data-aos="fade-up">
            <p>{t("pricing.subscriptionFAQ.noResults")}</p>
          </div>
        ) : (
          <div className="faq-list">
            {filteredFAQs.map((faqKey, displayIndex) => {
              const originalIndex = FAQ_KEYS.indexOf(faqKey);
              const answer = t(`pricing.subscriptionFAQ.${faqKey}.answer`);
              const readingTime = getReadingTime(answer);

              return (
                <div
                  key={`${faqKey}-${currentLang}`}
                  className={`faq-item ${
                    activeIndex === originalIndex ? "active" : ""
                  }`}
                  style={{ animationDelay: `${displayIndex * 0.1}s` }}
                  data-aos="fade-up"
                  data-aos-delay={displayIndex * 50}
                  data-aos-duration="600"
                >
                  <button
                    className="faq-question"
                    onClick={() => toggleFAQ(originalIndex)}
                    aria-expanded={activeIndex === originalIndex}
                  >
                    <div className="question-content">
                      <span className="question-text">
                        {t(`pricing.subscriptionFAQ.${faqKey}.question`)}
                      </span>
                      {readingTime > 0 && (
                        <span className="reading-time">
                          <Clock size={14} />
                          {readingTime} {t("pricing.subscriptionFAQ.minRead")}
                        </span>
                      )}
                    </div>
                    <motion.div
                      animate={{
                        rotate: activeIndex === originalIndex ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="chevron-wrapper"
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {activeIndex === originalIndex && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="faq-answer-wrapper"
                      >
                        <div className="faq-answer">{answer}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}

        {/* Sticky CTA Button */}
        <a
          href="#contact"
          className="faq-sticky-cta"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <MessageCircle size={20} />
          {t("pricing.subscriptionFAQ.stillHaveQuestions")}
        </a>
      </div>
    </section>
  );
};

export default SubscriptionFAQSection;
