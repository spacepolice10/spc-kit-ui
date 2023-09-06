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
  onShowCallback?: () => void;
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
    setIsShow(true);
    detectPosition();
  };
  function detectPosition() {
    const offsetNumber = props?.offset ?? 0;
    if (!triggerRef.current) return;
    if (!window) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const dimensions = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    const elemIsOnTopHalf = triggerRect.y < dimensions.height / 2;
    const elemIsOnLeftHalf = triggerRect.x <= dimensions.width / 2;

    let left = "auto" as number | "auto";
    let right = "auto" as number | "auto";
    let top = "auto" as number | "auto";
    let bottom = "auto" as number | "auto";

    switch (props?.position) {
      case "b": {
        top = triggerRect.height + offsetNumber;
        break;
      }
      case "t": {
        bottom = triggerRect.height + triggerRect.height + offsetNumber;
        break;
      }
      case "l": {
        left = -(triggerRect.width * 2 + offsetNumber);
        top = 0;
        break;
      }
      case "r": {
        left = triggerRect.width + offsetNumber;
        top = 0;
        break;
      }
      default: {
        elemIsOnLeftHalf ? (left = offsetNumber) : (right = offsetNumber);
        elemIsOnTopHalf
          ? (top = triggerRect.height + offsetNumber)
          : (bottom = triggerRect.height + triggerRect.height + offsetNumber);
      }
    }
    setStyle({
      position: "absolute",
      opacity: "0%",
    });
    setTimeout(() => {
      setStyle({
        position: "absolute",
        opacity: "100%",
        left,
        right,
        top,
        bottom,
      });
    });
  }

  const hide = () => {
    setStyle({});
    focusTrapsOnTrigger();
    props?.onHideCallback?.();
    setIsShow(false);
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
