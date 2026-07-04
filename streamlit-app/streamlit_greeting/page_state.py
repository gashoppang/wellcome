from __future__ import annotations

from collections.abc import MutableMapping

HOME_PAGE = "home"
CELEBRATION_PAGE = "celebration"
VALID_PAGES = frozenset({HOME_PAGE, CELEBRATION_PAGE})


class GreetingPageState:
    """Manages the valid page states for the greeting app."""

    def __init__(self, session_state: MutableMapping[str, str]) -> None:
        self._session_state = session_state

    @property
    def current_page(self) -> str | None:
        return self._session_state.get("page")

    def initialize(self) -> None:
        if self.current_page not in VALID_PAGES:
            self.show_home()

    def show_celebration(self) -> None:
        self._session_state["page"] = CELEBRATION_PAGE

    def show_home(self) -> None:
        self._session_state["page"] = HOME_PAGE
