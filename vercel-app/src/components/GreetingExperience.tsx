"use client";

import { useMemo, useState } from "react";
import { GreetingPageState } from "@/domain/GreetingPageState";

const CONFETTI_PIECES = 18;

export function GreetingExperience() {
  const [pageState, setPageState] = useState(() => GreetingPageState.home());
  const confettiPieces = useMemo(
    () => Array.from({ length: CONFETTI_PIECES }, (_, index) => index),
    [],
  );

  if (pageState.isCelebrating) {
    return (
      <main className="experience" aria-live="polite">
        <Confetti pieces={confettiPieces} />
        <section className="greetingPanel" aria-label="축하 화면">
          <div className="emoji" aria-hidden="true">
            🎉
          </div>
          <h1>첫 웹페이지 제작을 축하해요</h1>
          <button
            className="primaryButton"
            type="button"
            onClick={() => setPageState(pageState.returnHome())}
          >
            돌아가기
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="experience">
      <section className="greetingPanel" aria-label="인사 화면">
        <div className="emoji" aria-hidden="true">
          👋
        </div>
        <h1>안녕하세요</h1>
        <button
          className="primaryButton"
          type="button"
          onClick={() => setPageState(pageState.greet())}
        >
          나도 인사하기
        </button>
      </section>
    </main>
  );
}

type ConfettiProps = Readonly<{
  pieces: number[];
}>;

function Confetti({ pieces }: ConfettiProps) {
  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((piece) => (
        <span key={piece} style={{ "--piece-index": piece }} />
      ))}
    </div>
  );
}
