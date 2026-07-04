# Streamlit Greeting App Design

## Summary

Build a small Streamlit web app that greets the user on the main screen and shows a celebration screen after the user clicks a greeting button.

## Goals

- Show a centered main screen with the Korean greeting text `안녕하세요` and an emoji.
- Provide a `나도 인사하기` button below the greeting.
- When the button is clicked, show `첫 웹페이지 제작을 축하해요` and trigger a celebration effect.
- Provide a `돌아가기` button below the celebration text to return to the main screen.
- Use OKLCH color values for every custom color defined in CSS.

## Non-Goals

- User accounts, persistence, database integration, and external APIs are out of scope.
- Custom JavaScript fireworks are out of scope for this first version; Streamlit's built-in celebration effect is sufficient.
- Multi-page routing is out of scope because the app has only two states.

## Architecture

The app uses a single Streamlit entry point, `app.py`. Page state is stored in `st.session_state.page`, with two valid states: `home` and `celebration`.

The UI is intentionally simple. Rendering is split into small functions so behavior can be tested without launching a browser:

- `GreetingPageState`: owns the current page state and transitions.
- `render_home_page`: renders the main greeting screen.
- `render_celebration_page`: renders the celebration screen and triggers `st.balloons()`.
- `main`: applies page config, CSS, state initialization, and page dispatch.

## UI

The app uses centered content with a calm background, a large greeting, and one primary action button per screen.

The main screen displays:

- Emoji: `👋`
- Text: `안녕하세요`
- Button: `나도 인사하기`

The celebration screen displays:

- Text: `첫 웹페이지 제작을 축하해요`
- Streamlit balloon celebration effect
- Button: `돌아가기`

## Styling

Custom CSS uses only `oklch(...)` color values. The implementation avoids hardcoded non-OKLCH hex, RGB, HSL, and named color values in custom styles.

Streamlit's own generated styles are not controlled by this project, so the OKLCH rule applies to project-authored CSS and configuration.

## Error Handling And Boundaries

If `st.session_state.page` is missing or has an unexpected value, the app falls back to the `home` page. This keeps the UI recoverable during development and after Streamlit reruns.

## Testing

Tests cover the pure page-state transition behavior:

- Missing page state initializes to `home`.
- Greeting action moves from `home` to `celebration`.
- Return action moves from `celebration` to `home`.
- Invalid page state is normalized to `home`.

Full browser automation is not required for this first version. A manual Streamlit run verifies the rendered app and Streamlit runtime startup.
