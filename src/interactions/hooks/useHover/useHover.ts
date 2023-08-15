import { useState } from "react";
import { useHoverType } from "./useHoverType";

const useHover = (props?: useHoverType) => {
  const { onHover, onHoverLoose } = props || {};
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const hoverPropList = {
    onMouseEnter: () => {
      if (matchMedia("(pointer:coarse)").matches) return;
      setIsHovered(true);
      onHover?.();
    },
    onMouseLeave: () => {
      setIsHovered(false);
      onHoverLoose?.();
    },
  };
  return {
    isHovered,
    hoverPropList,
  };
};

export { useHover };
