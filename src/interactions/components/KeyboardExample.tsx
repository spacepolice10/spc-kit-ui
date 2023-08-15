import { FormEvent, useState } from "react";
import { useKeyboard } from "../hooks/useKeyboard/useKeyboard";

export default function KeyboardExample() {
  const [key, setKey] = useState([""]);
  const { keyboardPropList } = useKeyboard({
    ArrowRight: () => changeLetter("R"),
    ArrowLeft: () => changeLetter("L"),
    ArrowDown: (ev: KeyboardEvent | FormEvent) => {
      ev.preventDefault();
      changeLetter("D");
    },
    ArrowUp: (ev: KeyboardEvent | FormEvent) => {
      ev.preventDefault();
      changeLetter("U");
    },
  });
  function changeLetter(letter: string) {
    if (key.length < 24) {
      setKey((state) => state.concat(letter));
    } else {
      setKey((state) => state.slice(1).concat(letter));
    }
  }
  return (
    <div {...keyboardPropList}>
      <span>
        keyboard accessible block, focus on it and try pressing arrow keys
      </span>
      <div
        style={{
          display: "flex",
          gap: 4,
          height: 24,
          overflow: "hidden",
        }}
      >
        {key.map((letter, i) => (
          <span key={letter + i} style={{ fontWeight: "bold" }}>
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}
