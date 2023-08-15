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
    onChange?.(isToggle);
  }, [isToggle, onChange]);
  useEffect(() => {
    if (!initIsToggle) return;
    setIsToggle(initIsToggle);
  }, [initIsToggle]);
  useEffect(() => {
    if (!props?.isToggle) return;
    setIsToggle(props?.isToggle);
  }, [props?.isToggle]);
  return { isToggle, toggle: () => setIsToggle(!isToggle) };
};

export { useToggle };
