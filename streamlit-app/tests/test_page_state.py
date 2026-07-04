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
