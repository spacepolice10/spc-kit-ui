import { stylesType } from "../../../util/stylesType";
import { useTextform, useTextformType } from "../hook/useTextform";

export type TextformType = stylesType<{
  isHovered: boolean;
  isFocused: boolean;
}> &
  useTextformType;

export function focusingOnTextform(ev: React.MouseEvent) {
  const target = ev.currentTarget.firstChild as HTMLInputElement;
  target?.focus();
}

const Textform = (props: TextformType) => {
  const { style, classStyle } = props;
  const { textformPropList, isFocused, isHovered } = useTextform(props);

  return (
    <div
      style={{ ...style, cursor: "text" }}
      onClick={focusingOnTextform}
      className={
        typeof classStyle != "function"
          ? classStyle
          : classStyle?.({ isHovered, isFocused })
      }
    >
      <input
        style={{
          width: "100%",
          border: "none",
          outline: "none",
          background: "none",
        }}
        {...textformPropList}
      />
    </div>
  );
};

export { Textform };
