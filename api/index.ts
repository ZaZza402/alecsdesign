import type { VercelRequest, VercelResponse } from '@vercel/node';
import { readFileSync } from 'fs';
import { join } from 'path';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { url } = req;
  
  // Detect language from URL path
  let lang = 'en';
  let ogUrl = 'https://www.alecsdesign.xyz/';
  
  if (url?.startsWith('/it')) {
    lang = 'it';
    ogUrl = 'https://www.alecsdesign.xyz/it';
  } else if (url?.startsWith('/ro')) {
    lang = 'ro';
    ogUrl = 'https://www.alecsdesign.xyz/ro';
  } else if (url === '/') {
    ogUrl = 'https://www.alecsdesign.xyz/';
  }
  
  // Language-specific content
  const content: Record<string, { title: string; description: string; locale: string }> = {
    en: {
      title: 'alecsdesign - Web Developer in Rome | Your 24/7 Digital Business Partner',
      description: 'Transform your business with scalable web solutions that work 24/7. Expert web developer in Rome specializing in React applications, e-commerce, and SEO-optimized websites. Your digital growth partner who builds solutions, not just websites.',
      locale: 'en_US'
    },
    it: {
      title: 'alecsdesign - Sviluppatore Web a Roma | Il Tuo Partner Digitale 24/7',
      description: 'Trasforma la tua attività con soluzioni web scalabili che lavorano 24/7. Sviluppatore web esperto a Roma specializzato in applicazioni React, e-commerce e siti web ottimizzati SEO. Il tuo partner digitale che costruisce soluzioni, non solo siti web.',
      locale: 'it_IT'
    },
    ro: {
      title: 'alecsdesign - Dezvoltator Web în Roma | Partenerul Tău Digital 24/7',
      description: 'Transformă-ți afacerea cu soluții web scalabile care funcționează 24/7. Dezvoltator web expert în Roma specializat în aplicații React, e-commerce și site-uri web optimizate SEO. Partenerul tău digital care construiește soluții, nu doar site-uri web.',
      locale: 'ro_RO'
    }
  };
  
  const langContent = content[lang];
  
  // Read the base HTML file
  const htmlPath = join(process.cwd(), 'dist', 'index.html');
  let html = readFileSync(htmlPath, 'utf-8');
  
  // Replace meta tags with language-specific content
  html = html
    .replace(
      /<meta property="og:title" content="[^"]*"/g,
      `<meta property="og:title" content="${langContent.title}"`
    )
    .replace(
      /<meta property="og:description" content="[^"]*"/g,
      `<meta property="og:description" content="${langContent.description}"`
    )
    .replace(
      /<meta property="og:url" content="[^"]*"/g,
      `<meta property="og:url" content="${ogUrl}"`
    )
    .replace(
      /<meta property="og:locale" content="[^"]*"/g,
      `<meta property="og:locale" content="${langContent.locale}"`
    )
    .replace(
      /<meta name="description" content="[^"]*"/g,
      `<meta name="description" content="${langContent.description}"`
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*"/g,
      `<meta name="twitter:title" content="${langContent.title}"`
    )
    .replace(
      /<meta name="twitter:description" content="[^"]*"/g,
      `<meta name="twitter:description" content="${langContent.description}"`
    )
    .replace(
      /<title>[^<]*<\/title>/g,
      `<title>${langContent.title}</title>`
    )
    .replace(
      /<html lang="[^"]*"/g,
      `<html lang="${lang}"`
    );
  
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');
  res.status(200).send(html);
}
