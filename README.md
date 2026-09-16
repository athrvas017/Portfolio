# Portfolio

Personal developer portfolio built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**.

## Tech Stack

- **Framework** — Next.js 15 (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS + custom CSS variables
- **Animations** — Framer Motion
- **Icons** — Lucide React

## Features

- Hero section with animated intro
- Featured projects showcase
- Interactive skill graph — `Skills → Categories → Skill nodes` (hover for preview, click for full dossier)
- Achievements and certifications
- Education timeline
- Fully responsive dark-mode design

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/            # Next.js App Router pages
│   ├── page.tsx    # Homepage
│   ├── projects/   # Projects page
│   └── skills/     # Skills graph page
├── components/
│   ├── hero/       # Hero section
│   ├── projects/   # Project cards
│   ├── sections/   # About, achievements, certs, education
│   └── skills/     # Interactive skill graph & tree
└── data/           # Static profile & project data
public/
└── data/           # JSON data files
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
