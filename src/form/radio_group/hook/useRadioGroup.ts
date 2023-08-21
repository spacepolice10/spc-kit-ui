import {
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { useCollection } from "../../../collection/collection/hook/useCollection";

export type useRadioGroupType = {
  items: { id: string; name?: string }[];
  onChange: (args: string) => void;
  selected?: string | null;
  setSelected?: Dispatch<SetStateAction<string | null>>;
  selectOnFocusing?: boolean;
};

const RadioGroupCtxt = createContext({} as unknown as useRadioGroupType);

const useRadioGroup = (props: useRadioGroupType) => {
  const { items, onChange, selectOnFocusing } = props;
  const [selected, setSelected] = useState<string | null>(
    props?.selected ?? null
  );
  const { collectionPropList } = useCollection({
    items,
  });
  const memoized = useMemo(
    () => ({ items, onChange, selected, setSelected, selectOnFocusing }),
    [items, onChange, selectOnFocusing, selected]
  );
  return {
    ...memoized,
    radioGroupPropList: collectionPropList,
  };
};

export { useRadioGroup, RadioGroupCtxt };
