import { useState } from "react";

export type useHoverType = {
  onHover?: () => void;
  onHoverLoose?: () => void;
};

const useHover = (props?: useHoverType) => {
  const { onHover, onHoverLoose } = props ?? {};
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
