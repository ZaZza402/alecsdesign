# Analytics Tracking Guide

## Overview

Complete analytics tracking implementation using **Google Analytics 4 (GA4)** with Measurement ID: `G-D9P3J01G5R`

All tracking functions are centralized in `src/utils/analytics.ts` and implemented across the website to measure user engagement, conversions, and behavior.

---

## 📊 What's Currently Tracked

### 1. **Hero Section CTAs**

**Location:** `src/sections/HeroSection.tsx`

| Action                | Event                          | Category             | Label                             | Purpose                                     |
| --------------------- | ------------------------------ | -------------------- | --------------------------------- | ------------------------------------------- |
| "How It Works" button | `cta_click`                    | Conversion           | "How It Works - Hero Section"     | Measures interest in learning about process |
| WhatsApp button       | `cta_click` + `whatsapp_click` | Contact + Conversion | "WhatsApp Contact - Hero Section" | Tracks immediate contact attempts           |

**Insights:**

- Which CTA drives more engagement?
- How many visitors want immediate contact vs learning more?

---

### 2. **Contact Form**

**Location:** `src/sections/ContactSection.tsx`

| Action                | Event                                   | Category | Details                    |
| --------------------- | --------------------------------------- | -------- | -------------------------- |
| Successful submission | `form_submit_success` + `generate_lead` | Form     | Includes lead value (€500) |
| Failed submission     | `form_submit_error`                     | Form     | Captures error scenarios   |

**Insights:**

- Form conversion rate
- Lead generation tracking
- Technical issues (high error rate indicates problems)

---

### 3. **Footer - Contact Info Reveal**

**Location:** `src/components/layout/Footer.tsx`

| Action                 | Event                 | Category   | Label                                   | Purpose                         |
| ---------------------- | --------------------- | ---------- | --------------------------------------- | ------------------------------- |
| Click "Reveal Contact" | `button_click`        | Engagement | "Reveal Contact Info - Footer"          | Measures contact info interest  |
| Email click            | `email_click`         | Contact    | "Footer"                                | Direct email engagement         |
| Phone click            | `button_click`        | Engagement | "Phone Call - Footer"                   | Phone contact attempts          |
| WhatsApp click         | `whatsapp_click`      | Contact    | "Footer"                                | WhatsApp engagement from footer |
| Facebook click         | `external_link_click` | Outbound   | "Facebook - [URL]"                      | Social media traffic            |
| Instagram click        | `external_link_click` | Outbound   | "Instagram - [URL]"                     | Social media traffic            |
| Services & Rates link  | `button_click`        | Engagement | "Services & Rates - Footer Quick Links" | Interest in pricing details     |

**Insights:**

- Are users interested in contact details? (Reveal button clicks)
- Which contact method do they prefer? (Email vs Phone vs WhatsApp)
- Do hidden contacts prevent spam? (Compare reveal rate vs actual contact rate)

---

### 4. **Pricing Section CTAs**

**Location:** `src/sections/PricingSection.tsx`

| Action                          | Event                            | Category   | Label                                   | Value              |
| ------------------------------- | -------------------------------- | ---------- | --------------------------------------- | ------------------ |
| Section viewed                  | `section_view`                   | Engagement | "Pricing Section"                       | -                  |
| Buy & Own "Get Started"         | `cta_click` + `pricing_interest` | Conversion | "Get Started - Buy & Own Model"         | Model: "buy"       |
| Subscribe & Relax "Get Started" | `cta_click` + `pricing_interest` | Conversion | "Get Started - Subscribe & Relax Model" | Model: "subscribe" |
| Add-ons CTA                     | `cta_click`                      | Conversion | "Discuss Add-ons - Pricing Section"     | -                  |
| Quiz CTA                        | `cta_click`                      | Conversion | "Take the Quiz - Pricing Section"       | -                  |

**Insights:**

- Which pricing model is more popular?
- Do users engage with add-ons section?
- Is the quiz CTA effective at driving quiz completions?

---

### 5. **Quiz System**

**Location:** `src/pages/QuizPage.tsx`, `src/pages/QuizResults.tsx`

#### Quiz Flow Events

