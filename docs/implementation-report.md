# Implementation report — 7 October 2026

## Repository audit

The repository is a static site with nine public HTML pages, shared `css/styles.css`, shared `js/main.js`, locally hosted Geist fonts, product screenshots, favicons, a manifest, robots and sitemap files. `alcaisse-demo.html` contains its own in-memory checkout simulation. The other product applications are external subdomains; their implementation and authentication are outside this repository.

The existing palette, typography, logos, product frames and screenshots were preserved. The previous copy led with agency React delivery support. StorePilot and Alcaisse received disproportionate emphasis, while StayOps appeared late in the work page. Repeated “proof system” language obscured the workflow context. The contact form used a native `mailto:` POST without explicit message formatting. Mobile navigation lacked expanded-state semantics and Escape handling. Reveal content could remain invisible without JavaScript, muted text had weak contrast, screenshot dimensions were unspecified, and PNG screenshots totalled approximately 7.6 MB.

Unused legacy metric-panel CSS and the unlinked square social asset remain as source material; they are not loaded by the public pages. The ignored `.vercel` directory is deployment-local configuration, while `files/` and `lyan-brand-kit/` are excluded from deployment. No working demo code was removed.

All routes and navigation were inventoried. There is no backend, analytics script, cookie implementation or application storage in the main website source. The deployed host was confirmed as Vercel through HTTP response headers. The `www` domain is the production destination of the apex redirect and was already used by every canonical and sitemap entry.

## Changes

- `index.html`: problem-led hero, concise workflow problems, three featured systems, separate labs, three service types, secondary stack context and a workflow contact CTA.
- `work.html`: StayOps, StorePilot and Kepler Express in that order, with context, system approach, modules, existing documented stack, status, screenshots and product links. Alcaisse, MyBi and OpsCore are smaller additional-work entries.
- `services.html`: Operational Tool Sprint, Dashboard & Workflow Build and Existing Product Extension. Agency support is secondary. A clear scope/build/handover process remains visible.
- `about.html`: founder-led studio, Anis Allouache, Paris / Remote and concise implementation principles. No seniority, customer, adoption or revenue claims were added.
- `contact.html`, `js/main.js`: workflow-oriented fields, validation, encoded email draft, explicit review/send instructions, copy fallback and visible direct email. No external processor or database.
- `alcaisse.html`, `alcaisse-demo.html`: accurate product-exploration and in-memory demo descriptions, live feedback and selected-view accessibility. Checkout, cart changes, product filtering, stock and reporting remain functional. No payments are processed.
- All nine HTML pages: shared positioning, semantic navigation, skip links, accessible menu controls, consistent internal routes, safe new-tab attributes, metadata and descriptive image alternatives. The five main pages have new unique SEO copy. Existing legal/privacy metadata remains appropriate.
- `privacy.html`: explains mail-client handling, absence of analytics in source, hosting request information and separate external applications. Existing retention and rights language was retained.
- `legal.html`: shared chrome only; existing business identity, registration identifiers and address preserved. There were **no legal placeholders in this checkout**, despite the request's earlier public-site observation. No legal values were invented.
- `css/styles.css`: preserved visual identity with improved text contrast, focus visibility, responsive hierarchy, smaller spacing, uncropped screenshots, minimum interaction sizes and no-JavaScript navigation/content. Reduced-motion preferences remain respected.
- `assets/work/*.webp`: six optimized derivatives of existing PNG screenshots, approximately 450 KB total, over 94% smaller. Original PNGs remain intact as source assets. Rendered images have intrinsic dimensions and lazy loading.
- `assets/og-image.svg`, `assets/og-image.png`: updated code-based social preview using the existing palette and studio positioning.
- `vercel.json`: explicitly preserves `.html` routing through `cleanUrls: false`, `trailingSlash: false`; existing `/index.html` redirect retained.
- `tools/validate-static-site.mjs`: updates positioning assertions and adds checks for unique titles, correct canonicals, required social metadata, a single H1, alt attributes, safe external links and internal fragments.
- `README.md`: documents local serving, build, contact behavior and existing Vercel deployment.

Existing robots, sitemap, favicon and manifest were checked and retained. All nine canonical routes already appeared in the sitemap. Organization structured data was added to the homepage using only known studio/founder/contact details. Local fonts remain self-hosted; no production dependencies were introduced.

## Validation

- `npm run build`: nine pages and 212 local asset/link references pass.
- JavaScript syntax checks and `git diff --check` pass.
- Chrome / Playwright: all nine public pages at 360, 390, 768, 1024 and 1440 px — 45 layouts; HTTP 200, no horizontal overflow or broken images.
- All 27 unique local linked URLs, including page, fragment and head asset URLs, return HTTP 200 on the local server. Fragment existence is checked by the build.
- axe accessibility checks: all nine pages at 390 and 1440 px, zero automated WCAG A/AA violations. This is a basic pass, not a comprehensive accessibility certification.
- Mobile menu open/close and Escape focus return pass on every page with site navigation. No-JavaScript navigation and visible content pass. Reduced-motion visible-content check passes.
- Contact required-field validation, email URL encoding (including ampersands/newlines), draft instructions and clipboard fallback pass. Preparing the message was verified; sending through a user's configured email account is outside the website.
- Alcaisse product selection, cart total, simulated checkout, reports/stock/products navigation and category filtering pass.
- No browser JavaScript or console errors during checks.
- Production network checks: all nine public routes, StorePilot, StayOps, Kepler, MyBi and OpsCore return HTTP 200; apex redirects to `www`; Vercel link returns HTTP 200. These verify endpoint availability, not application authentication or every internal product workflow.
- The reported intermittent `contact.html` 404 was not reproduced. The file exists and direct HTTP access succeeds. Explicit routing configuration reduces ambiguity; recheck the deployed release after publication. No unsupported claim of a confirmed historical cause is made.

## Owner review and deployment

Confirm the existing legal details (legal form, SIREN/SIRET, registered address, publication director and host contact address), the retained three-year enquiry retention policy and the product statuses/stacks before publication. No missing legal values were detected in this repository. StayOps is conservatively labelled “Product in development”; Kepler is “Portfolio application”; StorePilot has one clear sample-data status per presentation.

Deploy the reviewed static changes through the existing Vercel project, then repeat production route checks. No deployment, product application change or subdomain alteration was performed.
