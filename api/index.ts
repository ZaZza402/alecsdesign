import type { VercelRequest, VercelResponse } from "@vercel/node";
import { readFileSync } from "fs";
import { join } from "path";

type PageContent = {
  title: string;
  description: string;
  keywords: string;
  locale: string;
  prerender: string;
  noindex?: boolean;
};

const baseUrl = "https://www.alecsdesign.xyz";

function stripLanguagePrefix(urlPath: string) {
  if (urlPath === "/en" || urlPath === "/it" || urlPath === "/ro") return "/";
  return urlPath.replace(/^\/(en|it|ro)(?=\/|$)/, "") || "/";
}

function buildHreflangHref(lang: "en" | "it" | "ro", basePath: string) {
  if (basePath === "/")
    return lang === "en" ? `${baseUrl}/` : `${baseUrl}/${lang}`;
  return lang === "en"
    ? `${baseUrl}${basePath}`
    : `${baseUrl}/${lang}${basePath}`;
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  const urlPath = req.url || "/";
  const lang: "en" | "it" | "ro" = urlPath.startsWith("/it")
    ? "it"
    : urlPath.startsWith("/ro")
      ? "ro"
      : "en";
  const basePath = stripLanguagePrefix(urlPath);
  const pageKey =
    basePath === "/help/request" || basePath.startsWith("/help/request/")
      ? "helpRequest"
      : basePath === "/help" || basePath.startsWith("/help/")
        ? "help"
        : "home";

  const content: Record<string, Record<string, PageContent>> = {
    home: {
      en: {
        title:
          "alecsdesign - Web Developer in Rome | Your 24/7 Digital Business Partner",
        description:
          "Custom, ultra-fast React & TypeScript websites for small businesses in Rome & Europe. Full code ownership, €0 monthly hosting fees, and direct developer access.",
        keywords:
          "web development Rome, sviluppo web Roma, React developer Rome, custom websites, freelance web developer",
        locale: "en_US",
        prerender: `<div style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap" aria-hidden="true"><main><section aria-label="hero"><h1>Your website should work like your best employee - 24/7.</h1><p>Web developer in Rome. I build fast, SEO-ready, scalable digital products for businesses that want to grow online.</p></section></main></div>`,
      },
      it: {
        title: "alecsdesign - Sviluppatore Web a Roma | Siti Web Su Misura",
        description:
          "Sviluppo siti web veloci in React e TypeScript per PMI e attività a Roma. Codice 100% tuo, zero canoni mensili di piattaforma e supporto diretto senza agenzie.",
        keywords:
          "sviluppo web Roma, sviluppatore web Roma, siti web su misura, React developer Roma, agenzia web Roma, consulenza digitale",
        locale: "it_IT",
        prerender: `<div style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap" aria-hidden="true"><main><section aria-label="hero"><h1>Il tuo sito dovrebbe lavorare come il tuo dipendente migliore - 24/7.</h1><p>Sviluppatore web a Roma. Creo prodotti digitali veloci, ottimizzati SEO e scalabili per aziende che vogliono crescere online.</p></section></main></div>`,
      },
      ro: {
        title:
          "alecsdesign - Dezvoltator Web în Roma | Site-uri Web Personalizate",
        description:
          "Dezvoltare site-uri web rapide în React și TypeScript pentru afaceri în Roma și Europa. Cod 100% al tău, zero comisioane lunare și suport direct.",
        keywords:
          "dezvoltator web Roma, site-uri web personalizate, creare site web, programator web Italia, React developer",
        locale: "ro_RO",
        prerender: `<div style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap" aria-hidden="true"><main><section aria-label="hero"><h1>Site-ul tău ar trebui să lucreze ca cel mai bun angajat al tău - 24/7.</h1><p>Dezvoltator web în Roma. Construiesc produse digitale rapide, optimizate SEO și scalabile pentru afaceri care vor să crească online.</p></section></main></div>`,
      },
    },
    help: {
      en: {
        title: "Free digital help for everyday problems | alecsdesign",
        description:
          "A free place to ask for help with digital problems. Simple, clear, and made for people who do not want jargon.",
        keywords:
          "free digital help, tech help, online support, simple support, help with internet problems",
        locale: "en_US",
        prerender: `<div style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap" aria-hidden="true"><main><section aria-label="help"><h1>Free digital help, kept simple</h1><p>If something online is getting in your way, you can send it here in plain words.</p></section></main></div>`,
      },
      it: {
        title: "Aiuto digitale gratuito per problemi quotidiani | alecsdesign",
        description:
          "Uno spazio gratuito per chiedere aiuto con problemi digitali. Semplice, chiaro e senza linguaggio tecnico.",
        keywords:
          "aiuto digitale gratuito, supporto tecnico semplice, assistenza online, problemi internet",
        locale: "it_IT",
        prerender: `<div style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap" aria-hidden="true"><main><section aria-label="help"><h1>Aiuto digitale gratuito, spiegato bene</h1><p>Se qualcosa online ti blocca, puoi scriverlo qui con parole semplici.</p></section></main></div>`,
      },
      ro: {
        title:
          "Ajutor digital gratuit pentru probleme de zi cu zi | alecsdesign",
        description:
          "Un spațiu gratuit unde poți cere ajutor pentru probleme digitale. Simplu, clar și fără jargon.",
        keywords:
          "ajutor digital gratuit, suport tehnic simplu, ajutor online, probleme internet",
        locale: "ro_RO",
        prerender: `<div style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap" aria-hidden="true"><main><section aria-label="help"><h1>Ajutor digital gratuit, pe înțelesul tuturor</h1><p>Dacă ceva online te blochează, poți scrie aici în cuvinte simple.</p></section></main></div>`,
      },
    },
    helpRequest: {
      en: {
        title: "Send a digital help request",
        description:
          "A short, guarded form for people who need help with one clear digital problem.",
        keywords:
          "digital help request, support form, simple tech help, free assistance",
        locale: "en_US",
        noindex: true,
        prerender: `<div style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap" aria-hidden="true"><main><section aria-label="help-request"><h1>Tell me what is happening</h1><p>Use one clear request at a time.</p></section></main></div>`,
      },
      it: {
        title: "Invia una richiesta di aiuto digitale",
        description:
          "Un modulo breve e protetto per chi ha bisogno di aiuto con un solo problema digitale chiaro.",
        keywords:
          "richiesta aiuto digitale, modulo supporto, assistenza tecnica semplice",
        locale: "it_IT",
        noindex: true,
        prerender: `<div style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap" aria-hidden="true"><main><section aria-label="help-request"><h1>Dimmi cosa succede</h1><p>Una richiesta chiara alla volta.</p></section></main></div>`,
      },
      ro: {
        title: "Trimite o cerere de ajutor digital",
        description:
          "Un formular scurt și protejat pentru oamenii care au nevoie de ajutor cu o singură problemă digitală clară.",
        keywords:
          "cerere ajutor digital, formular suport, ajutor tehnic simplu",
        locale: "ro_RO",
        noindex: true,
        prerender: `<div style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap" aria-hidden="true"><main><section aria-label="help-request"><h1>Spune-mi ce se întâmplă</h1><p>O singură cerere clară odată.</p></section></main></div>`,
      },
    },
  };

  const langContent = content[pageKey][lang];
  const canonicalPath =
    urlPath === "/en"
      ? "/"
      : urlPath.startsWith("/en/")
        ? urlPath.slice(3)
        : urlPath;
  const canonicalUrl = `${baseUrl}${canonicalPath === "/" ? "" : canonicalPath}`;
  const hreflangBase = stripLanguagePrefix(urlPath);
  const enHref = buildHreflangHref("en", hreflangBase);
  const itHref = buildHreflangHref("it", hreflangBase);
  const roHref = buildHreflangHref("ro", hreflangBase);
  const robotsContent = langContent.noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  const htmlPath = join(process.cwd(), "dist", "index.html");
  let html = readFileSync(htmlPath, "utf-8");

  html = html
    .replace(
      /<meta property="og:title" content="[^"]*"/g,
      `<meta property="og:title" content="${langContent.title}"`,
    )
    .replace(
      /<meta property="og:description" content="[^"]*"/g,
      `<meta property="og:description" content="${langContent.description}"`,
    )
    .replace(
      /<meta property="og:url" content="[^"]*"/g,
      `<meta property="og:url" content="${urlPath === "/" ? baseUrl : `${baseUrl}${urlPath}`}"`,
    )
    .replace(
      /<meta property="og:locale" content="[^"]*"/g,
      `<meta property="og:locale" content="${langContent.locale}"`,
    )
    .replace(
      /<meta name="description" content="[^"]*"/g,
      `<meta name="description" content="${langContent.description}"`,
    )
    .replace(
      /<meta name="title" content="[^"]*"/g,
      `<meta name="title" content="${langContent.title}"`,
    )
    .replace(
      /<meta name="keywords" content="[^"]*"/g,
      `<meta name="keywords" content="${langContent.keywords}"`,
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*"/g,
      `<meta name="twitter:title" content="${langContent.title}"`,
    )
    .replace(
      /<meta name="twitter:description" content="[^"]*"/g,
      `<meta name="twitter:description" content="${langContent.description}"`,
    )
    .replace(
      /<meta name="robots" content="[^"]*"/g,
      `<meta name="robots" content="${robotsContent}"`,
    )
    .replace(/<title>[^<]*<\/title>/g, `<title>${langContent.title}</title>`)
    .replace(/<html lang="[^"]*"/g, `<html lang="${lang}"`)
    .replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${canonicalUrl}" />`,
    )
    .replace(/hreflang="en" href="[^"]*"/, `hreflang="en" href="${enHref}"`)
    .replace(/hreflang="it" href="[^"]*"/, `hreflang="it" href="${itHref}"`)
    .replace(/hreflang="ro" href="[^"]*"/, `hreflang="ro" href="${roHref}"`)
    .replace(
      /hreflang="x-default"[\s\S]*?href="[^"]*"/,
      `hreflang="x-default"\n      href="${enHref}"`,
    )
    .replace(
      '<div id="root"></div>',
      `<div id="root">${langContent.prerender}</div>`,
    );

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, must-revalidate");
  res.status(200).send(html);
}
