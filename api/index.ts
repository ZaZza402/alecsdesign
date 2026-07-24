import type { VercelRequest, VercelResponse } from "@vercel/node";
import { readFileSync } from "fs";
import { join } from "path";

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { url } = req;

  // Detect language from URL path
  let lang = "en";

  if (url?.startsWith("/it")) {
    lang = "it";
  } else if (url?.startsWith("/ro")) {
    lang = "ro";
  }

  // Full page URL for og:url
    const urlPath = url || "/";
    const normalizedPath = urlPath.replace(/^\/(en|it|ro)(?=\/|$)/, "") || "/";
    const pageKey =
      normalizedPath === "/help/request" || normalizedPath.startsWith("/help/request/")
        ? "helpRequest"
        : normalizedPath === "/help" || normalizedPath.startsWith("/help/")
          ? "help"
          : "home";
  const ogUrl =
    `https://www.alecsdesign.xyz${urlPath === "/" ? "" : urlPath}` ||
    "https://www.alecsdesign.xyz/";

  // Canonical URL: /en/* strips the prefix (sitemap uses root paths for English)
  const canonicalPath =
    urlPath === "/en"
      ? "/"
      : urlPath.startsWith("/en/")
        ? urlPath.slice(3)
        : urlPath;
  const canonicalUrl =
    `https://www.alecsdesign.xyz${canonicalPath === "/" ? "" : canonicalPath}` ||
    "https://www.alecsdesign.xyz/";

  // Hreflang base path (without any language prefix)
  const hreflangBase =
    urlPath === "/en" || urlPath === "/it" || urlPath === "/ro"
      ? "/"
      : urlPath.replace(/^\/(en|it|ro)\//, "/").replace(/^\/(en|it|ro)$/, "/");

  const enHref =
    hreflangBase === "/"
      ? "https://www.alecsdesign.xyz/"
      : `https://www.alecsdesign.xyz${hreflangBase}`;
  const itHref =
    hreflangBase === "/"
      ? "https://www.alecsdesign.xyz/it"
      : `https://www.alecsdesign.xyz/it${hreflangBase}`;
  const roHref =
    hreflangBase === "/"
      ? "https://www.alecsdesign.xyz/ro"
      : `https://www.alecsdesign.xyz/ro${hreflangBase}`;

  // Language-specific content
  const content: Record<
    string,
    {
      title: string;
      description: string;
      keywords: string;
      locale: string;
      hero: string;
      heroSub: string;
      services: string[];
      comparison: { them: string[]; me: string[] };
    }
  > = {
    en: {
      title:
        "alecsdesign - Web Developer in Rome | Your 24/7 Digital Business Partner",
      description:
        "Custom, ultra-fast React & TypeScript websites for small businesses in Rome & Europe. Full code ownership, €0 monthly hosting fees, and direct developer access.",
      keywords:
        "web development Rome, sviluppo web Roma, React developer Rome, custom websites, freelance web developer",
            title:
              "alecsdesign - Web Developer in Rome | Your 24/7 Digital Business Partner",
            description:
              "Custom, ultra-fast React & TypeScript websites for small businesses in Rome & Europe. Full code ownership, €0 monthly hosting fees, and direct developer access.",
            keywords:
              "web development Rome, sviluppo web Roma, React developer Rome, custom websites, freelance web developer",
            locale: "en_US",
            hero: "Your website should work like your best employee - 24/7.",
            heroSub:
              "Web developer in Rome. I build fast, SEO-ready, scalable digital products for businesses that want to grow online.",
            services: [
              "Custom website design & development",
              "React & modern web applications",
              "SEO optimization & Google rankings",
              "E-commerce solutions",
              "Performance & accessibility audits",
            ],
            comparison: {
              them: [
                "3-6 second load times",
                "Hard to find on Google",
                "AI assistants can't recommend you",
                "Breaks on mobile phones",
                "Months of waiting",
                "Template with your logo",
                "Open a ticket. Wait.",
              ],
              me: [
                "Under 2 seconds",
                "Ranked from day one",
                "AI finds & suggests you",
                "Flawless on every screen",
                "Live in under 2 weeks",
                "Built only for you",
                "Message me directly",
              ],
            },
          },
          it: {
      locale: "en_US",
      hero: "Your website should work like your best employee - 24/7.",
      heroSub:
        "Web developer in Rome. I build fast, SEO-ready, scalable digital products for businesses that want to grow online.",
      services: [
        "Custom website design & development",
        "React & modern web applications",
        "SEO optimization & Google rankings",
        "E-commerce solutions",
        "Performance & accessibility audits",
      ],
      comparison: {
        them: [
          "3-6 second load times",
          "Hard to find on Google",
          "AI assistants can't recommend you",
          "Breaks on mobile phones",
          "Months of waiting",
          "Template with your logo",
          "Open a ticket. Wait.",
        ],
        me: [
          "Under 2 seconds",
          "Ranked from day one",
          "AI finds & suggests you",
          "Flawless on every screen",
          "Live in under 2 weeks",
          "Built only for you",
          "Message me directly",
        ],
      },
    },
    it: {
      title: "alecsdesign - Sviluppatore Web a Roma | Siti Web Su Misura",
      description:
        "Sviluppo siti web veloci in React e TypeScript per PMI e attività a Roma. Codice 100% tuo, zero canoni mensili di piattaforma e supporto diretto senza agenzie.",
      keywords:
        "sviluppo web Roma, sviluppatore web Roma, siti web su misura, React developer Roma, agenzia web Roma, consulenza digitale",
      locale: "it_IT",
      hero: "Il tuo sito dovrebbe lavorare come il tuo dipendente migliore - 24/7.",
      heroSub:
        "Sviluppatore web a Roma. Creo prodotti digitali veloci, ottimizzati SEO e scalabili per aziende che vogliono crescere online.",
      services: [
        "Design e sviluppo siti web personalizzati",
        "Applicazioni web React e moderne",
        "Ottimizzazione SEO e posizionamento Google",
        "Soluzioni e-commerce",
        "Audit di performance e accessibilità",
      ],
      comparison: {
        them: [
          "3-6 secondi di caricamento",
          "Quasi introvabile su Google",
          "L'AI non ti trova",
          help: {
            en: {
              title: "Free digital help for everyday problems | alecsdesign",
              description:
                "A free place to ask for help with digital problems. Simple, clear, and made for people who do not want jargon.",
              keywords:
                "free digital help, tech help, online support, simple support, help with internet problems",
              locale: "en_US",
              hero: "Free digital help, kept simple",
              heroSub:
                "If something online is getting in your way, you can send it here in plain words.",
              services: ["Website or app problems", "Email or login issues", "Phone or computer help", "Clear follow-up by email"],
              comparison: { them: ["Vague form", "Spam", "No reply", "Hard to understand"], me: ["One clear request", "Daily review", "Email reply", "Simple language"] },
              prerender: `<div style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap" aria-hidden="true"><main><section aria-label="help"><h1>Free digital help, kept simple</h1><p>If something online is getting in your way, you can send it here in plain words.</p><ul><li>Website or app problems</li><li>Email or login issues</li><li>Phone or computer help</li><li>Clear follow-up by email</li></ul></section></main></div>`,
            },
            it: {
              title: "Aiuto digitale gratuito per problemi quotidiani | alecsdesign",
              description:
                "Uno spazio gratuito per chiedere aiuto con problemi digitali. Semplice, chiaro e senza linguaggio tecnico.",
              keywords:
                "aiuto digitale gratuito, supporto tecnico semplice, assistenza online, problemi internet",
              locale: "it_IT",
              hero: "Aiuto digitale gratuito, spiegato bene",
              heroSub:
                "Se qualcosa online ti blocca, puoi scriverlo qui con parole semplici.",
              services: ["Problemi con siti o app", "Email o accessi", "Aiuto con telefono o computer", "Risposta chiara via email"],
              comparison: { them: ["Modulo vago", "Spam", "Nessuna risposta", "Difficile da capire"], me: ["Una richiesta chiara", "Controllo ogni giorno", "Risposta via email", "Linguaggio semplice"] },
              prerender: `<div style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap" aria-hidden="true"><main><section aria-label="help"><h1>Aiuto digitale gratuito, spiegato bene</h1><p>Se qualcosa online ti blocca, puoi scriverlo qui con parole semplici.</p><ul><li>Problemi con siti o app</li><li>Email o accessi</li><li>Aiuto con telefono o computer</li><li>Risposta chiara via email</li></ul></section></main></div>`,
            },
            ro: {
              title: "Ajutor digital gratuit pentru probleme de zi cu zi | alecsdesign",
              description:
                "Un spațiu gratuit unde poți cere ajutor pentru probleme digitale. Simplu, clar și fără jargon.",
              keywords:
                "ajutor digital gratuit, suport tehnic simplu, ajutor online, probleme internet",
              locale: "ro_RO",
              hero: "Ajutor digital gratuit, pe înțelesul tuturor",
              heroSub:
                "Dacă ceva online te blochează, poți scrie aici în cuvinte simple.",
              services: ["Probleme cu site-uri sau aplicații", "Email sau autentificare", "Ajutor cu telefonul sau computerul", "Răspuns clar pe email"],
              comparison: { them: ["Formular vag", "Spam", "Fără răspuns", "Greu de înțeles"], me: ["O cerere clară", "Verific zilnic", "Răspuns pe email", "Limbaj simplu"] },
              prerender: `<div style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap" aria-hidden="true"><main><section aria-label="help"><h1>Ajutor digital gratuit, pe înțelesul tuturor</h1><p>Dacă ceva online te blochează, poți scrie aici în cuvinte simple.</p><ul><li>Probleme cu site-uri sau aplicații</li><li>Email sau autentificare</li><li>Ajutor cu telefonul sau computerul</li><li>Răspuns clar pe email</li></ul></section></main></div>`,
            },
          "Si rompe sullo smartphone",
          "Mesi di attesa",
          "Template col tuo logo",
          "Apri un ticket. Aspetta.",
        ],
        me: [
        const prerender = langContent.prerender;
      hero: "Site-ul tău ar trebui să lucreze ca cel mai bun angajat al tău - 24/7.",
      heroSub:
        "Dezvoltator web în Roma. Construiesc produse digitale rapide, optimizate SEO și scalabile pentru afaceri care vor să crească online.",
      services: [
        "Design și dezvoltare website personalizat",
        "Aplicații web React și moderne",
        "Optimizare SEO și poziționare Google",
        "Soluții e-commerce",
        "Audituri de performanță și accesibilitate",
      ],
      comparison: {
        them: [
          "3-6 secunde timp de încărcare",
          "Greu de găsit pe Google",
          "Nu te găsește AI-ul",
          "Se strică pe telefon",
          "Luni de așteptare",
          "Șablon cu logo-ul tău",
          "Deschizi tichet. Aștepți.",
        ],
        me: [
          "Sub 2 secunde",
          "Vizibil din prima zi",
          "AI-ul te recomandă",
          "Perfect pe orice ecran",
          "Online în sub 2 săptămâni",
          "Creat doar pentru tine",
          "Îmi scrii direct",
        ],
      },
    },
  };

  const langContent = content[lang];

  // Pre-rendered semantic HTML injected into #root.
  const prerender = `<div style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap" aria-hidden="true">
<main>
  <section aria-label="hero">
    <h1>${langContent.hero}</h1>
    <p>${langContent.heroSub}</p>
  </section>
  <section aria-label="services">
    <ul>${langContent.services.map((s) => `<li>${s}</li>`).join("")}</ul>
  </section>
  <section aria-label="comparison">
    <div>
      <ul>${langContent.comparison.them.map((s) => `<li>${s}</li>`).join("")}</ul>
    </div>
    <div>
      <ul>${langContent.comparison.me.map((s) => `<li>${s}</li>`).join("")}</ul>
    </div>
  </section>
</main></div>`;

  // Read the base HTML file generated by Vite build
  const htmlPath = join(process.cwd(), "dist", "index.html");
  let html = readFileSync(htmlPath, "utf-8");

  // Replace meta tags and content dynamically based on language
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
      `<meta property="og:url" content="${ogUrl}"`,
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
    .replace('<div id="root"></div>', `<div id="root">${prerender}</div>`);

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, must-revalidate");
  res.status(200).send(html);
}
