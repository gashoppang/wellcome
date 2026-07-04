"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { GreetingPageState } from "@/domain/GreetingPageState";

const CONFETTI_PIECES = 32;

type ConfettiPiece = Readonly<{
  id: number;
  style: CSSProperties &
    Record<
      | "--start-left"
      | "--fall-x"
      | "--fall-delay"
      | "--start-rotate"
      | "--end-rotate",
      string
    >;
}>;

function createConfettiPieces(): ConfettiPiece[] {
  return Array.from({ length: CONFETTI_PIECES }, (_, index) => {
    const column = index % 16;
    const row = Math.floor(index / 16);
    const drift = ((index % 7) - 3) * 1.15;
    const delay = (index % 8) * 45 + row * 90;

    return {
      id: index,
      style: {
        "--start-left": `${8 + column * 5.8}%`,
        "--fall-x": `${drift}rem`,
        "--fall-delay": `${delay}ms`,
        "--start-rotate": `${index * 17}deg`,
        "--end-rotate": `${260 + index * 23}deg`,
      },
    };
  });
}

export function GreetingExperience() {
  const [pageState, setPageState] = useState(() => GreetingPageState.home());
  const confettiPieces = useMemo(() => createConfettiPieces(), []);

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
  pieces: ConfettiPiece[];
}>;

function Confetti({ pieces }: ConfettiProps) {
  return (
    <div className="confetti" aria-hidden="true">
      <div className="celebrationBurst" />
      {pieces.map((piece) => (
        <span className="confettiPiece" key={piece.id} style={piece.style} />
      ))}
    </div>
  );
}
