import { useEffect, useState } from "react";

export type useToggleType = {
  isToggle?: boolean;
  initIsToggle?: boolean;
  onChange?: (isToggle: boolean) => void;
};

const useToggle = (props?: useToggleType) => {
  const { initIsToggle, onChange } = props || {};
  const [isToggle, setIsToggle] = useState(false);

  useEffect(() => {
    if (!initIsToggle) return;
    setIsToggle(initIsToggle);
  }, [initIsToggle]);
  function toggle() {
    onChange?.(!props?.isToggle);
    !props?.isToggle && setIsToggle((state) => !state);
  }

  return { isToggle: props?.isToggle ?? isToggle, toggle };
};

export { useToggle };
