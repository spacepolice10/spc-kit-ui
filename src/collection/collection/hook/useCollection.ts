import { FormEvent, useEffect, useState } from "react";
import { useFocusScope } from "../../../interactions/focus_scope/hook/useFocusScope";
import { useKeyboard } from "../../../interactions/keyboard/hook/useKeyboard";

export type useCollectionType<T> = {
  items?: T[];
  focusTraps?: boolean;
  controlled?: boolean;
  isHorizontal?: boolean;
};

const useCollection = <T extends { id: string }>(
  props?: useCollectionType<T>
) => {
  const { items, controlled } = props || {};
  const [selectedId, setSelectedId] = useState("");

  const { focusNextElem, focusPrevElem, focusScopeRef } = useFocusScope();
  const [isHorizontal, setIsHorizontal] = useState(false);

  function resetSelectedId() {
    setSelectedId("");
  }
  useEffect(() => {
    setIsHorizontal(
      props?.isHorizontal ??
        (focusScopeRef.current?.style.display == "flex" &&
          focusScopeRef.current?.style.flexDirection != "column")
    );
  }, [focusScopeRef, props?.isHorizontal]);

  function setSelectedIdPrev(ev: KeyboardEvent | FormEvent) {
    if (!controlled) {
      ev.preventDefault();
      focusPrevElem();
    } else {
      if (!items?.length) return;
      const item = items.findIndex((x) => x?.id == selectedId) - 1;
      if (item < 0) return;
      setSelectedId(items[item]?.id);
    }
  }
  function setSelectedIdNext(ev: KeyboardEvent | FormEvent) {
    if (!controlled) {
      ev.preventDefault();
      focusNextElem();
    } else {
      if (!items?.length) return;
      const item = items.findIndex((x) => x?.id == selectedId) + 1;
      if (item > items.length - 1) return;
      setSelectedId(items[item]?.id);
    }
  }

  const { keyboardPropList } = useKeyboard({
    ...(isHorizontal
      ? {
          ArrowLeft: setSelectedIdPrev,
          ArrowRight: setSelectedIdNext,
        }
      : {
          ArrowUp: setSelectedIdPrev,
          ArrowDown: setSelectedIdNext,
        }),
  });
  const collectionPropList = {
    ...keyboardPropList,
    ref: focusScopeRef,
  };

  return {
    collectionPropList,
    selectedId,
    setSelectedId,
    resetSelectedId,
  };
};

export { useCollection };
