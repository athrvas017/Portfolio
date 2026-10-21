# Athrva Sarade — AI Engineer & Systems Architecture OS Portfolio

A technical personal portfolio for an AI/ML and Systems Engineer, built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Lucide React**.

Preserves the **Obsidian × Amber** dark workstation aesthetic, interactive **Skill Tree Knowledge Graph**, **Workspace**, **Projects Explorer**, **Model Registry**, and dedicated **Credentials Registry**.

---

## Architecture & Routes

| Route | Destination | Description |
|---|---|---|
| `/` | Neural Landing | Hero with interactive SVG Skill Tree, hover popups, click displacement, and competitive programming badges |
| `/workspace` | Workspace | Technical workstation shell with navigation rail, runtime telemetry, dock, and embedded multi-app support |
| `/projects` | Projects Explorer | Filterable systems portfolio with search, domain tags (AI/ML, Systems/Backend, Web, Hackathon), and status filters |
| `/projects/:slug` | Case Study Details | 9-section technical case study template (Problem, Approach, Architecture, Implementation, Outcomes, Limitations) |
| `/models` | Model Registry | Searchable registry of machine learning classifiers, graph traversal DAGs, instruction LLMs, and RAG architectures |
| `/models/:slug` | Model / System Cards | Rigorous model specifications with dataset provenance, empirical metrics, baselines, and failure modes |
| `/credentials` | Credentials Registry | Filterable registry of verified accreditations (Agentic AI, AI/ML, Programming, Other) with direct PDF previews and verification actions |
| `/about` | Engineer Profile | VJTI Computer Engineering background, academic standing, hackathon podiums, competitive programming badges, and competency mesh |
| `/contact` | Contact & Dispatch | Verified contact channels (email, GitHub, LinkedIn, location) and mail client dispatcher |

---

## Design System Tokens (Obsidian × Amber)

```css
:root {
  --bg: #101113;
  --surface: #1B1E22;
  --surface-raised: #25292E;
  --border: #383D43;
  --text: #F0EDE6;
  --text-muted: #A5A8AC;
  --text-subtle: #777D83;
  --accent: #FFB454;       /* Amber Primary */
  --mint: #79C9B0;         /* Mint Secondary */
  --tertiary: #85C2FF;     /* Blue Informational */
}
```

---

## Centralized Data Modules

All portfolio data is kept separate from UI components and stored in typed data files:

- `src/data/profile.ts` & `public/data/profile.json` — Personal background, academic standing, and focus areas.
- `src/data/projects.ts` & `public/data/projects.json` — Verified software systems, architecture details, and case studies.
- `src/data/models.ts` — Model registry entries, evaluation metrics, and system cards.
- `src/data/credentials.ts` & `public/data/certifications.json` — Verified certificates, issuers, completion dates, and certificate PDF paths.

---

## Development & Build

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Run production build
npm run build

# Run linting
npm run lint
```
