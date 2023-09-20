import {
  createContext,
  CSSProperties,
  MutableRefObject,
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
  isScrollBlocking?: boolean;
  onHide?: () => void;
  onShow?: () => void;
  focusingElemOnShow?: RefObject<HTMLButtonElement>;
  focusingElemOnHide?: RefObject<HTMLButtonElement>;
};

export const OverlayContext = createContext(
  {} as {
    triggerRef: MutableRefObject<HTMLButtonElement | null>;
    overlayRef: MutableRefObject<HTMLDivElement | null>;
    show: () => void;
    hide: () => void;
  }
);

const useOverlay = (props?: useOverlayType) => {
  const {
    hideOnBackdropPush,
    onShow,
    onHide,
    isScrollBlocking,
    focusingElemOnHide,
    focusingElemOnShow,
  } = props ?? {};

  const [uncontrolledIsShow, setUncontrolledIsShow] = useState(
    props?.initIsShow
  );
  const isShow = props?.isShow ?? uncontrolledIsShow;

  const overlayRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const { keyboardPropList } = useKeyboard({
    Escape: () => hide(),
  });
  function show() {
    setUncontrolledIsShow(true);
    onShow?.();
  }
  function hide() {
    if (!focusingElemOnHide?.current) {
      triggerRef.current?.focus({ preventScroll: true });
    } else {
      focusingElemOnHide.current?.focus({ preventScroll: true });
    }
    setUncontrolledIsShow(false);
    onHide?.();
  }

  useEffect(() => {
    if (!isShow) return;
    if (focusingElemOnShow) {
      focusingElemOnShow?.current?.focus();
    } else {
      overlayRef.current?.focus();
    }
  }, [isShow]);
  useEffect(() => {
    if (!isShow || !isScrollBlocking) return;
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
    onClick: (ev: React.MouseEvent) => {
      if (ev.target != ev.currentTarget) return;
      hideOnBackdropPush && hide();
    },
    ...keyboardPropList,
  };

  const memoized = useMemo(
    () => ({
      hide,
      show,
      triggerRef: focusingElemOnHide ?? triggerRef,
      overlayRef,
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