| Stage          | Event           | Category | Label              | Details                |
| -------------- | --------------- | -------- | ------------------ | ---------------------- |
| Quiz starts    | `quiz_start`    | Quiz     | -                  | Tracks quiz engagement |
| Step completed | `quiz_progress` | Quiz     | "Step X completed" | Value = progress %     |
| Quiz completed | `quiz_complete` | Quiz     | "12 questions"     | Success metric         |
| Quiz abandoned | `quiz_abandon`  | Quiz     | "Step X of 12"     | Drop-off analysis      |

#### Quiz Results Events

| Action           | Event               | Category   | Label                                           |
| ---------------- | ------------------- | ---------- | ----------------------------------------------- |
| Results viewed   | `quiz_results_view` | Quiz       | "[Model] - €[Price Range]"                      |
| Contact CTA      | `cta_click`         | Conversion | "Contact from Quiz Results - Quiz Results Page" |
| View Pricing CTA | `cta_click`         | Conversion | "View Pricing Details - Quiz Results Page"      |
| Restart Quiz     | `quiz_restart`      | Quiz       | "From Results Page"                             |

**Insights:**

- Quiz completion rate (start → complete ratio)
- Where do users drop off? (abandonment tracking)
- Which recommended models are most common?
- Do quiz completers convert to leads?
- Are results accurate enough that users take action?

---

### 6. **Section Visibility**

**Location:** All major sections with `useInView` hook

| Section   | Event          | Category   | Label               |
| --------- | -------------- | ---------- | ------------------- |
| Portfolio | `section_view` | Engagement | "Portfolio Section" |
| Pricing   | `section_view` | Engagement | "Pricing Section"   |
| Contact   | `section_view` | Engagement | "Contact Section"   |
| FAQ       | `section_view` | Engagement | "FAQ Section"       |

**Insights:**

- How far do users scroll?
- Which sections get the most attention?
- Do users see pricing before contacting?

---

### 7. **Page Views**

**Location:** `src/utils/analytics.ts` (available utility)

Automatically tracks:

- URL
- Page title
- Path

**Insights:**

- Most visited pages
- User journey through site
- Language preference patterns

---

### 8. **Language Changes**

**Location:** `src/utils/analytics.ts` (utility available)

Event: `language_change`  
Tracks: "from" → "to" language

**Insights:**

- Do users switch languages?
- Which language combinations are common?
- Is default language detection accurate?

---

## 🎯 Key Metrics to Monitor

### Conversion Funnel

```
1. Section Views (Portfolio, Pricing, Contact)
   ↓
2. Pricing Interest (Buy vs Subscribe model selection)
   ↓
3. CTA Clicks (Get Started, Contact buttons)
   ↓
4. Form Submissions (Leads generated)
```

### Quiz Funnel

```
1. Quiz Start (from Pricing section CTA)
   ↓
2. Quiz Progress (step-by-step tracking)
   ↓
3. Quiz Complete (vs abandon rate)
   ↓
4. Quiz Results CTA (Contact or View Pricing)
   ↓
5. Lead Conversion
```

### Contact Methods

```
Contact Form > WhatsApp > Email > Phone
```

Track which method users prefer and optimize accordingly.

---

## 📈 Dashboard Setup Recommendations

### GA4 Custom Reports

#### 1. **CTA Performance Report**

**Dimensions:**

- Event Name
- Event Label
- Page Location

**Metrics:**

- Event Count
- Conversions

**Filter:** `event_category = "Conversion"`

**Purpose:** See which CTAs drive the most engagement

---

#### 2. **Quiz Analysis Report**

**Dimensions:**

- Event Name (quiz_start, quiz_complete, quiz_abandon)
- Event Label

**Metrics:**

- Event Count
- Completion Rate (calculated)

**Funnel:**

- quiz_start → quiz_progress → quiz_complete

**Purpose:** Optimize quiz UX and completion rate

---

#### 3. **Contact Method Preference**

**Dimensions:**

- Event Name (email_click, whatsapp_click, button_click)
- Event Label (filter by contact-related labels)

**Metrics:**

- Event Count

**Purpose:** Understand which contact method users prefer

---

#### 4. **Pricing Model Interest**

**Dimensions:**

- Event Label (Buy & Own vs Subscribe & Relax)

**Metrics:**

- pricing_interest event count

**Purpose:** Validate which business model resonates more

---

#### 5. **Section Engagement**

**Dimensions:**

- Event Label (section names)

**Metrics:**

- section_view event count
- Average time spent (via page engagement)

**Filter:** `event_name = "section_view"`

**Purpose:** See which content sections get most attention

---

## 🔍 Key Questions These Analytics Answer

