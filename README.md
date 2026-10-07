# Lyan Studio — Operational Software Studio

Static HTML/CSS/JavaScript site. No runtime framework, backend, database, analytics script or production dependency is required.

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
