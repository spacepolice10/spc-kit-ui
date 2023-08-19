import { FormEvent } from "react";

export type useKeyboardType = {
  [index: string]: (ev: KeyboardEvent | FormEvent) => void;
};

const useKeyboard = (keys: useKeyboardType) => {
  function keysHandle(ev: React.KeyboardEvent) {
    if (!keys[ev.key]) return;
    keys[ev.key](ev);
  }
  const keyboardPropList = {
    tabIndex: -1,
    onKeyDown: keysHandle,
  };
  return { keyboardPropList };
};

export { useKeyboard };
