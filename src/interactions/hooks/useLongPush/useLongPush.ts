import { useRef, useState } from "react";
import { useLongPushType } from "./useLongPushType";
import { usePush } from "../usePush/usePush";
import formEventsArgs from "../../util/formEventsArgs";

const useLongPush = (props: useLongPushType) => {
  const { onPush, delay } = props;
  const { pushPropList } = usePush(props);
  const [isLongPushed, setIsLongPushed] = useState(false);
  const timerRef = useRef<number>(0);
  function hold(ev: React.MouseEvent | React.KeyboardEvent) {
    ev.preventDefault();
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
    return;
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
