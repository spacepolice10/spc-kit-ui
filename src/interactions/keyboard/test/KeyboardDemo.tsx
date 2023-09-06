import { FormEvent, ReactNode, useState } from "react";
import { useKeyboard } from "../hook/useKeyboard";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
} from "@phosphor-icons/react";

export default function KeyboardDemo() {
  const [key, setKey] = useState<ReactNode[]>([]);
  const { keyboardPropList } = useKeyboard({
    ArrowRight: () =>
      changeLetter(
        <ArrowRight size={20} className="font-bold text-emerald-400" />
      ),
    ArrowLeft: () =>
      changeLetter(
        <ArrowLeft size={20} className="font-bold text-emerald-400" />
      ),
    ArrowDown: (ev: KeyboardEvent | FormEvent) => {
      ev.preventDefault();
      changeLetter(
        <ArrowDown size={20} className="font-bold text-emerald-400" />
      );
    },
    ArrowUp: (ev: KeyboardEvent | FormEvent) => {
      ev.preventDefault();
      changeLetter(
        <ArrowUp size={20} className="font-bold text-emerald-400" />
      );
    },
  });
  function changeLetter(letter: ReactNode) {
    if (key.length < 24) {
      setKey((state) => state.concat(letter));
    } else {
      setKey((state) => state.slice(1).concat(letter));
    }
  }
  return (
    <div {...keyboardPropList} className="overflow-hidden">
      <p className="text-sm text-slate-400 mb-2">
        keyboard accessible block, focus on it and try pressing arrow keys
      </p>
      <div className="flex w-96">
        {key.map((letter, i) => (
          <span key={i}>{letter}</span>
        ))}
      </div>
    </div>
  );
}
