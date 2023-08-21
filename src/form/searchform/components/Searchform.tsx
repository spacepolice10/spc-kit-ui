import { ReactNode } from "react";
import { stylesType } from "../../../util/stylesType";
import {
  focusingOnTextform,
  TextformType,
} from "../../textform/components/Textform";
import { useSearchform, useSearchformType } from "../hook/useSearchform";

export type SearchformType<T> = stylesType<{
  isHovered: boolean;
  isFocused: boolean;
}> &
  TextformType &
  useSearchformType<T> & {
    children: ({
      items,
      remove,
    }: {
      items: T[];
      remove: () => void;
    }) => ReactNode;
  };

const Searchform = <T extends { id: string; name: string }>(
  props: SearchformType<T>
) => {
  const { style, classStyle, children } = props;
  const { filteredData, searchformPropList, removeText, isHovered, isFocused } =
    useSearchform(props);

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
        {...searchformPropList}
        style={{
          width: "100%",
          border: "none",
          outline: "none",
          background: "none",
        }}
      />

      {children?.({ items: filteredData, remove: removeText })}
    </div>
  );
};
export { Searchform };
