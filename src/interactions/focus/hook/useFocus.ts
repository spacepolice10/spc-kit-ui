import { useState } from "react";

export type useFocusType = {
  onFocus?: () => void;
  onFocusLoose?: () => void;
};

const useFocus = (props?: useFocusType) => {
  const { onFocus, onFocusLoose } = props ?? {};
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const focusPropList = {
    tabIndex: 0,
    onFocus: () => {
      setIsFocused(true);
      onFocus?.();
    },
    onBlur: () => {
      setIsFocused(false);
      onFocusLoose?.();
    },
  };
  return {
    isFocused,
    focusPropList,
  };
};

export { useFocus };
