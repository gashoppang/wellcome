export const GREETING_PAGE_NAMES = {
  home: "home",
  celebration: "celebration",
} as const;

export type GreetingPageName =
  (typeof GREETING_PAGE_NAMES)[keyof typeof GREETING_PAGE_NAMES];

export class GreetingPageState {
  private constructor(private readonly pageName: GreetingPageName) {}

  static home(): GreetingPageState {
    return new GreetingPageState(GREETING_PAGE_NAMES.home);
  }

  static celebration(): GreetingPageState {
    return new GreetingPageState(GREETING_PAGE_NAMES.celebration);
  }

  get currentPage(): GreetingPageName {
    return this.pageName;
  }

  get isCelebrating(): boolean {
    return this.pageName === GREETING_PAGE_NAMES.celebration;
  }

  greet(): GreetingPageState {
    return GreetingPageState.celebration();
  }

  returnHome(): GreetingPageState {
    return GreetingPageState.home();
  }
}
