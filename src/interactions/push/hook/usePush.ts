import { CSSProperties, FormEvent, useState } from "react";

import formEventsArgs from "../../util/formEventsArgs";
import { useKeyboard } from "../../keyboard/hook/useKeyboard";

type pushEventsType =
  | React.MouseEvent
  | KeyboardEvent
  | React.TouchEvent
  | FormEvent<Element>;

type pushEvPropListType = ({
  ev,
  keys,
}: {
  ev: pushEventsType;
  keys?: "option" | "ctrl" | "meta";
}) => void;

type usePushType = {
  title?: string;
  hoverTitle?: string;
  onPush?: pushEvPropListType;
  onDoublePush?: pushEvPropListType;
  onPushStarts?: pushEvPropListType;
  onPushFinishes?: pushEvPropListType;
  isntSemanticPushableElem?: boolean;
  isDisabled?: boolean;
  bubble?: boolean;
};

export type { usePushType, pushEventsType };

const usePush = (props: usePushType) => {
  const {
    title,
    hoverTitle,
    onPush,
    onDoublePush,
    onPushStarts,
    onPushFinishes,
    isntSemanticPushableElem,
    isDisabled,
    bubble,
  } = props;
  const [isPushed, setIsPushed] = useState(false);

  function push(ev: pushEventsType) {
    if (!bubble) ev.stopPropagation();
    const args = formEventsArgs(ev);
    onDoublePush?.(args);
    onPush?.(args);
  }

  function handlePushStarts(ev: React.MouseEvent) {
    setIsPushed(true);
    onPushStarts?.(formEventsArgs(ev));
  }
  function handlePushFinishes(ev: React.MouseEvent) {
    setIsPushed(false);
    onPushFinishes?.(formEventsArgs(ev));
  }

  const { keyboardPropList } = useKeyboard({
    Space: push,
  });

  const pushPropList = {
    disabled: isDisabled,
    title: hoverTitle,
    onPointerDown: handlePushStarts,
    onPointerUp: handlePushFinishes,
    onClick: push,
    onDoubleClick: push,
    ...keyboardPropList,
    ...(isntSemanticPushableElem && {
      role: "button" as const,
      tabIndex: 0,
      style: { cursor: "pointer" } as CSSProperties,
    }),
  };
  return { isPushed, name: title, pushPropList };
};

export { usePush };
