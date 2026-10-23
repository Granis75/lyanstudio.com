# Lyan Studio — Operational Software Studio

Static HTML/CSS/JavaScript site. No runtime framework, backend, database, analytics script or production dependency is required.

## Current portfolio (23 October 2026)

- **StayOps** — active hotel team operations software in development.
- **MyBi** — operational business management tool in use by its creator.
- **AlCaisse** — offline POS prototype, pending testing on physical hardware.
- **Kepler Express** — retained secondary logistics operations reference implementation.
- **IT Ops Desk** — interactive local-browser ITSM demonstrator (fictional records; no authentication or shared database).

StorePilot, OpsCore, Vesper and Lyan & Co are discontinued projects and are intentionally not promoted on this website. Their source histories remain in their separate repositories. Product descriptions do not imply customer adoption or production certification.

## Evidence-first product review

See [portfolio product audit (October 2026)](docs/product-portfolio-audit-2026-10.md) for repository-by-repository positioning, limitations, audit scope and priority evidence work. The GitHub profile README and Kepler README were updated to make unverified claims explicit.

## IT Ops Desk

Open `/itopsdesk/` on the site. Run `node --test itopsdesk/core.test.mjs` to test ticket/asset state transitions. See [IT Ops Desk technical notes](itopsdesk/README.md) and [case study](itopsdesk/CASE_STUDY.md). This is an honest portfolio demo, not a production ITSM deployment.

## Local development

Run `python3 -m http.server 4173 --bind 127.0.0.1` from this directory and open `http://127.0.0.1:4173/`.

Run `npm run build` to validate all nine pages, local assets, link fragments, metadata, sitemap coverage and deployment configuration. The build validates the existing static files; it does not generate a separate output folder.

## Routes

`/`, `/work.html`, `/services.html`, `/about.html`, `/contact.html`, `/legal.html`, `/privacy.html`, `/alcaisse.html`, `/alcaisse-demo.html`.

All internal navigation uses these explicit routes. `/index.html` redirects to `/` on Vercel. Production canonical domain: `https://www.lyanstudio.com/`; the apex domain redirects there. Keep the existing domain configuration on Vercel.

## Contact

The form prepares a URL-encoded `mailto:` message in the visitor's email app. It does not send an email itself. The visitor reviews and sends the message. The direct email address and copy-request action provide alternatives. Without JavaScript the existing native mail-client form remains available. No form processor or storage was added.

## Deployment

Existing Vercel configuration runs `npm run build` and serves the repository root. `cleanUrls: false` and `trailingSlash: false` preserve `.html` routes. Deploy through the existing Vercel project after reviewing the changes. No project applications or subdomain configuration are changed.

Before publishing, confirm the legal identity and hosting contact information already present in `legal.html`, the privacy retention policy, and current product status/stack descriptions. See [implementation report](docs/implementation-report.md) for the audit and verification evidence.
