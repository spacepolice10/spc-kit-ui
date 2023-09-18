import { Children, ReactNode, useMemo } from "react";
import {
  CheckboxCollectionCtxt,
  useCheckboxCollection,
  useCheckboxCollectionType,
} from "../hook/useCheckboxCollection";
import { stylesType } from "../../../util/stylesType";

export type CheckboxCollectionType = stylesType &
  useCheckboxCollectionType & {
    children: ReactNode[];
  };

const CheckboxCollection = (props: CheckboxCollectionType) => {
  const { items, style, className } = props || {};
  const { onChange, checkboxCollectionPropList } = useCheckboxCollection(props);
  const data = useMemo(
    () => ({
      items,
      onChange,
    }),
    [onChange, items]
  );
  return (
    <CheckboxCollectionCtxt.Provider value={data}>
      <div
        {...checkboxCollectionPropList}
        style={style}
        className={className as string}
      >
        {Children.toArray(props?.children).map((elem) => elem)}
      </div>
    </CheckboxCollectionCtxt.Provider>
  );
};
export { CheckboxCollection };
