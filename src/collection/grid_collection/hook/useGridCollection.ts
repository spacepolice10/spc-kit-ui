import { useFocusScope } from "../../../interactions/focus_scope/hook/useFocusScope";
import { useKeyboard } from "../../../interactions/keyboard/hook/useKeyboard";

export type useGridCollectionType = {
  columnNumber: number;
  isInverted?: boolean;
};

const useGridCollection = (props: useGridCollectionType) => {
  const { columnNumber } = props;
  const {
    focusScopeRef,
    focusPrevElem,
    focusNextElem,
    focusNextElemGrid,
    focusPrevElemGrid,
  } = useFocusScope();

  const { keyboardPropList } = useKeyboard({
    ArrowLeft: focusPrevElem,
    ArrowUp: () => focusPrevElemGrid(columnNumber),
    ArrowRight: focusNextElem,
    ArrowDown: () => focusNextElemGrid(columnNumber),
  });

  const gridCollectionPropList = {
    ref: focusScopeRef,
    ...keyboardPropList,
    style: {
      display: "grid",
      gridTemplateColumns: `repeat(${columnNumber}, minmax(0, 1fr))`,
    },
  };
  return {
    gridCollectionPropList,
  };
};

export { useGridCollection };
