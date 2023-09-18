import { ReactNode } from "react";
import { stylesType } from "../../../util/stylesType";
import { useCheckbox } from "../hook/useCheckbox";
import { useToggleType } from "../../util/useToggle";

export type CheckboxType = useToggleType &
  stylesType<{ isToggle: boolean }> & {
    id: string;
    children: (isToggle: boolean) => ReactNode;
  };

const Checkbox = (props: CheckboxType) => {
  const { children, id, style, className } = props || {};
  const { isHovered, isFocused, isToggle, checkboxPropList } = useCheckbox({
    id,
  });
  return (
    <>
      <button
        {...checkboxPropList}
        style={style}
        className={
          typeof className != "function"
            ? className
            : className?.({ isToggle, isHovered, isFocused })
        }
      >
        {children?.(isToggle)}
      </button>
      <input type="checkbox" style={{ display: "none" }} />
    </>
  );
};
export { Checkbox };
