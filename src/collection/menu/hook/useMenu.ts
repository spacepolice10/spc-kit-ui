import react, { CSSProperties, useMemo } from "react";
import { usePopover } from "../../../overlays/popover/hook/usePopover";
import {
  useCollection,
  useCollectionType,
} from "../../collection/hook/useCollection";
import { mergeProps } from "../../../util/mergeProps";

export type useMenuType<T> = useCollectionType<T>;

export const MenuCtxt = react.createContext(
  {} as {
    menuTriggerPropList: { onClick: () => void };
    menuPropList: {
      tabIndex?: number;
      onKeyDown: (ev: React.KeyboardEvent) => void;
      ref: (elem: HTMLDivElement) => void;
      style: CSSProperties;
    };
    isInverted: boolean;
  }
);

const useMenu = <T extends { id: string }>(props: useMenuType<T>) => {
  const { items } = props;
  const { isShow, hide, popoverTriggerPropList, popoverPropList, isInverted } =
    usePopover<HTMLButtonElement>({
      focusTrapsOnPopover: true,
      focusTrapsOnTrigger: true,
    });
  const { collectionPropList } = useCollection({
    items,
    isInverted,
  });

  const memoized = useMemo(
    () => ({
      menuTriggerPropList: popoverTriggerPropList,
      menuPropList: {
        ...mergeProps<HTMLDivElement>([popoverPropList, collectionPropList]),
      },
      isInverted,
    }),
    [collectionPropList, isInverted, popoverPropList, popoverTriggerPropList]
  );
  return {
    isShow,
    hide,
    ...memoized,
  };
};

export { useMenu };
