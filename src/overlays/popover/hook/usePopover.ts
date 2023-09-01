import {
  createContext,
  CSSProperties,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useKeyboard } from "../../../interactions/keyboard/hook/useKeyboard";

export type usePopoverType = {
  focusTrapsOnTrigger?: boolean;
  focusTrapsOnPopover?: boolean;
  position?: "b" | "t" | "l" | "r";
  offset?: number;
  onHideCallback?: () => void;
  onHideClassnames?: string;
};

export const PopoverContext = createContext({} as { onClick: () => void });

const usePopover = <T extends HTMLElement>(props?: usePopoverType) => {
  const [isShow, setIsShow] = useState(false);
  const [style, setStyle] = useState<CSSProperties>({});
  const triggerRef = useRef<T | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!props?.focusTrapsOnPopover || !isShow) return;
    const focusElem = popoverRef.current as unknown as HTMLButtonElement;
    if (!focusElem) return;
    focusElem?.focus();
  }, [isShow]);

  function focusTrapsOnTrigger() {
    if (!props?.focusTrapsOnTrigger) return;
    triggerRef.current?.focus({ preventScroll: true });
  }

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
      setStyle({
        position: "absolute",
        opacity: "100%",
        ...(elemIsOnLeftHalf ? { left: 0 } : { right: 0 }),
        ...(elemIsOnTopHalf
          ? { top: triggerRect.height }
          : { bottom: triggerRect.height + triggerRect.height }),
      });
    });
  };
  const hide = () => {
    setStyle({});
    focusTrapsOnTrigger();
    props?.onHideCallback?.();
    if (props?.onHideClassnames && popoverRef.current) {
      popoverRef.current.className = props.onHideClassnames;
    } else {
      setIsShow(false);
    }
  };

  const { keyboardPropList } = useKeyboard({
    Escape: (ev: KeyboardEvent | FormEvent) => {
      ev.preventDefault();
      hide();
    },
  });

  const wrapperPropList = {
    style: {
      position: "static",
      display: "block",
      width: "fit-content",
      height: "fit-content",
    } as CSSProperties,
    ...keyboardPropList,
  };

  const popoverPropList = {
    ref: popoverRef,
    style,
    ...keyboardPropList,
  };

  const popoverTriggerPropList = {
    ref: triggerRef,
    onClick: () => (isShow ? hide() : show()),
  };

  return {
    wrapperPropList,
    popoverPropList,
    popoverTriggerPropList,
    triggerRef,
    isShow,
    show,
    hide,
    isInverted: !!style.bottom,
  };
};

export { usePopover };
