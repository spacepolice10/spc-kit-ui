import { ReactNode } from "react";
import { stylesType } from "../../../util/stylesType";
import { useNumberform, useNumberformType } from "../hook/useNumberform";
import { focusingOnTextform } from "../../util/focusingOnTextform";

export type NumberformType = stylesType<{
  isHovered: boolean;
  isFocused: boolean;
}> &
  useNumberformType & {
    children: ({
      increm,
      decrem,
    }: {
      increm: () => void;
      decrem: () => void;
    }) => ReactNode;
  };

const Numberform = (props: NumberformType) => {
  const { style, classStyle, children } = props;
  const { increm, decrem, numberformPropList, isHovered, isFocused } =
    useNumberform(props);
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
        {...numberformPropList}
      />
      {children?.({ increm, decrem })}
    </div>
  );
};

export { Numberform };
