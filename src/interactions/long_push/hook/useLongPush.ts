import { useRef, useState } from "react";

import formEventsArgs from "../../util/formEventsArgs";
import { usePush, usePushType } from "../../push/hook/usePush";

export type useLongPushType = usePushType & {
  delay?: number;
};

const useLongPush = (props: useLongPushType) => {
  const { onPush, delay } = props;
  const { pushPropList } = usePush(props);
  const [isLongPushed, setIsLongPushed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | number>(0);
  function hold(ev: React.MouseEvent | React.KeyboardEvent) {
    ev.stopPropagation();
    setIsLongPushed(true);
    if (ev.type == "keydown") {
      const customEv = ev as unknown as KeyboardEvent;
      if (!["Enter", "Space"].includes(customEv.key)) {
        return;
      }
    }
    timerRef.current = setTimeout(() => {
      onPush?.(formEventsArgs(ev));
    }, delay ?? 0);
  }
  function release() {
    setIsLongPushed(false);
    clearTimeout(timerRef.current);
  }
  function overrideClicks(ev: React.MouseEvent | KeyboardEvent) {
    ev.preventDefault();
  }

  const longPushPropList = {
    ...pushPropList,
    onClick: overrideClicks,
    onDoubleClick: overrideClicks,
    onMouseDown: hold,
    onMouseUp: release,
    onTouchStart: release,
    onTouchEnd: release,
    onKeyDown: hold,
    onKeyUp: release,
  };
  return {
    isLongPushed,
    longPushPropList,
  };
};

export { useLongPush };
