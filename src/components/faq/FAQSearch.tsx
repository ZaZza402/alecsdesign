import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import "./FAQSearch.css";

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
  keywords?: string[];
}

interface FAQSearchProps {
  faqs: FAQItem[];
}

const FAQSearch: React.FC<FAQSearchProps> = ({ faqs }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Filter FAQs based on search query
  const filteredFAQs = useMemo(() => {
    if (!searchQuery.trim()) {
      return faqs;
    }

    const query = searchQuery.toLowerCase();
    return faqs.filter((faq) => {
      const questionMatch = faq.question.toLowerCase().includes(query);
      const answerMatch = faq.answer.toLowerCase().includes(query);
      const keywordMatch = faq.keywords?.some((keyword) =>
        keyword.toLowerCase().includes(query)
      );
      return questionMatch || answerMatch || keywordMatch;
    });
  }, [faqs, searchQuery]);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Auto-expand first result when searching
    if (e.target.value.trim() && filteredFAQs.length > 0) {
      setExpandedIndex(0);
    }
  };

  return (
    <div className="faq-search-container">
      {/* Search Bar */}
      <div className="faq-search-bar">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          placeholder={t("faq.searchPlaceholder")}
          value={searchQuery}
          onChange={handleSearchChange}
          className="faq-search-input"
          aria-label="Search FAQs"
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery("");
              setExpandedIndex(null);
            }}
            className="clear-search-button"
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {/* Results Count */}
      {searchQuery && (
        <div className="faq-results-count">
          {filteredFAQs.length === 0
            ? t("faq.noResults")
            : `${filteredFAQs.length} ${t("faq.resultsFound")}`}
        </div>
      )}

      {/* FAQ List */}
      <div className="faq-list" role="list">
        {filteredFAQs.length === 0 && !searchQuery ? (
          <div className="faq-empty-state">
            <p>{t("faq.noQuestions")}</p>
          </div>
        ) : filteredFAQs.length === 0 ? (
          <div className="faq-empty-state">
            <p>{t("faq.noResults")}</p>
            <p className="faq-empty-hint">{t("faq.tryDifferentKeywords")}</p>
          </div>
        ) : (
          filteredFAQs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${
                expandedIndex === index ? "expanded" : ""
              }`}
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <button
                className="faq-question"
                onClick={() => toggleExpand(index)}
                aria-expanded={expandedIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span itemProp="name">{faq.question}</span>
                {expandedIndex === index ? (
                  <ChevronUp className="faq-icon" size={20} />
                ) : (
                  <ChevronDown className="faq-icon" size={20} />
                )}
              </button>

              <div
                id={`faq-answer-${index}`}
                className="faq-answer"
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
                aria-hidden={expandedIndex !== index}
              >
                <div
                  className="faq-answer-content"
                  itemProp="text"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FAQSearch;
