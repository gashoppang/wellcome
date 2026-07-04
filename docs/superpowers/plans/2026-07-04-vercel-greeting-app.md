# Vercel Greeting App Implementation Plan

> **For agentic workers:** Implement inline in this session. The user previously requested no subagents and no TDD for this small web app.

**Goal:** Add a Vercel-deployable Next.js TypeScript app at the repository root that reproduces the greeting and celebration flow.

**Architecture:** Keep the existing Streamlit app under `streamlit-app/` and provide the Next.js application at the repository root so Vercel can deploy without a custom root directory. UI state is represented by a small object-oriented TypeScript domain class and rendered by a client React component.

**Tech Stack:** Next.js, React, TypeScript, CSS Modules/global CSS, Vercel.

---

## Files

- `package.json`: scripts and dependencies.
- `next.config.ts`: Next.js configuration.
- `tsconfig.json`: strict TypeScript configuration.
- `eslint.config.mjs`: lint configuration.
- `next-env.d.ts`: Next.js generated type reference placeholder.
- `app/layout.tsx`: app metadata and root shell.
- `app/page.tsx`: page entry point.
- `app/globals.css`: OKLCH-only styles and confetti animation.
- `src/domain/GreetingPageState.ts`: page state class.
- `src/components/GreetingExperience.tsx`: interactive greeting UI.
- `README.md`: local, Vercel, and Streamlit instructions.
- `README.md`: add Vercel app section.

## Steps

1. Create Next.js configuration and package files at the repository root.
2. Implement `GreetingPageState` with `home` and `celebration` states.
3. Implement the client-side greeting component using TypeScript.
4. Add global CSS with OKLCH colors and CSS confetti.
5. Add Vercel deployment instructions to both README files.
6. Install dependencies.
7. Verify with:
   - `npm run lint`
   - `npm run build`
   - non-OKLCH CSS color search
   - local `npm run dev` browser smoke check

## Decisions

- Next.js is used because Vercel supports it natively and Streamlit's long-running Python server model does not fit Vercel serverless deployment well.
- The Vercel app is kept at the repository root because Vercel Root Directory cannot be changed in the user's project setup.
- The Streamlit app is kept under `streamlit-app/` so the Python version remains available without interfering with Vercel deployment.
- The celebration effect uses CSS, not a runtime confetti package, to avoid adding an animation dependency for a small app.
