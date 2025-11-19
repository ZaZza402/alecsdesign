// Google Analytics utility functions
// Replace G-XXXXXXXXXX with your actual GA4 Measurement ID

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

// Analytics events interface
interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

// Check if GA is loaded
export const isGALoaded = (): boolean => {
  return typeof window !== "undefined" && typeof window.gtag === "function";
};

// Track page view
export const trackPageView = (url: string, title: string) => {
  if (!isGALoaded()) return;

  window.gtag?.("event", "page_view", {
    page_title: title,
    page_location: url,
    page_path: window.location.pathname,
  });
};

// Track custom events
export const trackEvent = ({
  action,
  category,
  label,
  value,
}: AnalyticsEvent) => {
  if (!isGALoaded()) return;

  window.gtag?.("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Track form submissions
export const trackFormSubmission = (formName: string, success: boolean) => {
  trackEvent({
    action: success ? "form_submit_success" : "form_submit_error",
    category: "Form",
    label: formName,
  });
};

// Track button clicks
export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent({
    action: "button_click",
    category: "Engagement",
    label: `${buttonName} - ${location}`,
  });
};

// Track external link clicks
export const trackExternalLink = (url: string, linkText: string) => {
  trackEvent({
    action: "external_link_click",
    category: "Outbound",
    label: `${linkText} - ${url}`,
  });
};

// Track scroll depth
export const trackScrollDepth = (depth: number) => {
  trackEvent({
    action: "scroll_depth",
    category: "Engagement",
    label: `${depth}%`,
    value: depth,
  });
};

// Track language change
export const trackLanguageChange = (from: string, to: string) => {
  trackEvent({
    action: "language_change",
    category: "Localization",
    label: `${from} to ${to}`,
  });
};

// Track quiz interaction
export const trackQuizEvent = (
  action: "start" | "complete" | "abandon",
  result?: string
) => {
  trackEvent({
    action: `quiz_${action}`,
    category: "Quiz",
    label: result,
  });
};

// Track CTA clicks
export const trackCTAClick = (ctaName: string, location: string) => {
  trackEvent({
    action: "cta_click",
    category: "Conversion",
    label: `${ctaName} - ${location}`,
  });
};

// Track WhatsApp click
export const trackWhatsAppClick = (location: string) => {
  trackEvent({
    action: "whatsapp_click",
    category: "Contact",
    label: location,
  });
};

// Track email click
export const trackEmailClick = (location: string) => {
  trackEvent({
    action: "email_click",
    category: "Contact",
    label: location,
  });
};

// Track section view (using Intersection Observer)
export const trackSectionView = (sectionName: string) => {
  trackEvent({
    action: "section_view",
    category: "Engagement",
    label: sectionName,
  });
};

// Track pricing model interest
export const trackPricingInterest = (model: "buy" | "subscribe") => {
  trackEvent({
    action: "pricing_interest",
    category: "Conversion",
    label: model === "buy" ? "Buy & Own" : "Subscribe & Relax",
  });
};

// Track user timing (for performance monitoring)
export const trackTiming = (
  category: string,
  variable: string,
  value: number,
  label?: string
) => {
  if (!isGALoaded()) return;

  window.gtag?.("event", "timing_complete", {
    name: variable,
    value: value,
    event_category: category,
    event_label: label,
  });
};

// Enhanced ecommerce - track product impression (for service tiers)
export const trackServiceImpression = (
  serviceName: string,
  servicePrice: string,
  position: number
) => {
  if (!isGALoaded()) return;

  window.gtag?.("event", "view_item", {
    items: [
      {
        item_id: serviceName.toLowerCase().replace(/\s+/g, "_"),
        item_name: serviceName,
        price: servicePrice,
        item_category: "Web Development Services",
        index: position,
      },
    ],
  });
};

// Track service tier selection
export const trackServiceSelection = (
  serviceName: string,
  servicePrice: string
) => {
  if (!isGALoaded()) return;

  window.gtag?.("event", "select_item", {
    items: [
      {
        item_id: serviceName.toLowerCase().replace(/\s+/g, "_"),
        item_name: serviceName,
        price: servicePrice,
        item_category: "Web Development Services",
      },
    ],
  });
};

// Track exceptions/errors
export const trackException = (description: string, fatal: boolean = false) => {
  if (!isGALoaded()) return;

  window.gtag?.("event", "exception", {
    description: description,
    fatal: fatal,
  });
};

// Set user properties (for segmentation)
export const setUserProperty = (
  propertyName: string,
  propertyValue: string
) => {
  if (!isGALoaded()) return;

  window.gtag?.("set", "user_properties", {
    [propertyName]: propertyValue,
  });
};

// Track file downloads (if you add downloadable resources)
export const trackDownload = (fileName: string, fileType: string) => {
  trackEvent({
    action: "file_download",
    category: "Downloads",
    label: `${fileName} (${fileType})`,
  });
};
