# Lyan Studio — Operational Software Studio

Static HTML/CSS/JavaScript site. No runtime framework, backend, database, analytics script or production dependency is required.

**Current project register:** [Four-project map, documentation links and verification boundaries](docs/PROJECT_REGISTRY.md). This register supersedes older audit snapshots for portfolio selection; application repositories remain authoritative for their own source code.

## Free-first direction (product policy, not a blanket availability claim)

Lyan Studio's aim is to create practical tools for independent workers and small organizations and to make essential workflows accessible without an artificial trial timer. The preferred long-term model is **genuinely useful free access**, optionally supported by voluntary contributions, and paid setup/support or advanced services only if there is real demand and a sustainable cost structure.

**Current reality is product-specific**:
- **MyBi** — actual hosted application at https://mybi.lyanstudio.com/. The developer confirms visitors can sign up for free; signup and access permissions have not been independently exercised in this review.
- **AlCaisse** — public browser checkout **simulation** at https://www.lyanstudio.com/alcaisse-demo.html; it is not a downloadable free production Windows POS and must not be used for real transactions.
- **Kepler Express** — publicly accessible frontend at https://kepler.lyanstudio.com/; free accounts, data persistence, tenant isolation and end-to-end authenticated use are **not yet validated**.
- **StayOps** — existing read-only demonstration at https://stayops.lyanstudio.com/demo/workspace; an operations-first publicly usable free workspace has **not yet been validated**.

Opening private source code, declaring all products free for production, offering public accounts, introducing payments/donations, or promising internationally compliant invoicing or retail fiscalization all require their own checks and decisions. Do not publish client code or data. No contribution/payment service has been integrated by this policy statement.

## The four selected projects

| Project | Domain | Evidence/status |
|---|---|---|
| **Kepler Express** | Logistics coordination: client → mission → expense → invoice → payment | Public source and frontend; production adoption not verified |
| **AlCaisse** | Local Windows POS for neighborhood retail | Client work per developer, real x86 executable supplied, developer reports Windows installation; Electron/SQLite source private |
| **MyBi** | Microentrepreneur business activity and invoicing | Personally used by developer; [real web application](https://mybi.lyanstudio.com/); source private; authenticated workflows not independently verified |
| **StayOps** | Hotel operations team coordination: daily queue, housekeeping, maintenance, handovers, supplies/linen | Operations-first implementation merged in PR #6; older read-only demo remains reservation/PMS-oriented |

This is the **entire public project selection**. Earlier experiments (including IT Ops Desk and deprecated projects) are retained in repository history or at direct legacy URLs but are not promoted as a fifth project. Legacy IT Ops Desk HTML routes are marked noindex and omitted from the sitemap, without deleting source or breaking old direct URLs.

## Evidence boundaries

- The AlCaisse browser simulation under `/alcaisse-demo.html` is *not* the Electron Windows application; it is supplementary and never a transaction system.
- The StayOps public demo is a read-only, reservation-heavy view of the same project's history. The operations-first source now includes shifts, inventory and team coordination, which are not fully proven through that demo.
- Private repositories remain private. No production security audit, paid-user count, adoption rate or ROI is claimed.

## Public evidence case studies

- [StayOps — workflow, room-readiness domain model and security boundaries](stayops-evidence.html)
- [AlCaisse — Electron/SQLite transactions, hardware and local backup boundaries](alcaisse-evidence.html)

These describe private source carefully; only public read-only/product screens are linked. No claimed hardware-validation footage, live authorization coverage or test results are fabricated.

## AlCaisse browser-only demonstration

[Launch AlCaisse Web Lab](https://www.lyanstudio.com/alcaisse-demo.html) — **six functional routes** (checkout, products, inventory, sales, reports, cash sessions) with realistic sample records, a pure business logic layer and browser-local state. **Currency: DZD; cash settlement only**, matching the desktop app's principal cashier flow.

The web lab is a **separately implemented simulator** that uses fictional products and browser `localStorage` only. It does **not** connect to AlCaisse's private Electron/SQLite database, local hardware, actual payment provider, Auth/PIN system or secure audit service. The tester can sell a sample item, record and cancel an entry, change simulated stock, open and close simulated sessions and export local test data. It must never be used for real retail transactions.

- Domain logic: [`alcaisse/core.mjs`](alcaisse/core.mjs)
- Automated tests: `node --test alcaisse/core.test.mjs`
- Client interactions: [`alcaisse/app.mjs`](alcaisse/app.mjs)
- Creator-reported client work: AlCaisse was developed for a client, whose identity is intentionally not disclosed. The developer confirms it was installed and tested locally on Windows. An independently signed customer-acceptance report is not available.
- Supplied binary inspected: AlCaisse 0.1.0, Windows x86/ia32, NSIS self-extracting portable package (69,625,952 bytes). The uploaded proprietary executable has **not** been committed or offered for public download. See the private `alcaisse/docs/CLIENT_BINARY_EVIDENCE_2026-10.md` for a checksum and detailed inspection.

## Evidence-first product review

See [portfolio product audit (October 2026)](docs/product-portfolio-audit-2026-10.md) for repository-by-repository positioning, limitations, audit scope and priority evidence work. The GitHub profile README and Kepler README were updated to make unverified claims explicit.

## Legacy sandbox — not a portfolio project

IT Ops Desk remains accessible only by its historical direct URL and its source stays in this repository. It is not a selected product, is noindexed and is excluded from the public sitemap. Existing tests are retained to avoid breaking the build.

## Local development

Run `python3 -m http.server 4173 --bind 127.0.0.1` from this directory and open `http://127.0.0.1:4173/`.

Run `npm run build` to validate the site's HTML pages, local assets, link fragments, metadata, sitemap coverage and deployment configuration. The build validates the existing static files; it does not generate a separate output folder.

## Main routes

`/`, `/work.html`, `/services.html`, `/about.html`, `/contact.html`, `/legal.html`, `/privacy.html`, `/alcaisse.html`, `/alcaisse-evidence.html`, `/stayops-evidence.html` and the supplementary `/alcaisse-demo.html`.

All internal navigation uses these explicit routes. `/index.html` redirects to `/` on Vercel. Production canonical domain: `https://www.lyanstudio.com/`; the apex domain redirects there. Keep the existing domain configuration on Vercel.

## Contact

The form prepares a URL-encoded `mailto:` message in the visitor's email app. It does not send an email itself. The visitor reviews and sends the message. The direct email address and copy-request action provide alternatives. Without JavaScript the existing native mail-client form remains available. No form processor or storage was added.

## Deployment

Existing Vercel configuration runs `npm run build` and serves the repository root. `cleanUrls: false` and `trailingSlash: false` preserve `.html` routes. Deploy through the existing Vercel project after reviewing the changes. No project applications or subdomain configuration are changed.

Before publishing, confirm the legal identity and hosting contact information already present in `legal.html`, the privacy retention policy, and current product status/stack descriptions. See [implementation report](docs/implementation-report.md) for the audit and verification evidence.
