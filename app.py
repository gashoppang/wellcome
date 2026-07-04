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
