# alecsdesign - Professional Web Development Portfolio

## 🚀 Deployment Guide for Vercel

### Prerequisites

- GitHub account
- Vercel account (sign up at vercel.com)
- Domain: www.alecsdesign.xyz

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Complete portfolio with SEO optimization"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/alecsdesign.git
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure project settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Step 3: Configure Domain

1. In Vercel project settings, go to "Domains"
2. Add your domain: `www.alecsdesign.xyz`
3. Add root domain: `alecsdesign.xyz` (will redirect to www)
4. Follow Vercel's DNS configuration instructions

### Step 4: Environment Variables (if needed)

Currently, no environment variables are required. If you add API keys or secrets later:

1. Go to Project Settings → Environment Variables
2. Add variables for Production, Preview, and Development

## 📊 SEO Features Implemented

### ✅ Meta Tags & Open Graph

- Comprehensive meta tags for all pages
- Open Graph tags for social media sharing
- Twitter Card integration
- Multi-language support (EN, IT, RO)

### ✅ Structured Data (Schema.org)

- LocalBusiness schema for local SEO in Rome/Lazio
- WebSite schema with search action
- BlogPosting schema for articles
- Breadcrumb navigation schema

### ✅ Technical SEO

- XML Sitemap (`/sitemap.xml`)
- Robots.txt configuration
- Canonical URLs
- Language alternates (hreflang)
- Geo-targeting for Rome, Lazio, Italy

### ✅ Performance Optimization

- Code splitting by vendor chunks
- Lazy loading for blog pages
- Minified production builds
- Optimized CSS splitting
- Fast initial page load

### ✅ Accessibility

- Semantic HTML5 elements
- ARIA labels and roles
- Proper heading hierarchy
- Keyboard navigation support

## 🎯 Local SEO Targeting

### Geographic Focus

- **Primary**: Rome (Roma), Lazio, Italy
- **Secondary**: Europe-wide
- Geo-coordinates included in metadata
- LocalBusiness schema with service area

### Keywords Targeted

- web development Rome (sviluppo web Roma)
- React developer Rome
- modern web applications Italy
- e-commerce development Lazio
- SEO optimization Rome

## 🔧 Development

### Install Dependencies

```bash
npm install
```

### Run Development Server (Network Exposed)

```bash
npm run dev
```

Server will be accessible at:

- Local: http://localhost:5174
- Network: http://YOUR_IP:5174 (for testing on phone)

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📱 Testing on Mobile Devices

The dev server is now configured with `--host` flag, so you can test on your phone:

1. Make sure your phone is on the same WiFi network
2. Run `npm run dev`
3. Find your computer's IP address:
   - Windows: `ipconfig` (look for IPv4 Address)
   - Mac/Linux: `ifconfig` (look for inet)
4. On your phone, navigate to: `http://YOUR_IP:5174`

## 🔍 SEO Checklist for Launch

- [x] Meta tags (title, description, keywords)
- [x] Open Graph tags
- [x] Twitter Cards
- [x] Structured data (Schema.org)
- [x] XML sitemap
- [x] Robots.txt
- [x] Canonical URLs
- [x] Language alternates
- [x] Geo-targeting
- [x] Performance optimization
- [x] Semantic HTML
- [x] ARIA labels
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify Google My Business listing
- [ ] Set up Google Analytics (optional)
- [ ] Test with Lighthouse (aim for 90+ score)

## 📈 Post-Launch SEO Tasks

1. **Google Search Console**

   - Verify domain ownership
   - Submit sitemap: `https://www.alecsdesign.xyz/sitemap.xml`
   - Monitor indexing status
   - Check for crawl errors

2. **Bing Webmaster Tools**

   - Verify domain
   - Submit sitemap
   - Monitor search performance

3. **Google My Business**

   - Claim your business listing
   - Add Rome, Lazio location
   - Link to website
   - Add business hours and services

4. **Local Directories**

   - Register on Italian business directories
   - Add to tech/web development directories
   - Ensure NAP (Name, Address, Phone) consistency

5. **Lighthouse Testing**
   - Run Lighthouse audit
   - Aim for 90+ scores in all categories
   - Address any issues found

## 🛠 Tech Stack

- **Framework**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 7.1.9
- **Routing**: React Router DOM 7.9.5
- **Styling**: Tailwind CSS 3.4.18
- **Animations**: Framer Motion 12.23.22
- **Icons**: Lucide React 0.545.0
- **i18n**: react-i18next 16.2.3
- **Deployment**: Vercel

## 📞 Contact

For questions about this project:

- **Email**: contact@alecsdesign.xyz
- **Website**: https://www.alecsdesign.xyz

---

Built with ❤️ by alecsdesign
