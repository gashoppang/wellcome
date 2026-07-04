# Streamlit Greeting App Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. The user explicitly requested no subagents, so do not use superpowers:subagent-driven-development. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a small Streamlit app with a greeting home screen, a celebration screen, and OKLCH-only project CSS colors.

**Architecture:** The Streamlit entry point delegates state transitions to a small object-oriented page-state class. UI rendering remains in `app.py`, while pure state behavior lives in `streamlit_greeting/page_state.py` so it can be tested without a running Streamlit server.

**Tech Stack:** Python 3.11+, Streamlit, pytest, Markdown documentation, CSS with OKLCH colors.

---

## File Structure

- Create: `streamlit_greeting/__init__.py`
  - Marks the app logic directory as a Python package.
- Create: `streamlit_greeting/page_state.py`
  - Defines page names and the `GreetingPageState` class for page initialization, transition, and normalization.
- Create: `tests/test_page_state.py`
  - Verifies all page-state behavior without importing Streamlit.
- Create: `app.py`
  - Streamlit entry point, CSS, home screen, celebration screen, and button wiring.
- Create: `.streamlit/config.toml`
  - Streamlit server defaults. Color styling stays in app-authored CSS because Streamlit theme color validation can vary by version.
- Create: `requirements.txt`
  - Runtime dependency for Streamlit.
- Create: `requirements-dev.txt`
  - Test dependency for pytest plus runtime dependency.
- Create: `.gitignore`
  - Keeps virtual environments, caches, and Streamlit local secrets out of git.
- Create: `README.md`
  - Documents setup, test, and run commands.

## Task 1: Page State Tests

**Files:**
- Create: `tests/test_page_state.py`
- Create: `streamlit_greeting/__init__.py`

- [ ] **Step 1: Write the failing tests**

Create `tests/test_page_state.py`:

```python
from streamlit_greeting.page_state import CELEBRATION_PAGE, HOME_PAGE, GreetingPageState


def test_initialize_defaults_missing_page_to_home() -> None:
    session_state: dict[str, str] = {}
    page_state = GreetingPageState(session_state)

    page_state.initialize()

    assert session_state["page"] == HOME_PAGE


def test_initialize_normalizes_unknown_page_to_home() -> None:
    session_state = {"page": "unknown"}
    page_state = GreetingPageState(session_state)

    page_state.initialize()

    assert session_state["page"] == HOME_PAGE


def test_greet_moves_to_celebration_page() -> None:
    session_state = {"page": HOME_PAGE}
    page_state = GreetingPageState(session_state)

    page_state.show_celebration()

    assert session_state["page"] == CELEBRATION_PAGE


def test_return_home_moves_to_home_page() -> None:
    session_state = {"page": CELEBRATION_PAGE}
    page_state = GreetingPageState(session_state)

    page_state.show_home()

    assert session_state["page"] == HOME_PAGE
```

Create `streamlit_greeting/__init__.py`:

```python
"""Core logic for the Streamlit greeting app."""
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `python -m pytest tests/test_page_state.py -q`

Expected: FAIL with `ModuleNotFoundError: No module named 'streamlit_greeting.page_state'`.

## Task 2: Page State Implementation

**Files:**
- Create: `streamlit_greeting/page_state.py`
- Test: `tests/test_page_state.py`

- [ ] **Step 1: Implement the page-state class**

Create `streamlit_greeting/page_state.py`:

```python
from __future__ import annotations

from collections.abc import MutableMapping

HOME_PAGE = "home"
CELEBRATION_PAGE = "celebration"
VALID_PAGES = frozenset({HOME_PAGE, CELEBRATION_PAGE})


class GreetingPageState:
    """Manages the two valid page states for the Streamlit greeting app."""

    def __init__(self, session_state: MutableMapping[str, str]) -> None:
        self._session_state = session_state

    def initialize(self) -> None:
        if self.current_page not in VALID_PAGES:
            self.show_home()

    @property
    def current_page(self) -> str | None:
        return self._session_state.get("page")

    def show_celebration(self) -> None:
        self._session_state["page"] = CELEBRATION_PAGE

    def show_home(self) -> None:
        self._session_state["page"] = HOME_PAGE
```

- [ ] **Step 2: Run tests to verify they pass**

Run: `python -m pytest tests/test_page_state.py -q`

Expected: PASS with `4 passed`.

- [ ] **Step 3: Commit state logic**

Run:

```bash
git add streamlit_greeting tests
git commit -m "test: cover greeting page state"
```

## Task 3: Streamlit App UI

**Files:**
- Create: `app.py`
- Create: `.streamlit/config.toml`
- Create: `requirements.txt`
- Create: `requirements-dev.txt`
- Modify: `.gitignore`

- [ ] **Step 1: Add project dependencies and git ignores**

Create `requirements.txt`:

```text
streamlit>=1.36,<2.0
```

Create `requirements-dev.txt`:

```text
-r requirements.txt
pytest>=8.0,<9.0
```

Create `.gitignore`:

```gitignore
__pycache__/
*.py[cod]
.pytest_cache/
.venv/
.streamlit/secrets.toml
```

- [ ] **Step 2: Add Streamlit config**

Create `.streamlit/config.toml`:

```toml
[server]
headless = true
runOnSave = true

[browser]
gatherUsageStats = false

[theme]
base = "light"
```

- [ ] **Step 3: Create the Streamlit UI**

Create `app.py`:

```python
from __future__ import annotations

import streamlit as st

from streamlit_greeting.page_state import CELEBRATION_PAGE, GreetingPageState


APP_TITLE = "Wellcome"


