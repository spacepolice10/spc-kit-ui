import { ReactNode } from "react";
import { stylesType } from "../../../util/stylesType";

import { useRadio, useRadioType } from "../hook/useRadio";

export type RadioType = useRadioType &
  stylesType<{ isSelected: boolean }> & {
    id: string;
    children: (isSelected: boolean) => ReactNode;
  };

const Radio = (props: RadioType) => {
  const { children, style, classStyle } = props;
  const { isSelected, radioPropList, isHovered, isFocused } = useRadio(props);
  return (
    <button
      style={style}
      className={
        typeof classStyle != "function"
          ? classStyle
          : classStyle?.({ isHovered, isFocused, isSelected })
      }
      {...radioPropList}
    >
      {children?.(isSelected)}
    </button>
  );
};

export { Radio };
