# Root Vercel And Streamlit Folder Restructure Plan

> **For agentic workers:** Implement inline in this session. The user requested no subagents and no TDD for this small app.

**Goal:** Make the repository root directly deployable by Vercel while preserving the Streamlit version in a subfolder.

**Architecture:** Move the Next.js/TypeScript Vercel app from `vercel-app/` to the repository root. Move the existing Streamlit Python app into `streamlit-app/` with its tests and dependencies.

**Tech Stack:** Next.js, React, TypeScript, Vercel, Streamlit, pytest.

---

## Target Structure

- Root: Vercel app
  - `package.json`
  - `package-lock.json`
  - `next.config.ts`
  - `tsconfig.json`
  - `eslint.config.mjs`
  - `next-env.d.ts`
  - `app/`
  - `src/`
- `streamlit-app/`: Streamlit app
  - `app.py`
  - `.streamlit/config.toml`
  - `requirements.txt`
  - `requirements-dev.txt`
  - `streamlit_greeting/`
  - `tests/`
- `README.md`: explains Vercel root deploy and Streamlit local execution.

## Steps

1. Move Streamlit files into `streamlit-app/`.
2. Move all `vercel-app/` source and config files to the repository root.
3. Remove the now-empty `vercel-app/` directory if it has no tracked source files left.
4. Update README and design documents with new paths.
5. Verify Vercel root with `npm run lint`, `npm run build`, and `npm audit --audit-level=moderate`.
6. Verify Streamlit folder with `python -m pytest -q` and `python -m compileall app.py streamlit_greeting`.
7. Run a local Next development server from the root and smoke test the greeting flow.

## Decisions

- Vercel app code lives at the repository root because the user cannot change Root Directory in Vercel.
- Streamlit is preserved under `streamlit-app/` instead of removed because it remains useful for local Python execution.