def apply_styles() -> None:
    st.markdown(
        """
        <style>
            .stApp {
                background:
                    radial-gradient(circle at top, oklch(95% 0.06 92), oklch(95% 0.06 92 / 0) 42%),
                    linear-gradient(180deg, oklch(99% 0.015 95), oklch(94% 0.04 245));
                color: oklch(24% 0.03 260);
            }

            .main .block-container {
                max-width: 720px;
                min-height: 100vh;
                padding-top: 20vh;
                padding-bottom: 10vh;
            }

            .greeting-shell {
                text-align: center;
            }

            .greeting-emoji {
                font-size: 5rem;
                line-height: 1;
                margin-bottom: 1rem;
            }

            .greeting-title {
                color: oklch(24% 0.03 260);
                font-size: clamp(2.5rem, 8vw, 4.75rem);
                font-weight: 800;
                line-height: 1.1;
                margin: 0 0 2rem;
            }

            div.stButton {
                display: flex;
                justify-content: center;
            }

            div.stButton > button {
                background: oklch(59% 0.19 35);
                border: 1px solid oklch(52% 0.17 35);
                border-radius: 0.5rem;
                color: oklch(99% 0.01 95);
                font-size: 1.05rem;
                font-weight: 700;
                min-height: 3rem;
                padding: 0.7rem 1.4rem;
            }

            div.stButton > button:hover {
                background: oklch(54% 0.2 35);
                border-color: oklch(47% 0.18 35);
                color: oklch(99% 0.01 95);
            }

            div.stButton > button:focus {
                box-shadow: 0 0 0 0.2rem oklch(80% 0.12 35);
                color: oklch(99% 0.01 95);
            }
        </style>
        """,
        unsafe_allow_html=True,
    )


def render_home_page(page_state: GreetingPageState) -> None:
    st.markdown(
        """
        <div class="greeting-shell">
            <div class="greeting-emoji" aria-hidden="true">👋</div>
            <h1 class="greeting-title">안녕하세요</h1>
        </div>
        """,
        unsafe_allow_html=True,
    )
    if st.button("나도 인사하기", type="primary"):
        page_state.show_celebration()
        st.rerun()


def render_celebration_page(page_state: GreetingPageState) -> None:
    st.balloons()
    st.markdown(
        """
        <div class="greeting-shell">
            <div class="greeting-emoji" aria-hidden="true">🎉</div>
            <h1 class="greeting-title">첫 웹페이지 제작을 축하해요</h1>
        </div>
        """,
        unsafe_allow_html=True,
    )
    if st.button("돌아가기", type="primary"):
        page_state.show_home()
        st.rerun()


def main() -> None:
    st.set_page_config(page_title=APP_TITLE, page_icon="👋", layout="centered")
    apply_styles()

    page_state = GreetingPageState(st.session_state)
    page_state.initialize()

    if page_state.current_page == CELEBRATION_PAGE:
        render_celebration_page(page_state)
        return

    render_home_page(page_state)


if __name__ == "__main__":
    main()
```

- [ ] **Step 4: Run static import check**

Run: `python -m compileall app.py streamlit_greeting`

Expected: PASS with no syntax errors.

- [ ] **Step 5: Run tests**

Run: `python -m pytest tests/test_page_state.py -q`

Expected: PASS with `4 passed`.

- [ ] **Step 6: Commit UI implementation**

Run:

```bash
git add .gitignore .streamlit app.py requirements.txt requirements-dev.txt
git commit -m "feat: add Streamlit greeting UI"
```

## Task 4: Documentation And Verification

**Files:**
- Create: `README.md`
- Modify: `docs/superpowers/specs/2026-07-04-streamlit-greeting-app-design.md` if implementation decisions differ from the approved design.

- [ ] **Step 1: Add README**

Create `README.md`:

```markdown
# Wellcome

간단한 Streamlit 인사 웹앱입니다.

## 기능

- 메인 화면 중앙에 `안녕하세요` 문구와 이모티콘을 표시합니다.
- `나도 인사하기` 버튼을 누르면 축하 화면으로 이동합니다.
- 축하 화면에서 `첫 웹페이지 제작을 축하해요` 문구와 Streamlit 폭죽 효과를 표시합니다.
- `돌아가기` 버튼으로 메인 화면에 돌아갈 수 있습니다.
- 프로젝트에서 직접 작성한 CSS 색상은 OKLCH 색공간을 사용합니다.

## 설치

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements-dev.txt
```

## 테스트

```powershell
python -m pytest
python -m compileall app.py streamlit_greeting
```

## 실행

```powershell
streamlit run app.py
```
```

- [ ] **Step 2: Verify all authored CSS colors use OKLCH**

Run: `rg -n "#[0-9a-fA-F]{3,8}|rgb\\(|rgba\\(|hsl\\(|hsla\\(|transparent|color: (red|blue|green|white|black)" app.py .streamlit README.md docs`

Expected: No project-authored CSS color values outside OKLCH. Matches in prose that describe non-OKLCH concepts are acceptable only if they are not actual authored color values.

- [ ] **Step 3: Run full verification**

Run:

```bash
python -m pytest -q
python -m compileall app.py streamlit_greeting
streamlit run app.py --server.headless true
```

Expected:

- Tests pass.
- Compile step succeeds.
- Streamlit starts and prints a local URL. Stop the server after startup verification.

- [ ] **Step 4: Commit docs and verification support**

Run:

```bash
git add README.md docs/superpowers/plans/2026-07-04-streamlit-greeting-app.md
git commit -m "docs: document Streamlit greeting app"
```
