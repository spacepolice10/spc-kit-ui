import { createContext, Dispatch, SetStateAction, useState } from "react";
import { useCollection } from "../../../collection/collection/hook/useCollection";

export type useRadioGroupType = {
  items: { id: string; name?: string }[];
  onChange: (args: string) => void;
  selected?: string | null;
  setSelected?: Dispatch<SetStateAction<string | null>>;
};

const RadioGroupCtxt = createContext({} as unknown as useRadioGroupType);

const useRadioGroup = (props: useRadioGroupType) => {
  const { items, onChange } = props;
  const [selected, setSelected] = useState<string | null>(
    props?.selected ?? null
  );
  const { collectionPropList } = useCollection({
    items,
  });

  return {
    onChange,
    selected,
    setSelected,
    radioGroupPropList: collectionPropList,
  };
};

export { useRadioGroup, RadioGroupCtxt };
