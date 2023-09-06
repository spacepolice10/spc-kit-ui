import { FormEvent, useEffect, useState } from "react";
import { useFocusScope } from "../../../interactions/focus_scope/hook/useFocusScope";
import { useKeyboard } from "../../../interactions/keyboard/hook/useKeyboard";

export type useCollectionType<T> = {
  items?: T[];
  controlled?: boolean;
  isHorizontal?: boolean;
  isInverted?: boolean;
};

const useCollection = <T extends { id: string }>(
  props?: useCollectionType<T>
) => {
  const { items, controlled, isInverted } = props || {};
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
    if (controlled) {
      if (!items?.length) return;
      if (!selectedId) {
        const id = items?.[items?.length - 1]?.id;
        setSelectedId(id);
      }
      const index = items.findIndex((x) => x?.id == selectedId) - 1;
      if (index < 0) return;
      setSelectedId(items[index]?.id);
    } else {
      ev.preventDefault();
      focusPrevElem();
    }
  }
  function setSelectedIdNext(ev: KeyboardEvent | FormEvent) {
    if (controlled) {
      if (!items?.length) return;
      if (!selectedId) {
        const id = items?.[0]?.id;
        setSelectedId(id);
      }
      const index = items.findIndex((x) => x?.id == selectedId) + 1;
      if (index > items.length - 1) return;
      setSelectedId(items[index]?.id);
    } else {
      ev.preventDefault();
      focusNextElem();
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
    items: isInverted ? items?.reverse() : items ?? [],
    collectionPropList,
    selectedId,
    setSelectedId,
    resetSelectedId,
  };
};

export { useCollection };
