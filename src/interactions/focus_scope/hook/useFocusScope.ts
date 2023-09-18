import { useRef } from "react";

const useFocusScope = () => {
  const focussableElements =
    'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
  const focusScopeRef = useRef<HTMLDivElement | null>(null);

  function detectFocussable() {
    if (!document.activeElement) return;
    const focussable = Array.prototype.filter.call(
      focusScopeRef?.current?.querySelectorAll(focussableElements),
      function (element) {
        return element.offsetWidth > 0 || element == document.activeElement;
      }
    );
    return focussable;
  }
  function detectPosition() {
    const focussable = detectFocussable();
    const index = focussable?.indexOf(document.activeElement);
    if ((index ?? 0) <= -1) return;
    return index;
  }
  function focusElem(position: number) {
    const focussable = detectFocussable();
    if (!focussable) return;
    const elem = focussable?.[position]
      ? focussable?.[position]
      : position <= 0
      ? focussable?.[focussable.length - 1]
      : focussable?.[0];

    elem?.focus();
  }
  function focusNextElem() {
    if (document.activeElement == focusScopeRef.current) {
      focusFirstElem();
      return;
    }
    const position = detectPosition();
    focusElem((position ?? 0) + 1);
  }
  function focusPrevElem() {
    if (document.activeElement == focusScopeRef.current) {
      focusLastElem();
      return;
    }
    const position = detectPosition();
    focusElem((position ?? 0) - 1);
  }
  // amount of columns in grid helps to determine vertical position
  function focusPrevElemGrid(cols: number) {
    const position = detectPosition();
    focusElem((position ?? 0) - cols);
  }
  function focusNextElemGrid(cols: number) {
    const position = detectPosition();
    focusElem((position ?? 0) + cols);
  }
  function focusFirstElem() {
    const position = 0;
    focusElem(position);
  }
  function focusLastElem() {
    const focussable = detectFocussable();
    focusElem(focussable?.length ? focussable?.length - 1 : 0);
  }

  const focusScopePropList = {
    ref: focusScopeRef,
  };

  return {
    focusNextElem,
    focusPrevElem,
    focusFirstElem,
    focusLastElem,
    focusPrevElemGrid,
    focusNextElemGrid,
    focusScopePropList,
    focusScopeRef,
  };
};

export { useFocusScope };
