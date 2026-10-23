# Portfolio product audit — 23 October 2026

**Audience:** hiring managers, technical reviewers and potential internal-tool clients.  
**Scope:** all 11 GitHub repositories accessible through the account, product README files, accessible repository structure, public demo endpoints and Vercel deployment metadata.  
**Method:** architecture/documentation review and HTTP reachability checks. **Not** a production penetration test, browser E2E audit, user research study or verification of customer adoption.

## Executive assessment

The current body of work shows significant *breadth*, but hiring evidence is fragmented. The portfolio contains working business workflows, yet the most interesting source repositories are private. The public GitHub profile historically promoted concepts with broad product language rather than quickly answering: what exists, what can be tried, what decisions were made, what was tested and what remains unsafe/unvalidated.

**Do not add another standalone app until current evidence quality improves.**

### Classification

| Repository | Visibility | Audit status | Portfolio decision |
|---|---|---|---|
| `Granis75` | public | Profile README did not foreground verifiable evidence | Updated with direct demonstrations, limitations and truthful status |
| `lyanstudio.com` | public | Public portfolio and IT Ops Desk | Primary showcase; keep |
| `mybi-business-app` | private | Described as personal tool in use; full production status not independently established | Core story; keep private; add sanitized walkthrough, data model and verifiable evidence |
| `stayops-core` | private | Demo workspace and planning publicly reachable; README documents relational business rules, permissions and tests | Strong primary engineering case; keep private, publish sanitized architecture |
| `alcaisse` | private | Electron/SQLite offline POS with documented transactional stock and backup; physical tests and compliance pending | Strong technical range; do not present web mockup as desktop validation |
| `Kepler-Express` | public | Multi-module React/TypeScript application, live frontend reachable; README asserted impact without sourced metrics | Secondary proof; remove unverified impact claims, document demo limitations |
| `anisconsult.com` | public | Operations portfolio distinct from software studio; bilingual FR/EN architecture | Keep distinct; avoid duplicated/conflicting case-study claims |
| `OpsCoreV` | public | Marked retired, repository still not GitHub-archived | Remove from active selections; archive with GitHub repository settings when permitted |
| `lyansday` | public | Marked retired (Lyan & Co.), repository still not GitHub-archived | Do not promote; archive with GitHub repository settings when permitted |
| `storepilot` | private | Marked retired, not GitHub-archived | Keep as historical, archive when permitted; do not publish |
| `vesper-case-study` | private | Marked retired, claims about impact in README need original evidence | Historical only; do not quote its unverified metrics |

**GitHub archiving was not executed**: the available GitHub connection supports file editing but no repository-admin archive operation. Do not confuse a README status statement with actual GitHub archival.

## Product-by-product evidence standards

### MyBi — core user-value story

What it demonstrates: own-business workflow spanning clients, missions, invoices and payment status. Its strongest differentiator is **firsthand day-to-day use**, not theoretical SaaS scale.

Before showing to a hiring manager:
1. Capture a screen walkthrough with entirely fictional or anonymized records.
2. Show one complete client → mission → invoice → payment journey with screenshots.
3. Explicitly mark which stages persist to a backend and which are still unfinished.
4. Add a scope and limitations section, schema diagram and reproducible test summary.
5. Verify the public demo endpoint and access flow; it could not be confirmed through the connected Vercel scope during this audit.

Do not show real customer identities, invoices or private commercial data.

### StayOps — strongest workflow reasoning

Public endpoints reachable at audit time:
- https://stayops.lyanstudio.com/demo/workspace
- https://stayops.lyanstudio.com/demo/planning

What it demonstrates (documented in its README): guest reservation lifecycle, double-booking prevention, housekeeping task generation, role checks and property membership. Stronger than a dashboard of mock KPI figures.

Minimum case-study evidence:
- State-transition diagram: reservation → check-in → check-out → room dirty → cleaning → inspection → room ready.
- Explain whether overlap prevention is enforced *at the database level* or only in server actions, including race-condition implications.
- Demonstrate access controls for owner/manager/staff and verify database RLS implementation separately.
- Provide sanitized migration/schema excerpts, test output and documented limitations.

**Risk to verify:** README mentions server-action overlap prevention and RLS allowing member-level updates for some paths; proper defense in depth and concurrency guarantees must be checked before production claims.

### AlCaisse — strongest non-web technical demonstration

