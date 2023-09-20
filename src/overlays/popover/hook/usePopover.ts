import {
  createContext,
  CSSProperties,
  FormEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { useKeyboard } from "../../../interactions/keyboard/hook/useKeyboard";

export type usePopoverType = {
  position?: "b" | "t" | "l" | "r";
  offset?: number;
  onHide?: () => void;
  onShow?: () => void;
};

export const PopoverContext = createContext(
  {} as {
    isShow: boolean;
    triggerRef: MutableRefObject<HTMLElement | null>;
    show: () => void;
    hide: () => void;
  }
);

const usePopover = <T extends HTMLElement>(props?: usePopoverType) => {
  const [isShow, setIsShow] = useState(false);
  const [style, setStyle] = useState<CSSProperties>({});
  const triggerRef = useRef<T | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isShow) return;
    const focusElem = popoverRef.current as unknown as HTMLButtonElement;
    if (!focusElem) return;
    focusElem?.focus({ preventScroll: true });
  }, [isShow]);

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

    function basePosition() {
      elemIsOnLeftHalf ? (left = offsetNumber) : (right = offsetNumber);
      elemIsOnTopHalf
        ? (top = triggerRect.height + offsetNumber)
        : (bottom = triggerRect.height + offsetNumber);
    }
    basePosition();

    switch (props?.position) {
      case "l": {
        left = -(triggerRect.width * 2 + offsetNumber);
        top = 0;
        break;
      }
      case "r": {
        left = triggerRect.width + offsetNumber;
        break;
      }
      case "b": {
        top = triggerRect.height + offsetNumber;
        break;
      }
      case "t": {
        bottom = triggerRect.height + triggerRect.height + offsetNumber;
        break;
      }
      default:
        basePosition();
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
    triggerRef.current?.focus({ preventScroll: true });
    props?.onHide?.();
    setIsShow(false);
  };
  const { keyboardPropList } = useKeyboard({
    Escape: (ev: KeyboardEvent | FormEvent) => {
      ev.preventDefault();
      hide();
    },
  });

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
    popoverPropList,
    popoverTriggerPropList,
    triggerRef,
    isShow,
    show,
    hide,
    isInverted: !!style.bottom && style.bottom != "auto",
  };
};

export { usePopover };
