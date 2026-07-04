# Vercel Greeting App Design

## Summary

Add a Vercel-deployable web app at the repository root that reproduces the existing greeting flow. The current Streamlit app remains available for local Python use under `streamlit-app/`.

## Goals

- Provide the same user-facing flow as the Streamlit app:
  - main screen with emoji and `안녕하세요`
  - `나도 인사하기` button
  - celebration screen with `첫 웹페이지 제작을 축하해요`
  - visible celebration effect
  - `돌아가기` button
- Use TypeScript instead of JavaScript.
- Use an object-oriented page-state model for the UI state.
- Use only `oklch(...)` values for project-authored CSS colors.
- Keep the app deployable on Vercel with standard Next.js commands.

## Non-Goals

- Replacing the Streamlit app is out of scope.
- Backend APIs, persistence, authentication, and external services are out of scope.
- Custom build infrastructure outside the Vercel app directory is out of scope.

## Architecture

The Vercel app uses Next.js with the App Router. The app is a client-side interactive page because the button changes view state in the browser.

Files are scoped at the repository root:

- `app/page.tsx`: page entry point.
- `src/components/GreetingExperience.tsx`: interactive UI component.
- `src/domain/GreetingPageState.ts`: object-oriented state model.
- `app/globals.css`: global layout, button styles, and CSS confetti.
- `app/layout.tsx`: metadata and document shell.

The UI state has two valid pages: `home` and `celebration`. The `GreetingPageState` class exposes methods to transition between those states, and React stores the current state instance with `useState`.

## UI And Effects

The main screen is centered and displays:

- emoji `👋`
- text `안녕하세요`
- button `나도 인사하기`

The celebration screen displays:

- emoji `🎉`
- text `첫 웹페이지 제작을 축하해요`
- CSS-based confetti strips
- button `돌아가기`

The confetti effect is implemented with CSS animations and static markup. This avoids a browser-only animation dependency and keeps the Vercel app simple.

## Styling

All project-authored CSS color values use `oklch(...)`. Non-color CSS keywords such as layout values are allowed. CSS custom properties are used for shared colors so the palette is easy to maintain.

## Deployment

Vercel should use the repository root as the project root. Standard commands:

- Install: `npm install`
- Develop: `npm run dev`
- Validate: `npm run lint` and `npm run build`
- Build output: Next.js default output managed by Vercel

## Testing And Verification

Verification is done through:

- TypeScript and Next.js build validation with `npm run build`
- lint validation with `npm run lint`
- CSS color policy check using ripgrep for non-OKLCH color syntax
- manual browser check through `npm run dev`
