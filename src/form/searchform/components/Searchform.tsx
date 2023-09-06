import { ReactNode } from "react";
import { TextformType } from "../../textform/components/Textform";
import { useSearchform, useSearchformType } from "../hook/useSearchform";
import { focusingOnTextform } from "../../util/focusingOnTextform";

export type SearchformType<T> = TextformType &
  useSearchformType<T> & {
    children: ({
      items,
      isValid,
      remove,
      selectedId,
    }: {
      items: T[];
      isValid?: boolean;
      remove?: () => void;
      selectedId: string;
    }) => ReactNode;
  };

const Searchform = <T extends { id: string; name: string }>(
  props: SearchformType<T>
) => {
  const { style, classStyle, children } = props;
  const {
    filteredData,
    searchformPropList,
    searchResultPropList,
    removeText,
    isHovered,
    isFocused,
    selectedId,
    isShow,
  } = useSearchform(props);

  return (
    <div
      style={{ ...style, cursor: "text", position: "relative" }}
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
      {isShow && (
        <div {...searchResultPropList}>
          {children?.({
            items: filteredData ?? [],
            remove: removeText,
            selectedId,
          })}
        </div>
      )}
    </div>
  );
};
export { Searchform };
