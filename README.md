# Parkin Pulse

A polished, **100% static** interactive showcase website for **Parkin Pulse** — an ankle-worn
movement-monitoring and analysis prototype for Parkinson's-related gait analysis.

Built for a science / technology competition where a physical prototype and project flex poster sit
beside the laptop. Everything runs entirely in the browser on **preloaded / static data** — there is
no backend, no database, no API, no WebSockets and no live sensor connection.

## Tech stack

- React + TypeScript
- Vite
- Tailwind CSS v4
- Recharts (static, deterministic charts)
- Lucide React (icons)

## Getting started

```text
npm install
npm run dev      # local dev server
npm run build    # production build -> dist/
npm run preview  # serve the production build locally
```

## Deploying to Netlify

- Build command: `npm run build`
- Publish directory: `dist`

No environment variables, server routes or external runtime dependencies are required.

## Notes

- All dashboard values, waveforms, spectra and scenario data are fixed demonstration data generated
  deterministically at build time. Nothing connects to the physical device.
- The website explicitly presents the project as a *movement-monitoring and analysis prototype*, not a
  clinically validated diagnostic device.

## Structure

- `src/data/` — 16-feature definitions, deterministic demo data, chat transcripts
- `src/components/` — section components including the full-screen **Judge Mode** presenter
- `src/App.tsx` — page assembly