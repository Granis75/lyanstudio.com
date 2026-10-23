# IT Ops Desk — Case study

**Status:** interactive browser-local proof of concept · **Date:** October 2026 · **Audience:** hiring reviewers and prospective internal-tool clients.

## Problem
Small teams often track devices, interruptions and their resolution in separate messages and spreadsheets, without a shared incident-to-asset reference. The prototype explores a single workflow for those records.

## Design goals
1. Keep incident priority, status and ownership legible.
2. Connect incidents to equipment and prevent accidental deletion of referenced devices.
3. Make the activity record observable and allow portable backup.
4. Work as an honest, accessible demo without setting up accounts.

## Product workflow
Inventory item → related incident → priority & owner → progress state → resolution → activity history.

## Delivered features
CRUD, referential guards, deterministic validation, search, filters, KPI aggregates, responsive UI, local persistence, safe CSV and JSON backup, unit tests.

## Technical approach
Zero dependencies: ES modules, semantic HTML, CSS and localStorage. A pure model isolates validation and mutations from the DOM, making the central record lifecycle testable.

## Evidence and limitations
This is a standalone demonstration containing fictional people, assets and tickets. UI role selection is not a permission system. No real deployments, user validation or performance metrics are claimed. A future production version would need a securely configured server, real authentication, Postgres, tenant-aware authorization and incident notifications.