Documented constraints: offline SQLite persistence; local sales and stock as transactions; cash sessions; ESC/POS receipt pathways; packaging for Windows; backup restore workflow.

A browser screenshot does **not** prove Windows packaging, printer or cash drawer support. Evidence package should show:
- Short screen recording from the actual Windows executable with a fictitious sale.
- Connectivity removed during checkout, purchase saved, stock decremented and backup restored.
- Test results for cancellation and stock consistency.
- Separate physical hardware evidence when tested; until then hardware status is pending.
- No statement of fiscal certification unless obtained.

**Security:** development PINs in README are convenience defaults. Ensure deployment disables/requires resetting these values, and do not expose any real private store data.

### IT Ops Desk — accessible code, limited current scope

Four public routes, local-only persistence, incident/asset CRUD, search and filters, CSV/JSON handling and automated core/routing tests. It is a **product demonstrator**, not a production-grade IT service management platform.

Gaps:
- no hosted database, shared organization state, real identity or role-based access
- operator selector labels logs but does not authorize activity
- history is editable browser data, not an audit-proof ledger
- only limited automated tests; no cross-browser E2E, accessibility or load testing

Before claiming ITSM experience, implement meaningful domain rules: SLA clocks, ticket lifecycle transitions, immutable server-side incident events, assignment, asset-user relationships, server-side authorization, notification lifecycle, deterministic seeded demo tenant and E2E tests. If not built, label as proposals.

### Kepler Express — secondary, conditional

The public frontend is reachable. The repository is a substantial React/TypeScript codebase with Supabase integration, but its README previously contained unsupported “Impact” metrics and lacked an explicit distinction between modelled workflows and adopted use. Its README should state the **technical behavior** and no unverified client outcomes. Production readiness and demo access require additional verification.

## GitHub hygiene

1. Pin no more than 4–6 meaningful public repositories: `lyanstudio.com`, `Kepler-Express`, `anisconsult.com`, plus any independently reviewed public proof repositories; a **private project cannot be pinned for public readers**.
2. Set repository descriptions, topics and homepage links through GitHub settings (where available). No connector API for these metadata mutations was available in this run.
3. Archive `OpsCoreV` and `lyansday`; optionally archive private `storepilot` and `vesper-case-study`. Archive status requires a repository administration action, not merely editing README.
4. Replace broad marketing language with the same sections in every active README: **problem, users, workflows, architecture, test instructions, screenshots/demo, security/privacy, limitations, current status**.
5. Do not expose private repos wholesale solely for recruitment. Publish sanitized technical narratives and source extracts with correct licensing and no keys.
6. Add CI checks to the public IT Ops Desk/site to catch broken routes and tests before merge; preserve the currently working static-site build.
7. Keep separate responsibilities: AnisConsult = operations career/activity; Lyan Studio = software; GitHub = implementation and evidence. They can cross-link without duplicating claims.

## Credibility rubric

Score each item from 0–3 for:
- Problem and user clarity
- Observable workflow
- Reproducibility of claims
- Technical documentation
- Test evidence
- Honest limitations
- Privacy and security posture

A project should not be described as production-ready unless engineering and field evidence support it. The current audit is a **prioritization report**, not a certification or numerical ranking based on code coverage.

## Next work in priority order

**P0 — Honest public proof**
- Profile README: completed.
- Kepler README: replace unverified outcomes with technical facts.
- Keep dead projects off the active portfolio.
- Verify each public demo link and indicate whether it requires credentials.

**P1 — Evidence packages**
- StayOps: architecture diagram, workflow test video, seeded demo screenshot, schema/roles narrative.
- MyBi: sanitized real-use case and recorded walkthrough.
- AlCaisse: Windows offline demo and explicit hardware-validation status.
- IT Ops Desk: add a walkthrough of CRUD and its automated tests.

**P2 — Product engineering**
- Make one application robust, rather than rapidly building many shallow demos.
- Add integration and E2E testing before strong production claims.
- Only after P1/P2, decide whether a new project brings genuinely new evidence.

## Interpretation for recruitment

The portfolio can support credible conversations about **operational software, internal tools, product workflows and technical problem-solving**. It does **not** on its own prove paid digital-sector employment since 2019, client revenue, production scale, cybersecurity certifications or professional IT helpdesk tenure. Keep qualification claims separate from project evidence.

**Audit limitations:** no inspection of the complete private source trees, live user analytics, code coverage reports, actual Windows hardware, organizational security policies or true external users; conclusions on those topics remain provisional.
