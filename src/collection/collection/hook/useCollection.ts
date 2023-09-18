import { FormEvent, useEffect, useState } from "react";
import { useFocusScope } from "../../../interactions/focus_scope/hook/useFocusScope";
import { useKeyboard } from "../../../interactions/keyboard/hook/useKeyboard";

export type useCollectionType<T> = {
  items?: T[];
  controlled?: boolean;
  isHorizontal?: boolean;
  isInverted?: boolean;
};

const useCollection = <T extends { id: string | number }>(
  props?: useCollectionType<T>
) => {
  const { items, controlled, isInverted } = props || {};
  const [selectedId, setSelectedId] = useState("");

  const { focusNextElem, focusPrevElem, focusScopePropList } = useFocusScope();
  const [isHorizontal, setIsHorizontal] = useState(false);

  function removeSelectedId() {
    setSelectedId("");
  }
  useEffect(() => {
    setIsHorizontal(
      props?.isHorizontal ??
        (focusScopePropList.ref.current?.style.display == "flex" &&
          focusScopePropList.ref.current?.style.flexDirection != "column")
    );
  }, [focusScopePropList, props?.isHorizontal]);

  function setSelectedIdPrev(ev: KeyboardEvent | FormEvent) {
    if (controlled) {
      if (!items?.length) return;
      if (!selectedId) {
        const id = items?.[items?.length - 1]?.id;
        setSelectedId(`${id}`);
      }
      const index = items.findIndex((x) => x?.id == selectedId) - 1;
      if (index < 0) return;
      const id = items[index]?.id;
      setSelectedId(`${id}`);
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
        setSelectedId(`${id}`);
      }
      const index = items.findIndex((x) => x?.id == selectedId) + 1;
      if (index > items.length - 1) return;
      const id = items[index]?.id;
      setSelectedId(`${id}`);
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
    ...focusScopePropList,
  };

  return {
    items: isInverted ? items?.reverse() : items ?? [],
    collectionPropList,
    selectedId,
    setSelectedId,
    removeSelectedId,
  };
};

export { useCollection };
