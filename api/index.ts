import type { VercelRequest, VercelResponse } from "@vercel/node";
import { readFileSync } from "fs";
import { join } from "path";

type PageContent = {
  title: string;
  description: string;
  keywords: string;
  locale: string;
  prerender: string;
  ogImage: string;
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
        ogImage: "https://www.alecsdesign.xyz/logo/og-image.jpg",
        prerender: `<div style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap" aria-hidden="true"><main><section aria-label="hero"><h1>Your website should work like your best employee - 24/7.</h1><p>Web developer in Rome. I build fast, SEO-ready, scalable digital products for businesses that want to grow online.</p></section></main></div>`,
      },
      it: {
        title: "alecsdesign - Sviluppatore Web a Roma | Siti Web Su Misura",
        description:
          "Sviluppo siti web veloci in React e TypeScript per PMI e attività a Roma. Codice 100% tuo, zero canoni mensili di piattaforma e supporto diretto senza agenzie.",
        keywords:
          "sviluppo web Roma, sviluppatore web Roma, siti web su misura, React developer Roma, agenzia web Roma, consulenza digitale",
        locale: "it_IT",
        ogImage: "https://www.alecsdesign.xyz/logo/og-image.jpg",
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
        ogImage: "https://www.alecsdesign.xyz/logo/og-image.jpg",
        prerender: `<div style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap" aria-hidden="true"><main><section aria-label="hero"><h1>Site-ul tău ar trebui să lucreze ca cel mai bun angajat al tău - 24/7.</h1><p>Dezvoltator web în Roma. Construiesc produse digitale rapide, optimizate SEO și scalabile pentru afaceri care vor să crească online.</p></section></main></div>`,
      },
    },
    help: {
      en: {
        title:
          "Free Human Digital Help | Website, Account, Email, Device Problems",
        description:
          "Get free, human-to-human digital help for everyday issues: websites, accounts, email, forms, and device settings. Clear step-by-step guidance from a real developer.",
        keywords:
          "free digital help, human tech support, website troubleshooting, account login help, email problem help, device settings support, internet form errors",
        locale: "en_US",
        ogImage: "https://www.alecsdesign.xyz/images/help/en/help.webp",
        prerender: `<div style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap" aria-hidden="true"><main><section aria-label="help"><h1>Stuck online? Let's fix it in plain English.</h1><p>Free human-to-human digital help for websites, accounts, forms, email, and device issues.</p></section></main></div>`,
      },
      it: {
        title:
          "Aiuto Digitale Umano Gratuito | Siti, Account, Email, Dispositivi",
        description:
          "Ricevi aiuto digitale gratuito e umano per problemi quotidiani con siti, account, email, moduli online e impostazioni del dispositivo. Risposte chiare da una persona vera.",
        keywords:
          "aiuto digitale gratuito, supporto tecnico umano, problemi accesso account, assistenza email, errori modulo online, problemi sito web, aiuto impostazioni dispositivo",
        locale: "it_IT",
        ogImage: "https://www.alecsdesign.xyz/images/help/it/help.webp",
        prerender: `<div style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap" aria-hidden="true"><main><section aria-label="help"><h1>Bloccato online? Risolviamolo insieme.</h1><p>Aiuto umano gratuito per problemi con siti, account, email, moduli e impostazioni digitali.</p></section></main></div>`,
      },
      ro: {
        title: "Ajutor Digital Uman Gratuit | Site, Cont, Email, Dispozitiv",
        description:
          "Primești ajutor digital gratuit, om la om, pentru probleme zilnice cu site-uri, conturi, email, formulare online și setări de dispozitiv. Pași clari de la o persoană reală.",
        keywords:
          "ajutor digital gratuit, suport tehnic uman, probleme autentificare cont, asistență email, erori formular online, probleme site web, ajutor setări dispozitiv",
        locale: "ro_RO",
        ogImage: "https://www.alecsdesign.xyz/images/help/ro/help.webp",
        prerender: `<div style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap" aria-hidden="true"><main><section aria-label="help"><h1>Te-a blocat ceva online? Hai să-l rezolvăm.</h1><p>Ajutor digital gratuit, de la om la om, pentru site-uri, conturi, email și formulare.</p></section></main></div>`,
      },
    },
    helpRequest: {
      en: {
        title: "Request Free Digital Help | Send Your Problem",
        description:
          "Submit your digital issue through a simple protected form. A real developer reviews your request and replies with clear human guidance by email.",
        keywords:
          "digital help request form, free tech support request, ask a developer online, website issue form, login problem help, email troubleshooting request",
        locale: "en_US",
        ogImage: "https://www.alecsdesign.xyz/images/help/en/help.webp",
        prerender: `<div style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap" aria-hidden="true"><main><section aria-label="help-request"><h1>Tell me where you are stuck.</h1><p>Submit one clear digital issue and get a human reply by email.</p></section></main></div>`,
      },
      it: {
        title: "Richiedi Aiuto Digitale Gratuito | Invia il Tuo Problema",
        description:
          "Invia il tuo problema digitale con un modulo semplice e protetto. Una persona vera legge la richiesta e risponde via email con istruzioni chiare.",
        keywords:
          "modulo richiesta aiuto digitale, supporto tecnico gratuito online, chiedere aiuto sviluppatore, problema login account, assistenza sito web, richiesta aiuto email",
        locale: "it_IT",
        ogImage: "https://www.alecsdesign.xyz/images/help/it/help.webp",
        prerender: `<div style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap" aria-hidden="true"><main><section aria-label="help-request"><h1>Dimmi dove ti sei bloccato.</h1><p>Invia una richiesta chiara e ricevi una risposta umana via email.</p></section></main></div>`,
      },
      ro: {
        title: "Cere Ajutor Digital Gratuit | Trimite Problema Ta",
        description:
          "Trimite problema ta digitală printr-un formular simplu și protejat. O persoană reală îți citește cererea și îți răspunde pe email cu pași clari.",
        keywords:
          "formular cerere ajutor digital, suport tehnic gratuit online, cere ajutor dezvoltator, problemă autentificare cont, asistență site web, cerere ajutor email",
        locale: "ro_RO",
        ogImage: "https://www.alecsdesign.xyz/images/help/ro/help.webp",
        prerender: `<div style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap" aria-hidden="true"><main><section aria-label="help-request"><h1>Spune-mi unde te-ai blocat.</h1><p>Trimite problema clar și primește răspuns uman pe email.</p></section></main></div>`,
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
      /<meta property="og:image" content="[^"]*"/g,
      `<meta property="og:image" content="${langContent.ogImage}"`,
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
      /<meta name="twitter:image" content="[^"]*"/g,
      `<meta name="twitter:image" content="${langContent.ogImage}"`,
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
