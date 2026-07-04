# Streamlit Greeting App Implementation Plan

> **For agentic workers:** Implement inline in this session. The user explicitly requested no subagents and no TDD for this small app.

**Goal:** Build a small Streamlit app with a greeting home screen, a celebration screen, and project-authored CSS colors written in OKLCH.

**Architecture:** Use a single Streamlit entry point for the UI and a small object-oriented page-state class for state transitions. The state class keeps behavior testable without launching Streamlit.

**Tech Stack:** Python 3.11+, Streamlit, pytest, Markdown documentation, CSS with OKLCH colors.

---

## Files

- `streamlit_greeting/__init__.py`: Python package marker.
- `streamlit_greeting/page_state.py`: page constants and `GreetingPageState`.
- `tests/test_page_state.py`: tests for state initialization and transitions.
- `app.py`: Streamlit UI, CSS, button actions, and celebration effect.
- `.streamlit/config.toml`: Streamlit server defaults.
- `requirements.txt`: runtime dependency.
- `requirements-dev.txt`: runtime plus test dependencies.
- `.gitignore`: local cache, virtual environment, and secret exclusions.
- `README.md`: setup, test, and run instructions.

## Steps

1. Create the page-state class with two valid pages: `home` and `celebration`.
2. Create the Streamlit UI:
   - home screen: emoji, `안녕하세요`, `나도 인사하기`
   - celebration screen: `st.balloons()`, `첫 웹페이지 제작을 축하해요`, `돌아가기`
3. Add project CSS using only `oklch(...)` color values.
4. Add dependency files, Streamlit config, `.gitignore`, and README.
5. Add tests for state initialization, invalid state normalization, and both transitions.
6. Verify with:
   - `python -m pytest -q`
   - `python -m compileall app.py streamlit_greeting`
   - `streamlit run app.py --server.headless true`
7. Confirm no project-authored CSS color uses non-OKLCH syntax.

## Decisions

- The app uses Streamlit's built-in `st.balloons()` effect instead of custom JavaScript fireworks. This is enough for the requested simple first web app and keeps maintenance low.
- `.streamlit/config.toml` does not define theme colors because Streamlit theme validation may not accept OKLCH values consistently. Project-authored visual colors live in CSS inside `app.py`.
- The implementation keeps logic small but separates page state into a class so behavior remains easy to test.
