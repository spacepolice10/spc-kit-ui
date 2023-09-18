import {
  createContext,
  CSSProperties,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useKeyboard } from "../../../interactions/keyboard/hook/useKeyboard";

export type useOverlayType = {
  isShow?: boolean;
  initIsShow?: boolean;
  hideOnBackdropPush?: boolean;
  focusingElem?: RefObject<HTMLButtonElement>;
  onHide?: () => void;
  onShow?: () => void;
};

export const OverlayContext = createContext(
  {} as {
    isShow?: boolean;
    hideOnBackdropPush?: boolean;
    show: () => void;
    hide: () => void;
  }
);

const useOverlay = (props?: useOverlayType) => {
  const {
    isShow,
    initIsShow,
    hideOnBackdropPush,
    focusingElem,
    onShow,
    onHide,
  } = props ?? {};
  const [uncontrolledIsShow, setUncontrolledIsShow] = useState(initIsShow);

  const overlayRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (focusingElem) {
      focusingElem?.current?.focus();
    } else {
      overlayRef.current?.focus();
    }
  });

  const { keyboardPropList } = useKeyboard({
    Escape: () => hide(),
  });
  function show() {
    setUncontrolledIsShow(true);
    onShow?.();
  }
  function hide() {
    setUncontrolledIsShow(false);
    onHide?.();
  }
  useEffect(() => {
    if (!isShow) return;
    const html = document.querySelector("html");
    if (!html) return;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = "auto";
    };
  }, [isShow]);

  const overlayBackgroundPropList = {
    style: {
      padding: 0,
      inset: 0,
      width: "100%",
      height: "100dvh",
    } as CSSProperties,
    ref: overlayRef,
    onClick: (ev: React.MouseEvent) => {
      if (ev.target != ev.currentTarget) return;
      hideOnBackdropPush && hide();
    },
    ...keyboardPropList,
  };

  const memoized = useMemo(
    () => ({
      overlayTriggerCallback: () => (isShow ? hide() : show()),
      hide,
      show,
      hideOnBackdropPush,
    }),
    []
  );

  return {
    isShow: isShow ?? uncontrolledIsShow,
    overlayBackgroundPropList,
    ...memoized,
  };
};

export { useOverlay };
