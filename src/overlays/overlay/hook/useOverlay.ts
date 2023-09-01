import {
  createContext,
  CSSProperties,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { useKeyboard } from "../../../interactions/keyboard/hook/useKeyboard";

export type useOverlayType = {
  isShow?: boolean;
  initIsShow?: boolean;
  hideOnBackdropPush?: boolean;
  focusingElem?: RefObject<HTMLButtonElement>;
  onHideCallback?: () => void;
  onShowCallback?: () => void;
};

export const OverlayContext = createContext({} as { onClick: () => void });

const useOverlay = (props?: useOverlayType) => {
  const {
    isShow,
    initIsShow,
    hideOnBackdropPush,
    focusingElem,
    onShowCallback,
    onHideCallback,
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
    onShowCallback?.();
  }
  function hide() {
    setUncontrolledIsShow(false);
    onHideCallback?.();
  }

  const overlayBackgroundPropList = {
    style: {
      padding: 0,
      zIndex: 20000,
      position: "absolute",
      inset: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100dvh",
    } as CSSProperties,
    ref: overlayRef,
    onClick: () => hideOnBackdropPush && hide(),
    ...keyboardPropList,
  };

  const overlayPropList = {
    onClick: (ev: React.MouseEvent) => ev.stopPropagation(),
  };

  const overlayTriggerPropList = {
    onClick: () => (isShow ? hide() : show()),
  };

  return {
    isShow: isShow ?? uncontrolledIsShow,
    show,
    hide,
    overlayTriggerPropList,
    overlayBackgroundPropList,
    overlayPropList,
  };
};

export { useOverlay };
