# AlCaisse Web Lab — separately implemented demo

This code is a **browser-local interactive simulation** for portfolio review. It is not the private Windows/Electron AlCaisse codebase, not a production register and not a full parity port.

## Pages
- /alcaisse-demo.html — Checkout
- /alcaisse/products.html — Fictional product catalogue and creation
- /alcaisse/stock.html — Inventory adjustments and movements
- /alcaisse/sales.html — Sale history, cancellation and demo receipts
- /alcaisse/reports.html — Reports generated from local test records
- /alcaisse/sessions.html — Cash session opening and closing

## Demonstrated invariants
- A session must be open to add a product or validate a sale.
- All displayed monetary values are **integer DZD** (Algerian dinars) and cash-only, matching the intended desktop workflow.
- Stock cannot go below zero.
- A simulated sale decreases linked product stock; cancellation re-adds units and is not repeatable.
- Sales record the receipt amount and change, without contacting payment networks.
- Reports exclude cancelled transactions.
- Browser-only state persists in `localStorage` for the current browser and can be exported/imported as fictional JSON.

### How to validate

```bash
node --test alcaisse/core.test.mjs
node --check alcaisse/app.mjs
node tools/validate-static-site.mjs
```

## Technology boundary
`core.mjs` contains independent pure state transitions; `app.mjs` renders the HTML/DOM and connects controls, forms, tables and downloads. No external packages or privileged browser APIs are required for site visitors.

**Important:** state is *not* a SQL transaction, server-backed storage or tamper-proof audit. Cashier identity is a fictional label, with no actual PIN verification, roles or permissions. The web demo does not test real ESC/POS devices, bank terminals, the private Windows SQLite schema or power failure recovery. Do not input real customer data, personally identifiable information or payments.

## Windows desktop application
The creator reports local installation and testing on an actual Windows machine. That is a valuable first-party account, but not an independently captured validation record. The Windows application and its detailed private source remain distinct from this public demo.

## Portfolio position
Use the [technical evidence case study](https://www.lyanstudio.com/alcaisse-evidence.html) to explain the **real Electron/SQLite architecture**, its CI tests, known security blockers and hardware-validation status. The web lab is supplementary UX/workflow evidence rather than proof of real desktop deployment.
