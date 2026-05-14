# Project Companion

**A persistent-memory AI learning companion for K–12 education.**

Built on [CAMA](https://github.com/LoriensLibrary/cama) (Circular Associative Memory Architecture) — the same persistent memory system behind [11 published research papers](https://orcid.org/0009-0005-5803-8401).

---

## The Problem

Current AI tutoring tools forget the student every time the session ends. A child who struggled with fractions yesterday starts over today. The teacher has no visibility into what happened. The parent has no idea how to help at home.

Project Companion doesn't forget.

---

## What It Is

A three-sided education platform where every side is informed by the same persistent memory:

### 🎓 Student Companion
- AI learning companion that remembers how each student learns, what they struggle with, and what clicks
- Socratic method — never gives direct answers, always guides
- Four themed animated worlds (Space, Ocean, Forest, Candy Land)
- Four chooseable companion characters
- Subject-based tutoring across Math, Science, Reading, and Social Studies
- Educational games with stage/level progression: Quick Quiz, Math Flash, Word Scramble, Memory Match
- XP, streaks, badges, and progress tracking
- Teacher-authored questions woven naturally into conversations — students never know it's a test

### 👩‍🏫 Teacher Copilot
- **Daily Brief**: Who needs attention today, what changed since yesterday, what interventions are working
- **Student Profiles**: Learning patterns, strengths, struggles, recommended next moves — all derived from companion sessions
- **Class Heat Map**: Visual overview of every student's status
- **Question Bank**: Inject curriculum questions into companion conversations by subject
- **Documentation**: Quick-log incidents, interventions, accommodations
- **Family Communication**: AI-drafted parent emails based on actual student data (always teacher-reviewed before sending)
- **Teacher Notes**: Quick observations that feed back into companion memory
- **Insights**: Class-wide patterns, intervention effectiveness tracking
- **AI Teaching Copilot**: Chat assistant that knows every student personally — prep check-ins, draft emails, plan lessons, create differentiated materials

### 👪 Parent Dashboard
- **Overview**: Sessions, streak, XP, level, teacher notes, weekly summary, strengths, and areas of growth
- **Activity Log**: What subjects and topics were covered, session duration, observed mood
- **Help at Home**: Specific, actionable suggestions based on what the companion actually observed — not generic advice

---

## How It Connects to the Research

This is not a startup idea. It is the applied deployment of a published safety architecture.

| Foundation | What It Provides |
|---|---|
| [CAMA Core Series](https://doi.org/10.5281/zenodo.19051834) (Papers 1–5) | Three-layer memory architecture, provenance-aware write discipline, blended retrieval, counterweight safety |
| [Applied Series](https://doi.org/10.5281/zenodo.19257809) (Papers 6–9) | Domain extensions to spaceflight, habitation, healthcare, emotional companionship |
| [Identity-Aware Harm Detection](https://doi.org/10.5281/zenodo.19425218) | Three-layer Librarian System for detecting individual-specific relational harm |
| [Platform Regression Study](https://doi.org/10.5281/zenodo.19582820) (Paper 11) | Empirical evidence that relational continuity is a measurable, neglected evaluation dimension |

The safety mechanisms are not afterthoughts. They are the foundation:

- **Provenance tracking**: The system knows what the student said vs. what the AI inferred
- **Socratic constraint**: The companion never gives direct answers
- **Teacher curriculum injection**: Teachers control what is taught
- **Consent-based access**: Parents opt in; view-only access with privacy boundaries
- **Right to delete**: Any memory can be removed by the user or parent

---

## The Pilot

**Target**: A K–12 virtual school launching August 12, 2026  
**Model**: Opt-in, consent-based AI companion program  
**Measurable outcome**: Student academic performance over time  
**Cost to school**: Zero  
**Research goal**: First longitudinal study of persistent-memory AI companions in a real K–12 environment with built-in safety infrastructure

---

## Tech Stack

- **Frontend**: React (single-file components per dashboard)
- **AI**: Anthropic Claude API (Socratic tutoring, teacher copilot, family communication)
- **Architecture**: Built on [CAMA](https://github.com/LoriensLibrary/cama) — SQLite, Python, local semantic embeddings, MCP server
- **Design**: Dark themed UI with animated worlds, responsive layout

---

## Project Structure

```
Project-Companion/
├── student-app.jsx        # Student-facing companion, games, progress
├── teacher-dashboard.jsx  # Teacher copilot, student intelligence, curriculum tools
├── parent-dashboard.jsx   # Parent view — progress, activity, help-at-home
└── README.md
```

---

## Roadmap

- [x] Student companion with Socratic tutoring
- [x] Four themed animated worlds
- [x] Educational games with progression (Quiz, Math, Scramble, Memory)
- [x] Teacher copilot dashboard with 9 feature tabs
- [x] Parent dashboard with overview, activity, and help-at-home
- [x] Teacher question injection into companion conversations
- [x] AI-powered family communication drafting
- [ ] Backend API proxy (remove client-side API calls)
- [ ] User accounts and session persistence
- [ ] Data pipeline: student sessions → teacher dashboard → parent view
- [ ] COPPA-compliant parental consent flow
- [ ] Mandatory reporting protocol implementation
- [ ] Connect to CAMA for persistent cross-session memory
- [ ] Teacher admin interface for question bank management
- [ ] Multi-student parent view
- [ ] Pilot deployment (August 2026)

---

## Safety & Privacy

Project Companion is designed for children. Safety is not a feature — it is the architecture.

- **COPPA compliance**: Parental consent required before any minor uses the system
- **No data collection without consent**: System will not store conversation content without explicit opt-in
- **Mandatory reporting**: Protocol for handling disclosures of harm
- **Provenance-aware memory**: The system distinguishes user statements from AI inferences
- **Teacher control**: Curriculum injection ensures the companion teaches what the teacher intends
- **Parent visibility**: View-only access with clear privacy boundaries
- **Right to delete**: Any stored data can be removed at parent or student request
- **Not a clinical tool**: This is educational support, not therapy or diagnosis

---

## Related Work

- **CAMA Repository**: [github.com/LoriensLibrary/cama](https://github.com/LoriensLibrary/cama)
- **Published Papers**: [Zenodo — ORCID 0009-0005-5803-8401](https://orcid.org/0009-0005-5803-8401)
- **Dataset**: [HuggingFace — Continuity Burden Dataset](https://huggingface.co/datasets/LoriensLibrary/cama-continuity-burden)
- **Website**: [lorienslibrary.netlify.app](https://lorienslibrary.netlify.app)

---

## Author

**Angela Reinhold** — Independent AI safety researcher, founder of Lorien's Library LLC, computer science student (AI concentration) at Full Sail University.

ORCID: [0009-0005-5803-8401](https://orcid.org/0009-0005-5803-8401)

---

## License

MIT License

© 2026 Lorien's Library LLC

*Better together.*
