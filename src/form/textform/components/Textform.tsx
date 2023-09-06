import { stylesType } from "../../../util/stylesType";
import { focusingOnTextform } from "../../util/focusingOnTextform";
import { useTextform, useTextformType } from "../hook/useTextform";

export type TextformType = stylesType<{
  isHovered?: boolean;
  isFocused?: boolean;
  isDisabled?: boolean;
  isValid?: boolean;
}> &
  useTextformType;

const Textform = (props: TextformType) => {
  const { style, classStyle } = props;
  const { textformPropList, isFocused, isHovered } = useTextform(props);

  return (
    <div
      style={{ ...style, cursor: "text" }}
      className={
        typeof classStyle != "function"
          ? classStyle
          : classStyle?.({ isHovered, isFocused })
      }
    >
      <input
        {...textformPropList}
        style={{
          width: "100%",
          border: "none",
          outline: "none",
          background: "none",
        }}
      />
    </div>
  );
};

export { Textform };
