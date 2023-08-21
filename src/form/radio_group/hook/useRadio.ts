import { useContext } from "react";
import { useToggle } from "../../util/useToggle";
import { RadioGroupCtxt } from "./useRadioGroup";
import { useButton } from "../../../button/button/hook/useButton";

export type useRadioType = {
  id: string;
  name?: string;
};

const useRadio = (props: useRadioType) => {
  const { items, onChange, selected, setSelected } = useContext(RadioGroupCtxt);
  const { isToggle, toggle } = useToggle({
    isToggle: selected == props?.id,
    onChange: () => {
      const id = items?.find((item) => item?.id == props?.id)?.id;
      if (!id) return;
      setSelected?.(id);
      onChange(id);
    },
  });
  const { buttonPropList, isFocused, isHovered } = useButton({
    onPush: toggle,
    isntSemanticPushableElem: true,
  });
  return {
    isHovered,
    isFocused,
    isSelected: isToggle,
    radioPropList: buttonPropList,
  };
};

export { useRadio };
