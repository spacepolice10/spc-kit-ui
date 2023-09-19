import react, { MutableRefObject, useMemo } from "react";
import { usePopover } from "../../../overlays/popover/hook/usePopover";
import {
  useCollection,
  useCollectionType,
} from "../../collection/hook/useCollection";
import { mergeProps } from "../../../util/mergeProps";

export type useMenuType<T> = useCollectionType<T>;

export const MenuCtxt = react.createContext(
  {} as {
    menuPropList: object;
    triggerRef: MutableRefObject<HTMLElement | null>;
    show: () => void;
    hide: () => void;
    isShow: boolean;
    isInverted: boolean;
  }
);

const useMenu = <T extends { id: string }>(props: useMenuType<T>) => {
  const { items } = props;
  const { isShow, show, hide, triggerRef, popoverPropList, isInverted } =
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
      menuPropList: {
        ...mergeProps<HTMLDivElement>([popoverPropList, collectionPropList]),
      },
      triggerRef,
      isShow,
      show,
      hide,
      isInverted,
    }),
    [
      collectionPropList,
      hide,
      isInverted,
      isShow,
      popoverPropList,
      show,
      triggerRef,
    ]
  );
  return {
    ...memoized,
  };
};

export { useMenu };
