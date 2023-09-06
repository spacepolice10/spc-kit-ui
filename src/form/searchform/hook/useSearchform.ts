import {
  createContext,
  CSSProperties,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTextform, useTextformType } from "../../textform/hook/useTextform";
import useDebounce from "../../util/useDebounce";
import { useCollection } from "../../../collection/collection/hook/useCollection";
import { usePopover } from "../../../overlays/popover/hook/usePopover";
import { useKeyboard } from "../../../interactions/keyboard/hook/useKeyboard";

export type useSearchFormType<T> = useTextformType & {
  data: T[];
  val?: string;
  filter?: (query: string) => void;
  delay?: number;
  onKeyboardSelect: (selectedElemId: string) => void;
  onInput?: (text: string) => void;
  withRelativePosition?: boolean;
  alwaysShowResult?: boolean;
};

export const SearchFormCtxt = createContext(
  {} as {
    searchFormPropList: object;
    searchResultPropList: object;
    filteredData?: object[];
    removeText: () => void;
    selectedId?: string;
  }
);

const useSearchForm = <T extends { id: string; name: string }>(
  props: useSearchFormType<T>
) => {
  const {
    data,
    val,
    filter,
    delay,
    onKeyboardSelect,
    onInput,
    withRelativePosition,
    alwaysShowResult,
  } = props;
  const [controlledText, setControlledText] = useState("");

  const debounceText = useDebounce(val ?? controlledText, delay ?? 0);
  const { textformPropList, value } = useTextform({
    val,
    onInput: onInput ?? setControlledText,
    onFocusLoose: () => hide(),
    ...props,
  });

  const filteredData = useMemo(() => {
    if (!debounceText) return [];
    const filtered =
      filter?.(debounceText) ??
      data?.filter((item) =>
        item.name.toUpperCase().includes(debounceText.toUpperCase())
      );
    return filtered;
  }, [debounceText, data]);
  function removeText() {
    setControlledText("");
  }
  const { triggerRef, isShow, show, hide, popoverPropList, isInverted } =
    usePopover<HTMLInputElement>();
  const {
    items: collectionData,
    selectedId,
    collectionPropList,
  } = useCollection({
    items: filteredData,
    controlled: true,
    isInverted,
  });

  const { keyboardPropList: searchFormKeyboardPropList } = useKeyboard({
    Enter: (ev) => {
      ev.preventDefault();
      onKeyboardSelect?.(selectedId);
    },
  });

  const searchFormPropList = {
    ...textformPropList,
    ref: triggerRef,
    onKeyDown: (ev: React.KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown"].includes(ev.key)) {
        ev.preventDefault();
      }
      collectionPropList.onKeyDown(ev);
      searchFormKeyboardPropList.onKeyDown(ev);
    },
    value,
  };
  useEffect(() => {
    if (!debounceText) hide();
    show();
  }, [debounceText]);

  const searchResultPropList = {
    ...popoverPropList,
    ...(withRelativePosition && {
      style: { position: "relative" } as CSSProperties,
    }),
  };

  return {
    searchFormPropList,
    searchResultPropList,
    isShow: alwaysShowResult ? true : isShow,
    filteredData: collectionData,
    selectedId,
    removeText,
  };
};

export { useSearchForm };