### Business Questions

1. **Is the quiz useful?**

   - Compare: `quiz_complete` count vs `generate_lead` count
   - If high completion but low leads → quiz not driving conversions
   - If low completion → quiz too long or confusing

2. **Which pricing model is preferred?**

   - Compare: `pricing_interest` events (buy vs subscribe)
   - Helps prioritize sales approach

3. **Are users interested in my contact info?**

   - Track: `Reveal Contact Info` button clicks
   - If low clicks → users don't need contact (good)
   - If high clicks but low email/phone → users browsing

4. **Which CTA is most effective?**

   - Compare: All `cta_click` events by location
   - Optimize placement and copy of winning CTAs

5. **Do users abandon the quiz? Where?**

   - Track: `quiz_abandon` with step label
   - Fix questions where users drop off

6. **How many visitors become leads?**
   - Funnel: Page views → Section views → CTA clicks → Form submissions
   - Calculate conversion rate at each stage

---

## 🛠️ Technical Implementation

### Available Tracking Functions

Located in `src/utils/analytics.ts`:

```typescript
// Core functions
trackEvent({ action, category, label, value });
trackPageView(url, title);

// Specialized functions
trackFormSubmission(formName, success);
trackButtonClick(buttonName, location);
trackCTAClick(ctaName, location);
trackQuizEvent(action, result);
trackWhatsAppClick(location);
trackEmailClick(location);
trackExternalLink(url, linkText);
trackPricingInterest(model);
trackSectionView(sectionName);
trackLanguageChange(from, to);
trackScrollDepth(depth);
trackServiceImpression(name, price, position);
trackServiceSelection(name, price);
trackException(description, fatal);
trackDownload(fileName, fileType);
trackTiming(category, variable, value, label);
```

### Implementation Pattern

```typescript
// 1. Import
import { trackCTAClick } from "../utils/analytics";

// 2. Add to click handler
const handleClick = () => {
  trackCTAClick("Button Name", "Section Location");
  // ... rest of logic
};

// 3. For section views
useEffect(() => {
  if (inView) {
    trackSectionView("Section Name");
  }
}, [inView]);
```

---

## 📊 Expected Data Volume

Based on typical website traffic:

| Metric                | Expected Events/Month         |
| --------------------- | ----------------------------- |
| Page Views            | 500-2,000                     |
| Section Views         | 300-1,500 (avg 3-5 per visit) |
| CTA Clicks            | 50-200 (5-10% of visitors)    |
| Quiz Starts           | 20-80 (2-5% of visitors)      |
| Quiz Completions      | 10-40 (50% completion rate)   |
| Form Submissions      | 5-20 (1-2% conversion)        |
| Contact Info Reveals  | 10-50                         |
| WhatsApp/Email Clicks | 15-60                         |

**Note:** First 2-4 weeks of data needed to establish baseline.

---

## 🚀 Next Steps

### Immediate Actions

1. ✅ **Tracking Implemented** - All events now firing
2. ⏳ **Wait 1-2 weeks** - Collect baseline data
3. 📊 **Create GA4 Dashboard** - Set up custom reports above
4. 📈 **Analyze Patterns** - Review which CTAs/sections perform best

### Future Enhancements

- **Heatmaps:** Integrate Hotjar or Microsoft Clarity for visual behavior
- **A/B Testing:** Test different CTA copy or placement
- **Conversion Tracking:** Set up GA4 conversion goals
- **Enhanced Ecommerce:** Track add-on interest as product impressions

---

## 🔒 Privacy Compliance

All tracking:

- Respects Cookie Banner consent
- No PII collected (names/emails in analytics)
- Complies with GDPR
- Documented in Privacy Policy
- Users can opt-out via Cookie Banner

---

## 📝 Maintenance

### Monthly Review Checklist

- [ ] Check form submission success rate (should be >95%)
- [ ] Review quiz abandonment points
- [ ] Compare pricing model interest trends
- [ ] Identify top performing CTAs
- [ ] Monitor section view patterns
- [ ] Check for tracking errors (exceptions)

### Quarterly Actions

- [ ] Review and update tracking based on new features
- [ ] Optimize underperforming CTAs
- [ ] Add tracking for new sections/pages
- [ ] Archive and analyze trends

---

**Last Updated:** November 19, 2025  
**Analytics Version:** GA4 (G-D9P3J01G5R)  
**Implementation Status:** ✅ Complete
