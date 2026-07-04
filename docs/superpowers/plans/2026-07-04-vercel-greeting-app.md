# Vercel Greeting App Implementation Plan

> **For agentic workers:** Implement inline in this session. The user previously requested no subagents and no TDD for this small web app.

**Goal:** Add a Vercel-deployable Next.js TypeScript app that reproduces the greeting and celebration flow.

**Architecture:** Keep the existing Streamlit app unchanged and add a separate `vercel-app/` Next.js application. UI state is represented by a small object-oriented TypeScript domain class and rendered by a client React component.

**Tech Stack:** Next.js, React, TypeScript, CSS Modules/global CSS, Vercel.

---

## Files

- `vercel-app/package.json`: scripts and dependencies.
- `vercel-app/next.config.ts`: Next.js configuration.
- `vercel-app/tsconfig.json`: strict TypeScript configuration.
- `vercel-app/eslint.config.mjs`: lint configuration.
- `vercel-app/next-env.d.ts`: Next.js generated type reference placeholder.
- `vercel-app/app/layout.tsx`: app metadata and root shell.
- `vercel-app/app/page.tsx`: page entry point.
- `vercel-app/app/globals.css`: OKLCH-only styles and confetti animation.
- `vercel-app/src/domain/GreetingPageState.ts`: page state class.
- `vercel-app/src/components/GreetingExperience.tsx`: interactive greeting UI.
- `vercel-app/README.md`: local and Vercel deployment instructions.
- `README.md`: add Vercel app section.

## Steps

1. Create Next.js configuration and package files under `vercel-app/`.
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
- The Vercel app is kept under `vercel-app/` so existing Streamlit files and Python dependencies remain untouched.
- The celebration effect uses CSS, not a runtime confetti package, to avoid adding an animation dependency for a small app.
