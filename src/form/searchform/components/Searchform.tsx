import { Children, ReactNode, useContext } from "react";
import { TextformType } from "../../textform/components/Textform";
import { useHover } from "../../../interactions/hover/hook/useHover";
import { useFocus } from "../../../interactions/focus/hook/useFocus";
import { stylesType } from "../../../util/stylesType";
import {
  SearchFormCtxt,
  useSearchForm,
  useSearchFormType,
} from "../hook/useSearchForm";

export type SearchType<T> = TextformType &
  useSearchFormType<T> & {
    children: ReactNode[];
  };

const Search = <T extends { id: string; name: string }>(
  props: SearchType<T>
) => {
  const { isShow, ...searchPropList } = useSearchForm(props);
  const [form, body] = Children.toArray(props?.children);
  return (
    <div style={{ position: "relative" }}>
      <SearchFormCtxt.Provider value={searchPropList}>
        {form}
        {isShow && body}
      </SearchFormCtxt.Provider>
    </div>
  );
};

const Form = (props: stylesType) => {
  const { className } = props;
  const { searchFormPropList } = useContext(SearchFormCtxt);
  const { isHovered, hoverPropList } = useHover();
  const { isFocused, focusPropList } = useFocus();

  return (
    <div
      style={{ cursor: "text", position: "relative" }}
      // onClick={focusingOnTextform}

      className={
        typeof className != "function"
          ? className
          : className?.({ isHovered, isFocused })
      }
      {...hoverPropList}
    >
      <input
        {...searchFormPropList}
        {...focusPropList}
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

function Body<T>(
  props: {
    children: ({
      items,
      removeText,
      selectedId,
    }: {
      items: T[];
      removeText: () => void;
      selectedId: string;
    }) => ReactNode;
  } & stylesType
) {
  const { children, className } = props;
  const { searchResultPropList, filteredData, removeText, selectedId } =
    useContext(SearchFormCtxt);
  const items = filteredData as T[];
  return (
    <>
      <div className={className as string} {...searchResultPropList}>
        {children?.({
          items,
          removeText,
          selectedId: selectedId ?? "",
        })}
      </div>
    </>
  );
}

export { Search, Form, Body };
