import { Children, ReactNode, useMemo } from "react";
import { stylesType } from "../../../util/stylesType";
import {
  RadioGroupCtxt,
  useRadioGroup,
  useRadioGroupType,
} from "../hook/useRadioGroup";

export type RadioGroupType = stylesType &
  useRadioGroupType & { children: ReactNode[] };

const RadioGroup = (props: RadioGroupType) => {
  const { style, classStyle, items, children } = props || {};
  const { onChange, selected, setSelected, radioGroupPropList } =
    useRadioGroup(props);
  const memoizedCtxtData = useMemo(
    () => ({ items, onChange, selected, setSelected }),
    [items, onChange, selected, setSelected]
  );
  return (
    <RadioGroupCtxt.Provider value={memoizedCtxtData}>
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
