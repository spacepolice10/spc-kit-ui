import { CSSProperties, useState } from "react";
import { pushEventsType, usePushType } from "../usePush";
import { useKeyboard } from "../../../keyboard/hook/useKeyboard";
import formEventsArgs from "../../../util/formEventsArgs";

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
    ...keyboardPropList,
    ...(isntSemanticPushableElem && {
      role: "button" as const,
      tabIndex: 0,
      style: { cursor: "pointer" } as CSSProperties,
    }),
    onPointerDown: handlePushStarts,
    onPointerUp: handlePushFinishes,
    onClick: push,
    onDoubleClick: push,
  };
  return { isPushed, name: title, pushPropList };
};

export { usePush };
