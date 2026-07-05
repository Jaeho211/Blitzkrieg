# AGENTS.md

## Project

This repository builds a local web presentation about *전격전의 전설*.

## Source of Truth

- Use `content/source.md` as the only content source.
- Images referenced by `content/source.md` live in `content/`.
- If content needs to be corrected or restructured, preserve the original meaning and prefer adding derived presentation data rather than rewriting the source file.

## Product Direction

- Build an interactive, scroll-driven presentation page rather than a slide deck clone.
- Treat the topic as historical and organizational analysis, not military glorification.
- Avoid Nazi symbols, propaganda-like framing, celebratory language, or sensational war imagery.
- The tone should resemble a museum exhibit or analytical briefing: serious, restrained, visual, and readable.

## Design Direction

- Use a dark, muted visual system with restrained accent colors.
- Good motifs: maps, timelines, route lines, timestamps, operational notes, comparison panels.
- Avoid decoration that distracts from the argument.
- Favor stable layouts that work during live presentation on a laptop and projector.
- When a page uses source images that contain important text, do not place captions, gradients, labels, or UI overlays on top of the image. Keep explanatory text outside the image and preserve readability.
- Page 5 should show that the rotating-door encirclement principle of the Battle of Cannae is echoed by the Sichelschnitt plan. The `cannae.jpg` and `Sichelschnitt.jpg` images should be large, legible, and treated as the primary evidence on the page.

## Technical Direction

- Preferred stack: Vite, React, TypeScript, Tailwind CSS, Framer Motion, GSAP, lucide-react.
- Keep presentation content in typed data files where practical.
- Use local image assets copied or served from the repository.
- Use static deployment-friendly assumptions: no backend, no network dependency at runtime.

## Quality Bar

- The first viewport should immediately communicate the subject and thesis.
- The page should support a presenter talking through the story in order.
- Text must remain readable on desktop and mobile widths.
- Prefer `npm run build` for automated verification after code changes.
- Do not run long-lived or slow visual verification commands such as `npm run dev`, Playwright screenshots, full-page captures, or browser-based checks unless the user explicitly asks for them. The user will usually run and visually inspect the presentation locally.

## Current Implementation

- The app is a Vite React TypeScript project.
- Main presentation data is in `src/data/presentation.ts`.
- Main page composition is in `src/App.tsx`.
- Shared styles are in `src/styles.css`.
- Local runtime images are served from `public/content/`.
- Original source material remains in `content/source.md` and `content/`.

## Local Commands

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build for production: `npm run build`
- The dev server usually opens at `http://localhost:5173`.

## Likely Next Work

- Tighten the presentation narrative and Korean copy.
- Improve the map section with route overlays and scroll-linked motion.
- Add richer timeline transitions with Framer Motion or GSAP.
- Check desktop projector and mobile layouts.
- Refine the final organizational takeaways for a company audience.
