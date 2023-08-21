import { Children, ReactNode } from "react";
import { stylesType } from "../../../util/stylesType";
import {
  RadioGroupCtxt,
  useRadioGroup,
  useRadioGroupType,
} from "../hook/useRadioGroup";

export type RadioGroupType = stylesType &
  useRadioGroupType & { children: ReactNode[] };

const RadioGroup = (props: RadioGroupType) => {
  const { style, classStyle, children } = props || {};
  const { radioGroupPropList, ...ctxtPropList } = useRadioGroup(props);

  return (
    <RadioGroupCtxt.Provider value={ctxtPropList}>
      <div
        {...radioGroupPropList}
        style={style}
        className={classStyle as string}
      >
        {Children.toArray(children).map((elem) => elem)}
      </div>
    </RadioGroupCtxt.Provider>
  );
};
export { RadioGroup };
