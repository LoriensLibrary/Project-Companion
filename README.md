# Project Companion

**A design prototype for a persistent-memory AI learning companion in K–12 education.**

> **Status: design prototype.** This repository contains four React/JSX UI files demonstrating the *design pattern* for a three-sided learning companion (student, teacher, parent) informed by a shared persistent memory. It is **not** a deployed platform. CAMA integration, backend, accounts, COPPA consent flow, content moderation, and persistence are roadmap items — see the [Roadmap](#roadmap) for what is and isn't built. Do not deploy to minors as-is; the components currently call the Anthropic API directly from the browser.

This prototype demonstrates the applied design of [CAMA](https://github.com/LoriensLibrary/cama) (Circular Associative Memory Architecture) in an education context. CAMA is the persistent-memory research system behind [11 Zenodo preprints](https://orcid.org/0009-0005-5803-8401) by the same author; **this repository does not yet integrate with CAMA at runtime** — wiring the prototype to a live CAMA MCP server is the next step.

---

## The Problem the Design Addresses

Current AI tutoring tools forget the student every time the session ends. A child who struggled with fractions yesterday starts over today. The teacher has no visibility into what happened. The parent has no idea how to help at home.

Project Companion is a design study of what an AI tutor *informed by persistent, provenance-aware memory* would look like across the three people who actually need to see it: the student, the teacher, and the parent.

---

## What Is Built (UI Prototype)

Four React/JSX files demonstrating the three sides of the design. State is in-memory and resets on refresh; there is no persistence layer in this repository.

### 🎓 Student Hub (`StudentHub.jsx`)
- AI tutoring UI with Socratic-prompt scaffolding (constraint enforced via system prompt)
- Four themed animated worlds (Space, Ocean, Forest, Candy Land)
- Four companion characters
- Subject-based tutoring surfaces across Math, Science, Reading, Social Studies
- Educational mini-games: Quick Quiz, Math Flash, Word Scramble, Memory Match
- XP, streaks, badges, and progress UI (session-local)

### 👩‍🏫 Teacher Dashboard (`TeacherDashboard.jsx`)
The teacher-side feature surface is designed but populated by hardcoded sample data:
- **Daily Brief**, **Student Profiles**, **Class Heat Map**, **Question Bank**, **Documentation**, **Family Communication drafts**, **Teacher Notes**, **Insights**, **AI Teaching Copilot**
- These surfaces are UI demonstrations of how teacher-side intelligence would surface *if* the system were wired to a persistent-memory backend.

### 👪 Parent Dashboard (`ParentDashboard.jsx`)
- Overview, activity log, and "Help at Home" surfaces with sample data.

`ProjectCompanion.jsx` is an earlier draft of the student experience preserved for reference; `StudentHub.jsx` is the current cut.

---

## How It Connects to the Research

This is an *applied design study* of a published research architecture, not yet a deployed instance of it.

| Research Foundation | Role in This Prototype |
|---|---|
| [CAMA Core Series](https://doi.org/10.5281/zenodo.19051834) (Papers 1–5) | Source of the three-layer memory architecture, provenance-aware write discipline, and counterweight safety patterns the prototype's UI is designed *around* — but does not yet call. |
| [Applied Series](https://doi.org/10.5281/zenodo.19257809) (Papers 6–9) | Demonstrates that CAMA's framing has been extended to other applied domains; this prototype is the education-domain study. |
| [Identity-Aware Harm Detection](https://doi.org/10.5281/zenodo.19425218) | The three-layer Librarian System is the safety pattern the eventual integrated system would use for child-specific harm detection. Not implemented in this repository. |
| [Platform Regression Study](https://doi.org/10.5281/zenodo.19582820) | Establishes that relational continuity is a measurable, neglected dimension — motivating why persistence matters in education. |

---

## Pilot Intent

**Target**: A K–12 virtual school for a no-cost research pilot.
**Status**: Pre-pilot. The infrastructure listed below as roadmap items must ship before any deployment to minors. The August 2026 target is aspirational and gated on completion of the COPPA consent flow, backend proxy, persistence layer, and CAMA integration; if that work is not complete, the pilot date moves.
**Research goal (if executed)**: Longitudinal study of persistent-memory AI companions in a real K–12 environment with provenance-aware memory and the safety infrastructure described in the published Librarian System paper.

---

## Tech (Current vs. Designed)

| Layer | Currently in This Repo | Designed Target |
|---|---|---|
| Frontend | React / JSX, four single-file components | Same, plus shared component extraction and build config |
| AI calls | **Client-side `fetch()` to Anthropic API** — not deployable to minors as-is | Backend proxy with key isolation, per-user rate limiting, audit logging |
| Memory | In-component React state, lost on refresh | CAMA (SQLite + MCP server) with provenance-aware writes |
| Auth | None | Per-student accounts, parent linkage, role-scoped sessions |
| Build | None (no `package.json`, no Vite/Next config) | Vite + TypeScript + tested components |
| Safety | System-prompt constraints only | Content moderation, age verification, mandatory-reporting plumbing, right-to-delete, COPPA consent |

---

## Repository Structure

```
Project-Companion/
├── StudentHub.jsx          # Current student-facing UI (1,089 lines)
├── TeacherDashboard.jsx    # Teacher copilot UI surfaces
├── ParentDashboard.jsx     # Parent-side surfaces
├── ProjectCompanion.jsx    # Earlier draft of the student experience (kept for reference)
├── LICENSE
└── README.md
```

No `package.json` or build config is included. To run these components, scaffold a React project (e.g. `npm create vite@latest`) and drop them into `src/`. An Anthropic API key in scope is required for the AI surfaces; **do not ship a build with a client-side key to any real users**.

---

## Roadmap

### Built (UI surfaces only)
- [x] Student companion UI with Socratic-prompt tutoring surface
- [x] Four themed animated worlds
- [x] Educational mini-games (Quiz, Math, Scramble, Memory)
- [x] Teacher dashboard with 9 feature tabs (sample data)
- [x] Parent dashboard surfaces (sample data)
- [x] Teacher question-injection design pattern (UI level)
- [x] AI-drafted family communication surface (UI level)

### Not yet built (required for any deployment)
- [ ] Backend API proxy — remove client-side Anthropic calls
- [ ] User accounts and session persistence
- [ ] Data pipeline connecting student sessions → teacher dashboard → parent view
- [ ] **CAMA integration** — persistent cross-session memory with provenance
- [ ] COPPA-compliant parental consent flow
- [ ] Content moderation and PII scrub on student input
- [ ] Age verification
- [ ] Mandatory-reporting protocol implementation
- [ ] Right-to-delete plumbing across surfaces
- [ ] Accessibility audit (WCAG, reduced-motion, dyslexia-friendly typography)
- [ ] Teacher admin interface for question-bank management
- [ ] Multi-student parent view
- [ ] Build config, tests, CI
- [ ] Pilot deployment

---

## Safety & Privacy — Design Target vs. Current State

Project Companion is designed for children. **Safety claims below describe the design target, not the current repository.** A deployed system must implement each item below before being used with any minor.

| Property | Design Target | This Repository |
|---|---|---|
| Parental consent | COPPA-compliant flow required before any minor uses the system | Not implemented |
| Data collection consent | No conversation storage without explicit opt-in | No storage layer exists |
| Mandatory reporting | Protocol for handling disclosures of harm | Not implemented |
| Provenance-aware memory | Distinguish student statements from AI inferences (CAMA's teaching/inference write discipline) | Not implemented in this repo (UI does not store) |
| Teacher control | Curriculum injection so the companion teaches what the teacher intends | UI pattern demonstrated only |
| Parent visibility | View-only access with clear privacy boundaries | UI pattern demonstrated only |
| Right to delete | Any stored data can be removed at parent or student request | No storage to delete |
| Content moderation | Filter on student input, self-harm detection path | Not implemented |
| Not a clinical tool | Educational support, not therapy or diagnosis | This framing applies to the design |

---

## Related Work

- **CAMA Repository**: [github.com/LoriensLibrary/cama](https://github.com/LoriensLibrary/cama)
- **Published Papers**: [Zenodo — ORCID 0009-0005-5803-8401](https://orcid.org/0009-0005-5803-8401)
- **Dataset**: [HuggingFace — Continuity Burden Dataset](https://huggingface.co/datasets/LoriensLibrary/cama-continuity-burden) (aggregate statistics; raw data not released)
- **Website**: [lorienslibrary.netlify.app](https://lorienslibrary.netlify.app)

---

## Author

**Angela Reinhold** — Independent AI safety researcher, founder of Lorien's Library LLC, computer science student (AI concentration) at Full Sail University.

ORCID: [0009-0005-5803-8401](https://orcid.org/0009-0005-5803-8401)

---

## License

MIT License

© 2026 Lorien's Library LLC
