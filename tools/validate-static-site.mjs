import { readFileSync, existsSync, readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import assert from "node:assert/strict";

const pages = readdirSync(".").filter((file) => file.endsWith(".html"));
const requiredPages = [
  "index.html",
  "work.html",
  "services.html",
  "about.html",
  "contact.html",
  "alcaisse.html",
  "alcaisse-demo.html",
  "legal.html",
  "privacy.html",
];
for (const page of requiredPages)
  assert(pages.includes(page), `Missing page: ${page}`);
for (const file of ["css/styles.css", "js/main.js"])
  assert(existsSync(file), `Missing asset: ${file}`);
// Software vocabulary is allowed, including React, TypeScript, Supabase, PostgreSQL,
// Tailwind, Vercel, Dashboards, portals, internal tools, StorePilot, Alcaisse and Kepler.
// Only public pages and assets are scanned; never Git, backups or historical docs.
const forbidden =
  /photography|selected projects|behance|graphic design portfolio|event agency|gaming|esports|live events|combat sports|event operations|player & athlete services|guest & participant experience|on-site services/i;
const publicText = (content) =>
  content
    .replace(/<!--[^]*?-->/g, "")
    .replace(/&amp;|&#38;|&#x26;/gi, "&")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ");
let references = 0;
for (const file of [
  ...pages,
  "js/main.js",
  "assets/og-image.svg",
  "site.webmanifest",
]) {
  const content = readFileSync(file, "utf8");
  assert(
    !forbidden.test(publicText(content)),
    `Unwanted positioning in ${file}`,
  );
  if (!file.endsWith(".html")) continue;
  assert(content.includes('rel="canonical"'), `Missing canonical: ${file}`);
  assert.equal(
    [...content.matchAll(/<h1(?:\s[^>]*)?>/g)].length,
    1,
    `Expected one h1: ${file}`,
  );
  for (const marker of [
    'name="description"',
    'property="og:title"',
    'property="og:description"',
    'property="og:url"',
    'property="og:image"',
    'name="twitter:card"',
    'name="twitter:title"',
    'name="twitter:description"',
  ])
    assert(content.includes(marker), `Missing ${marker}: ${file}`);
  assert(content.includes('id="main-content"'), `Missing skip target: ${file}`);
  for (const [, tag] of content.matchAll(/(<a\s[^>]*target="_blank"[^>]*>)/g))
    assert(
      /rel="[^"]*noopener[^"]*"/.test(tag) &&
        /rel="[^"]*noreferrer[^"]*"/.test(tag),
      `Unsafe external link: ${file}`,
    );
  for (const [, tag] of content.matchAll(/(<img\s[^>]*>)/g))
    assert(/alt="[^"]*"/.test(tag), `Missing image alt: ${file}`);
  for (const [, ref] of content.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(?:https?:|mailto:|tel:|data:|#)/.test(ref)) continue;
    const path = ref.split(/[?#]/)[0];
    const target = path.startsWith("/")
      ? resolve("." + path)
      : resolve(dirname(file), path);
    assert(existsSync(target), `Missing reference in ${file}: ${ref}`);
    references++;
  }
}
const titles = pages.map(
  (p) => readFileSync(p, "utf8").match(/<title>([^]*?)<\/title>/)[1],
);
assert.equal(new Set(titles).size, pages.length, "Page titles must be unique");
for (const page of pages) {
  const content = readFileSync(page, "utf8");
  const canonical = page === "index.html" ? "" : page;
  assert(
    new RegExp(
      `rel="canonical"\\s+href="https://www\\.lyanstudio\\.com/${canonical.replaceAll(".", "\\.")}"`,
    ).test(content),
    `Incorrect canonical: ${page}`,
  );
  for (const [, ref] of content.matchAll(/href="([^"]*#[^"]+)"/g)) {
    if (/^(?:https?:|mailto:)/.test(ref)) continue;
    const [route, fragment] = ref.split("#");
    const target = route
      ? readFileSync(route.replace(/^\//, "") || "index.html", "utf8")
      : content;
    assert(
      target.includes(`id="${fragment}"`),
      `Missing anchor: ${page} -> ${ref}`,
    );
  }
}
const home = readFileSync("index.html", "utf8");
for (const term of [
  "Operational Software Studio",
  "StorePilot",
  "StayOps",
  "Alcaisse",
  "Kepler Express",
  "dashboards",
  "internal tools",
  "React",
  "TypeScript",
  "Supabase",
]) {
  assert(home.includes(term), `Missing software positioning: ${term}`);
}
const sitemap = readFileSync("sitemap.xml", "utf8");
for (const page of pages)
  assert(
    sitemap.includes(
      `https://www.lyanstudio.com/${page === "index.html" ? "" : page}</loc>`,
    ),
    `Missing sitemap entry: ${page}`,
  );
const config = JSON.parse(readFileSync("vercel.json", "utf8"));
for (const redirect of config.redirects ?? [])
  assert(
    !requiredPages
      .filter((p) => p !== "index.html")
      .some((p) => redirect.source === "/" + p),
    `Redirect hides restored page: ${redirect.source}`,
  );
for (const [, ref] of readFileSync("css/styles.css", "utf8").matchAll(
  /url\(\s*['"]?([^'"\s)]+)['"]?\s*\)/g,
)) {
  if (/^(?:https?:|data:|#)/.test(ref)) continue;
  const path = ref.split(/[?#]/)[0];
  assert(
    existsSync(
      path.startsWith("/") ? resolve("." + path) : resolve("css", path),
    ),
    `Missing CSS reference: ${ref}`,
  );
  references++;
}
assert.equal(
  JSON.parse(readFileSync("package.json", "utf8")).scripts.build,
  "node tools/validate-static-site.mjs",
);
assert.equal(config.buildCommand, "npm run build");
assert.equal(config.outputDirectory, ".");
assert.equal(config.cleanUrls, false, "Preserve explicit .html routes");
assert.equal(
  config.trailingSlash,
  false,
  "Preserve file routes without trailing slashes",
);
assert(
  !readFileSync(".vercelignore", "utf8")
    .split(/\r?\n/)
    .some((line) =>
      [
        "tools",
        "tools/",
        "tools/**",
        "tools/validate-static-site.mjs",
      ].includes(line.trim()),
    ),
  "Vercel excludes the build validator",
);
console.log(
  `Operational studio validation passed: ${pages.length} pages and ${references} local references checked.`,
);
