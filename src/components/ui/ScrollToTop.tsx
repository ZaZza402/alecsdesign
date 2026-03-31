import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const LANGS = ["en", "it", "ro"];

/** Strip /en, /it, /ro prefix so we only scroll on real page changes */
function stripLang(path: string): string {
  const parts = path.split("/").filter(Boolean);
  if (parts.length > 0 && LANGS.includes(parts[0])) parts.shift();
  return "/" + parts.join("/");
}

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const prevNormalized = useRef(stripLang(pathname));

  useEffect(() => {
    const normalized = stripLang(pathname);
    if (normalized !== prevNormalized.current) {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
    prevNormalized.current = normalized;
  }, [pathname]);

  return null;
}
