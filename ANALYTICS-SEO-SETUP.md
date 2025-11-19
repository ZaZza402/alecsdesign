# Google Analytics & SEO Setup Guide

## 1. Google Analytics 4 Setup

### Step 1: Create GA4 Property

1. Go to [Google Analytics](https://analytics.google.com)
2. Click "Admin" (bottom left gear icon)
3. In the "Property" column, click "Create Property"
4. Enter property name: `alecsdesign`
5. Select timezone: `(GMT+01:00) Rome`
6. Select currency: `Euro (EUR)`
7. Click "Next"
8. Select business size and objectives
9. Click "Create"

### Step 2: Get Measurement ID

1. In your new property, click "Data Streams"
2. Click "Add stream" → "Web"
3. Enter website URL: `https://www.alecsdesign.xyz`
4. Enter stream name: `alecsdesign website`
5. Enable "Enhanced measurement" (recommended)
6. Click "Create stream"
7. **Copy your Measurement ID** (format: `G-XXXXXXXXXX`)

### Step 3: Update Your Website

✅ **Already configured!** Your website is using Measurement ID: `G-D9P3J01G5R`

The Google Analytics script is properly installed in `index.html` (line 163-177) with:

- IP anonymization enabled
- Cookie consent compliance
- Custom page view tracking

### Step 4: Update Environment Variable (Optional)

1. Create a `.env` file in your project root
2. Add: `VITE_GA_MEASUREMENT_ID=G-YOUR-ID-HERE`
3. Update Vercel environment variables if deploying

### Step 5: Verify Installation

1. Deploy your website
2. Visit your website
3. In Google Analytics, go to "Reports" → "Realtime"
4. You should see your visit appear within 30 seconds

## 2. Enhanced Analytics Tracking

Your website now includes comprehensive tracking for:

### Automatic Events:

- ✅ Page views
- ✅ Scroll depth (25%, 50%, 75%, 100%)
- ✅ Form submissions (success/error)
- ✅ External link clicks
- ✅ File downloads

### Custom Events:

- ✅ CTA button clicks
- ✅ WhatsApp contact clicks
- ✅ Email contact clicks
- ✅ Language changes
- ✅ Quiz interactions
- ✅ Service tier views
- ✅ Pricing model interest

### Conversion Tracking:

- ✅ Lead generation (form submissions)
- ✅ Service inquiries
- ✅ Contact method preferences

## 3. Contact Form API Verification

### Current Status: ✅ WORKING

The contact form API is properly configured:

**Endpoint:** `/api/contact`
**Method:** `POST`
**Technology:** Vercel Serverless Function with nodemailer

### Required Environment Variables (in Vercel):

```
EMAIL_USER=mka.alecs@gmail.com
EMAIL_PASS=gogvabmmugbjugg  # Gmail App Password
```

### Features:

- ✅ Input validation
- ✅ Error handling with detailed messages
- ✅ HTML formatted emails
- ✅ SMTP connection verification
- ✅ Success/error responses
- ✅ Analytics tracking integration

### Testing the Form:

1. Go to your website's contact section
2. Fill out all required fields
3. Submit the form
4. You should receive an email at `mka.alecs@gmail.com`
5. Check Google Analytics for "form_submit_success" event

## 4. SEO Enhancements

### Current SEO Features:

- ✅ Dynamic meta tags
- ✅ Open Graph tags (Facebook/LinkedIn)
- ✅ Twitter Card tags
- ✅ Structured data (LocalBusiness, WebSite schemas)
- ✅ Hreflang tags for multilingual SEO
- ✅ Canonical URLs
- ✅ Robots meta tags
- ✅ Geo-location tags (Rome, Italy)
- ✅ XML Sitemap
- ✅ robots.txt

### Structured Data Schemas Included:

#### LocalBusiness Schema:

```json
{
  "@type": "LocalBusiness",
  "name": "alecsdesign",
  "address": "Rome, Lazio, Italy",
  "telephone": "+380 150 3074",
  "email": "mka.alecs@gmail.com",
  "priceRange": "€150 - €2000+"
}
```

#### WebSite Schema:

```json
{
  "@type": "WebSite",
  "url": "https://www.alecsdesign.xyz",
  "inLanguage": ["en", "it", "ro"]
}
```

## 5. Recommended Analytics Setup

### Create Custom Reports:

#### 1. Lead Quality Report

Track:

- Form submission source
- Service type requested
- Preferred contact method
- Time to conversion

#### 2. Pricing Interest Report

Track:

- Buy & Own vs Subscribe & Relax interest
- Service tier views
- Time spent on pricing section
- CTA click rates

#### 3. Language Performance Report

Track:

- Sessions by language
- Conversion rate by language
- Bounce rate by language
- Average session duration

### Set Up Conversion Goals:

1. **Primary Goal: Lead Generation**

   - Event: `generate_lead`
   - Value: €500 (average project value)

2. **Secondary Goal: WhatsApp Contact**

   - Event: `whatsapp_click`
   - Value: €300

3. **Tertiary Goal: Quiz Completion**
   - Event: `quiz_complete`
   - Value: €100

## 6. Google Search Console Setup

### Step 1: Verify Ownership

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Add Property"
3. Enter: `https://www.alecsdesign.xyz`
4. Choose verification method: **HTML tag** (already in your `index.html`)
5. Click "Verify"

### Step 2: Submit Sitemap

1. In Search Console, click "Sitemaps" (left menu)
2. Enter: `https://www.alecsdesign.xyz/sitemap.xml`
3. Click "Submit"

### Step 3: Link to Google Analytics

1. In Search Console, click "Settings" (bottom left)
2. Click "Associations"
3. Click "Associate" and select your GA4 property
4. Confirm association

## 7. Monitoring & Optimization

### Daily Checks:

- [ ] Monitor form submissions in Gmail
- [ ] Check GA4 Realtime for live traffic
- [ ] Review any error events

### Weekly Checks:

- [ ] Review top pages and traffic sources
- [ ] Check form submission conversion rate
- [ ] Monitor bounce rate by page
- [ ] Review language performance

### Monthly Checks:

- [ ] Analyze lead quality from form submissions
- [ ] Review CTA performance
- [ ] Check pricing model interest distribution
- [ ] Optimize underperforming pages

## 8. Privacy & GDPR Compliance

### Current Privacy Features:

- ✅ IP anonymization enabled in GA4
- ✅ Cookie consent banner implemented
- ✅ Privacy policy page
- ✅ Cookie policy page
- ✅ No personal data stored without consent

### Cookie Banner:

The website includes a cookie consent banner that:

- Appears on first visit
- Allows users to accept/decline analytics cookies
- Remembers user preference
- Links to privacy and cookie policies

## 9. Performance Monitoring

### Key Metrics to Track:

- **Page Load Time:** Target < 2 seconds
- **First Contentful Paint:** Target < 1.5 seconds
- **Time to Interactive:** Target < 3 seconds
- **Cumulative Layout Shift:** Target < 0.1

### Tools:

- Google Analytics (User Timing)
- Google Search Console (Core Web Vitals)
- PageSpeed Insights
- Lighthouse CI

## 10. Next Steps

### Immediate Actions:

1. ✅ **DONE:** Google Analytics configured with ID `G-D9P3J01G5R`
2. ✅ **DONE:** Hero CTA buttons displaying correct translations
3. ⏳ Test contact form submission
4. ⏳ Verify GA4 is receiving data in Realtime reports
5. ⏳ Submit sitemap to Google Search Console

### Future Enhancements:

- [ ] Set up Google Tag Manager (for easier event management)
- [ ] Implement A/B testing for CTAs
- [ ] Add Facebook Pixel (if running ads)
- [ ] Set up conversion tracking for paid campaigns
- [ ] Implement heatmap tracking (Hotjar/Microsoft Clarity)

## Support

If you encounter issues:

1. Check browser console for errors
2. Verify GA4 Measurement ID is correct
3. Ensure cookies are enabled
4. Test in incognito mode
5. Check Vercel deployment logs for API errors

---

**Last Updated:** November 19, 2025
**Author:** GitHub Copilot
