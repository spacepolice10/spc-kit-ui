import { createContext, Dispatch, SetStateAction } from "react";
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
  const { items, onChange } = props;
  const { collectionPropList } = useCollection({
    items,
  });
  return {
    onChange,
    checkboxCollectionPropList: collectionPropList,
  };
};

export { useCheckboxCollection, CheckboxCollectionCtxt };
