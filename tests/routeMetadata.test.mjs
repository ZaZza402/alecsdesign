import test from "node:test";
import assert from "node:assert/strict";

// Canonical path computation logic (mirrors api/index.ts behaviour)
function toCanonicalPath(urlPath) {
  if (urlPath === "/en") return "/";
  if (urlPath.startsWith("/en/")) return urlPath.slice(3);
  return urlPath;
}

// Hreflang base path (mirrors api/index.ts behaviour)
function toHreflangBase(urlPath) {
  if (["/en", "/it", "/ro"].includes(urlPath)) return "/";
  return urlPath.replace(/^\/(en|it|ro)\//, "/").replace(/^\/(en|it|ro)$/, "/");
}

test("/en/privacy-policy canonical strips /en prefix", () => {
  assert.equal(toCanonicalPath("/en/privacy-policy"), "/privacy-policy");
});

test("/en canonical maps to root", () => {
  assert.equal(toCanonicalPath("/en"), "/");
});

test("/it/faq canonical is unchanged", () => {
  assert.equal(toCanonicalPath("/it/faq"), "/it/faq");
});

test("/help canonical is unchanged", () => {
  assert.equal(toCanonicalPath("/help"), "/help");
});

test("/en/help/request canonical strips /en prefix", () => {
  assert.equal(toCanonicalPath("/en/help/request"), "/help/request");
});

test("/faq canonical is unchanged", () => {
  assert.equal(toCanonicalPath("/faq"), "/faq");
});

test("/designs canonical is unchanged", () => {
  assert.equal(toCanonicalPath("/designs"), "/designs");
});

test("/en/designs canonical strips /en prefix", () => {
  assert.equal(toCanonicalPath("/en/designs"), "/designs");
});

test("/it/designs canonical is unchanged", () => {
  assert.equal(toCanonicalPath("/it/designs"), "/it/designs");
});

test("hreflang base for /it is /", () => {
  assert.equal(toHreflangBase("/it"), "/");
});

test("hreflang base for /it/faq is /faq", () => {
  assert.equal(toHreflangBase("/it/faq"), "/faq");
});

test("hreflang base for /faq (no prefix) is /faq", () => {
  assert.equal(toHreflangBase("/faq"), "/faq");
});

test("hreflang base for /help/request is unchanged", () => {
  assert.equal(toHreflangBase("/help/request"), "/help/request");
});

test("hreflang base for /it/designs/item is /designs/item", () => {
  assert.equal(
    toHreflangBase("/it/designs/isometric-heavy-machinery-icons"),
    "/designs/isometric-heavy-machinery-icons",
  );
});

test("hreflang base for /designs/item is unchanged", () => {
  assert.equal(
    toHreflangBase("/designs/isometric-heavy-machinery-icons"),
    "/designs/isometric-heavy-machinery-icons",
  );
});
