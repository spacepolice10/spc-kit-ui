import { createContext, Dispatch, SetStateAction, useMemo } from "react";
import { useCollection } from "../../../collection/collection/hook/useCollection";
import { useCheckboxType } from "./useCheckbox";

export type useCheckboxCollectionType = {
  items: useCheckboxType[];
  onChange:
    | Dispatch<SetStateAction<useCheckboxType[]>>
    | ((args: useCheckboxType[]) => useCheckboxType[]);
};

const CheckboxCollectionCtxt = createContext(
  {} as unknown as useCheckboxCollectionType
);

const useCheckboxCollection = (props: useCheckboxCollectionType) => {
  const { collectionPropList } = useCollection({
    items: props?.items,
  });
  const memoized = useMemo(
    () => ({
      ...props,
      checkboxCollectionPropList: collectionPropList,
    }),
    [props]
  );
  return { ...memoized };
};

export { useCheckboxCollection, CheckboxCollectionCtxt };
