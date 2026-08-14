# R&D Command Center — Blackbird Labs

Executive dashboard for the R&D / SWAT Team: portfolio, roadmap, capacity,
opportunity pipeline, solution inventory, knowledge & accelerator catalog,
risks & decisions, and the operating model — including Clara's own
command center.

## Stack

- React + TypeScript + Vite
- Tailwind CSS v4
- React Router

## Data model

All content lives in `src/data/*.ts`, fully typed and separate from the UI
(`src/pages`, `src/components`). Nothing is invented: unknown fields are
explicitly marked `TBD` or `Needs Definition` and rendered with a flagged
`TBDTag` component instead of a guessed value. Swap these files for calls to
SharePoint, Azure DevOps, or repository APIs without touching the UI layer.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
