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
  const { children, id, style, classStyle } = props || {};
  const { isHovered, isFocused, isToggle, checkboxPropList } = useCheckbox({
    id,
  });
  return (
    <>
      <button
        {...checkboxPropList}
        style={style}
        className={
          typeof classStyle != "function"
            ? classStyle
            : classStyle?.({ isToggle, isHovered, isFocused })
        }
      >
        {children?.(isToggle)}
      </button>
      <input type="checkbox" style={{ display: "none" }} />
    </>
  );
};
export { Checkbox };
