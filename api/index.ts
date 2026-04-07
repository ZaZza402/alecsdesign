import type { VercelRequest, VercelResponse } from "@vercel/node";
import { readFileSync } from "fs";
import { join } from "path";

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { url } = req;

  // Detect language from URL path
  let lang = "en";
  let ogUrl = "https://www.alecsdesign.xyz/";

  if (url?.startsWith("/it")) {
    lang = "it";
    ogUrl = "https://www.alecsdesign.xyz/it";
  } else if (url?.startsWith("/ro")) {
    lang = "ro";
    ogUrl = "https://www.alecsdesign.xyz/ro";
  } else if (url === "/") {
    ogUrl = "https://www.alecsdesign.xyz/";
  }

  // Language-specific content
  const content: Record<
    string,
    {
      title: string;
      description: string;
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
        "Transform your business with scalable web solutions that work 24/7. Expert web developer in Rome specializing in React applications, e-commerce, and SEO-optimized websites. Your digital growth partner who builds solutions, not just websites.",
      locale: "en_US",
      hero: "Your website should work like your best employee — 24/7.",
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
          "3–6 second load times",
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
      title:
        "alecsdesign - Sviluppatore Web a Roma | Il Tuo Partner Digitale 24/7",
      description:
        "Trasforma la tua attività con soluzioni web scalabili che lavorano 24/7. Sviluppatore web esperto a Roma specializzato in applicazioni React, e-commerce e siti web ottimizzati SEO. Il tuo partner digitale che costruisce soluzioni, non solo siti web.",
      locale: "it_IT",
      hero: "Il tuo sito dovrebbe lavorare come il tuo dipendente migliore — 24/7.",
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
          "3–6 secondi di caricamento",
          "Quasi introvabile su Google",
          "L'AI non ti trova",
          "Si rompe sullo smartphone",
          "Mesi di attesa",
          "Template col tuo logo",
          "Apri un ticket. Aspetta.",
        ],
        me: [
          "Sotto i 2 secondi",
          "Posizionato dal giorno 1",
          "L'AI ti consiglia",
          "Perfetto su ogni schermo",
          "Online entro 2 settimane",
          "Creato solo per te",
          "Mi scrivi direttamente",
        ],
      },
    },
    ro: {
      title:
        "alecsdesign - Dezvoltator Web în Roma | Partenerul Tău Digital 24/7",
      description:
        "Transformă-ți afacerea cu soluții web scalabile care funcționează 24/7. Dezvoltator web expert în Roma specializat în aplicații React, e-commerce și site-uri web optimizate SEO. Partenerul tău digital care construiește soluții, nu doar site-uri web.",
      locale: "ro_RO",
      hero: "Site-ul tău ar trebui să lucreze ca cel mai bun angajat al tău — 24/7.",
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
          "3–6 secunde timp de încărcare",
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
  // React (createRoot) replaces this on first render, so users see the live app.
  // Static scrapers, AI crawlers, and no-JS environments read the actual content.
  const prerender = `
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
</main>`;

  // Read the base HTML file
  const htmlPath = join(process.cwd(), "dist", "index.html");
  let html = readFileSync(htmlPath, "utf-8");

  // Replace meta tags with language-specific content
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
      /<meta name="twitter:title" content="[^"]*"/g,
      `<meta name="twitter:title" content="${langContent.title}"`,
    )
    .replace(
      /<meta name="twitter:description" content="[^"]*"/g,
      `<meta name="twitter:description" content="${langContent.description}"`,
    )
    .replace(/<title>[^<]*<\/title>/g, `<title>${langContent.title}</title>`)
    .replace(/<html lang="[^"]*"/g, `<html lang="${lang}"`)
    // Inject pre-rendered content into the root div for crawlers
    .replace('<div id="root"></div>', `<div id="root">${prerender}</div>`);

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  // no-cache: browser must revalidate HTML on every navigation.
  // This prevents stale HTML (with old hashed asset filenames) from being
  // served after a new deployment — which would cause a blank screen.
  // JS/CSS assets remain immutably cached because they use content-hashed filenames.
  res.setHeader("Cache-Control", "no-cache, must-revalidate");
  res.status(200).send(html);
}

