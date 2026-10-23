# IT Ops Desk — browser-local product demonstrator

An interactive IT service desk prototype built within Lyan Studio. This is a **fictional dataset and single-browser demonstrator**, not an authenticated multi-user SaaS or production ITSM product.

## Try it
Open \`https://www.lyanstudio.com/itopsdesk/\`. No sign-in or backend required.

## Implemented
- Incident creation, editing, deletion, status and priority management
- Equipment inventory with lifecycle statuses and unique serial validation
- Relationship between tickets and assets, safe deletion guard for referenced assets
- Search by any record attribute, status filtering, KPI dashboard and ticket distribution
- Append-only *within the app workflow* action history (not a tamper-proof audit ledger)
- Local browser persistence, JSON import/export, CSV export with spreadsheet formula neutralization
- HTML escaping for user-controlled values
- Responsive, keyboard-operable controls and accessible dialog
- Pure state model test suite via \`node --test itopsdesk/core.test.mjs\`

## Architecture
\`index.html\` + \`styles.css\` for UI. \`core.mjs\` for validated state transitions. \`app.mjs\` for browser interactions. Browser \`localStorage\` only; storage is tied to the current browser/profile and can be cleared.

## Scope and limitations
- Operator menu **only labels demo actions**. It is not authentication or RBAC.
- No database server, identity provider, SLA engine, email notifications or integrations.
- Demo data is fictional. No client adoption or measured operational impact is claimed.
- Do not enter sensitive credentials, real user personal data or customer incidents.
- This demonstration cannot be used as a secure production ticketing system.
- A production build would require hosted persistence, authenticated identities, RBAC validated server-side, tenancy isolation, audit retention and automated end-to-end tests.
