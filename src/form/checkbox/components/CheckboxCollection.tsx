import { Children, ReactNode } from "react";
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
  const { checkboxCollectionPropList, ...rest } = useCheckboxCollection(props);
  return (
    <CheckboxCollectionCtxt.Provider value={rest}>
      <div
        {...checkboxCollectionPropList}
        className={props?.className as string}
      >
        {Children.toArray(props?.children).map((elem) => elem)}
      </div>
    </CheckboxCollectionCtxt.Provider>
  );
};
export { CheckboxCollection };
