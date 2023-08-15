import { CSSProperties, FormEvent, useEffect, useRef, useState } from "react";
import { useKeyboard } from "../useKeyboard/useKeyboard";
import clamp from "../../util/clamp";

export type useMoveType = {
  onMoveStarts?: () => void;
  onMove?: () => void;
  onMoveFinishes?: () => void;
};

const useMove = (props?: useMoveType) => {
  const { onMoveStarts, onMove, onMoveFinishes } = props || {};
  // this target stored to reference while detecting cursor coordinates
  const [target, setTarget] = useState<HTMLElement | undefined>(undefined);
  const [coords, setCoords] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  // coords shift helps to preserve correct position of the element under cursor at the initial drag
  const shift = useRef({ x: 0, y: 0 });

  // dimensions of moving element and its parent are necessary to preserve correct position of element inside relative parent
  function generateDimensions(target: HTMLElement) {
    const dimensions = target?.getBoundingClientRect() ?? {
      width: 0,
      height: 0,
    };
    const parentDimensions = target?.parentElement?.getBoundingClientRect() ?? {
      width: 0,
      height: 0,
    };
    return { dimensions, parentDimensions };
  }

  // moving eleent
  function move({ x, y }: { x: number; y: number }) {
    setCoords({ x, y });
    onMove?.();
  }

  // moving element with cursor or finger
  function detectCursorCoords(event: React.PointerEvent | PointerEvent) {
    event.stopPropagation();
    if (!target) return;
    const ev = event as unknown as React.PointerEvent;
    const x = ev.pageX - shift?.current.x;
    const y = ev.pageY - shift?.current.y;
    const { dimensions, parentDimensions } = generateDimensions(target);
    const valX = clamp(x, parentDimensions?.width - dimensions?.width);
    const valY = clamp(y, parentDimensions?.height - dimensions?.height);
    return { x: valX, y: valY };
  }

  function moveWithCursor(ev: React.PointerEvent | PointerEvent) {
    const coords = detectCursorCoords(ev);
    if (!coords) return;
    move(coords);
  }

  function handleMoveStarts(event: React.PointerEvent | PointerEvent) {
    const ev = event as unknown as React.PointerEvent;
    const target = ev.target as HTMLElement;
    onMoveStarts?.();
    setTarget(target as HTMLElement);
    shift.current.x = ev.pageX - target?.offsetLeft;
    shift.current.y = ev.pageY - target?.offsetTop;
  }

  function handleMoveFinishes(event: React.PointerEvent | PointerEvent) {
    event.preventDefault();
    event.stopPropagation();
    setTarget(undefined);
    onMoveFinishes?.();
  }

  // listening to mouse events outside of the box so it will not break if user dragged mouse out of the zone which is seems to be movable. It is just a more natural way to interact with such interface components
  useEffect(() => {
    window.addEventListener("pointermove", moveWithCursor);
    window.addEventListener("pointerup", handleMoveFinishes);
    return () => {
      window.removeEventListener("pointermove", moveWithCursor);
      window.removeEventListener("pointerup", handleMoveFinishes);
    };
  });

  // moving with keyboard
  function moveWithKeyboard(
    ev: KeyboardEvent | FormEvent,
    moveTo: "left" | "rights" | "up" | "down"
  ) {
    ev.preventDefault();
    ev.stopPropagation();
    const target = ev.currentTarget as HTMLElement;
    const { dimensions, parentDimensions } = generateDimensions(target);
    switch (moveTo) {
      case "down":
        move({
          x: coords.x,
          y: clamp(coords.y + 20, parentDimensions.height - dimensions.height),
        });
        break;
      case "up":
        move({
          x: coords.x,
          y: clamp(coords.y - 20, parentDimensions.height - dimensions.height),
        });
        break;
      case "left":
        move({
          x: clamp(coords.x - 20, parentDimensions.width - dimensions.width),
          y: coords.y,
        });
        break;
      case "rights":
        move({
          x: clamp(coords.x + 20, parentDimensions.width - dimensions.width),
          y: coords.y,
        });
        break;
    }
  }

  const { keyboardPropList } = useKeyboard({
    ArrowLeft: (ev) => moveWithKeyboard(ev, "left"),
    ArrowRight: (ev) => moveWithKeyboard(ev, "rights"),
    ArrowDown: (ev) => moveWithKeyboard(ev, "down"),
    ArrowUp: (ev) => moveWithKeyboard(ev, "up"),
  });

  // return
  const movePropList = {
    onPointerDown: handleMoveStarts,
    ...(matchMedia("(pointer:coarse)").matches && {
      style: { touchAction: "none" } as CSSProperties,
    }),
    ...keyboardPropList,
  };

  return {
    setCoords,
    coords,
    movePropList,
  };
};

export { useMove };
