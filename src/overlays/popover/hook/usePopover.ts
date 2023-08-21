import { CSSProperties, useEffect, useRef, useState } from "react";
import { useKeyboard } from "../../../interactions/keyboard/hook/useKeyboard";

export type usePopoverType = {
  focusTrapsOnTrigger?: boolean;
  focusTrapsOnPopover?: boolean;
  position?: "b" | "t" | "l" | "r";
  offset?: number;
  onHideCallback?: () => void;
  onHideClassnames?: string;
};

const usePopover = (props?: usePopoverType) => {
  const [isShow, setIsShow] = useState(false);
  const [style, setStyle] = useState({});
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!props?.focusTrapsOnPopover || !isShow) return;
    const focusElem = popoverRef.current?.firstChild as HTMLButtonElement;
    if (!focusElem) return;
    focusElem?.focus();
  }, [props?.focusTrapsOnPopover, isShow]);
  useEffect(() => {
    if (!props?.focusTrapsOnTrigger || isShow) return;
    console.log("you!");
    triggerRef.current?.focus();
  }, [props?.focusTrapsOnTrigger, isShow]);
  const show = () => {
    if (!triggerRef.current) return;
    if (!window) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const dimensions = { width: window.innerWidth, height: window.innerHeight };
    const elemIsOnTopHalf = triggerRect.y < dimensions.height / 2;
    const elemIsOnLeftHalf = triggerRect.x <= dimensions.width / 2;
    setIsShow(true);
    setStyle({
      position: "absolute",
      opacity: "0%",
    });
    setTimeout(() => {
      const popoverWidth =
        popoverRef.current?.getBoundingClientRect().width ?? 0;
      setStyle({
        position: "absolute",
        opacity: "100%",
        ...(elemIsOnLeftHalf
          ? { left: 0 }
          : { left: triggerRect.left - (popoverWidth - triggerRect.width) }),
        ...(elemIsOnTopHalf
          ? { top: triggerRect.height }
          : { bottom: triggerRect.height + triggerRect.height }),
      });
    });
  };
  const hide = () => {
    setStyle({});
    props?.onHideCallback?.();
    if (props?.onHideClassnames && popoverRef.current) {
      popoverRef.current.className = props.onHideClassnames;
    } else {
      setIsShow(false);
    }
  };

  const { keyboardPropList } = useKeyboard({
    Escape: () => hide(),
  });

  const wrapperPropList = {
    style: {
      position: "relative",
      display: "block",
      width: "fit-content",
      height: "fit-content",
    } as CSSProperties,
  };

  const popoverPropList = {
    ref: popoverRef,
    style,
    ...keyboardPropList,
  };

  return {
    wrapperPropList,
    popoverPropList,
    triggerRef,
    isShow,
    show,
    hide,
  };
};

export { usePopover };
