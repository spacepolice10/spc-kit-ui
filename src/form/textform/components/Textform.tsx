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
  const { className } = props;
  const { textformPropList, isFocused, isHovered, isValid } =
    useTextform(props);
  return (
    <input
      {...textformPropList}
      className={
        typeof className != "function"
          ? className
          : className?.({ isHovered, isFocused, isValid })
      }
      style={{
        width: "100%",
        outline: "none",
      }}
    />
  );
};

export { Textform };
