import { useContext } from "react";
import { useButton } from "../../../button/button/hook/useButton";
import { useToggle, useToggleType } from "../../util/useToggle";
import { CheckboxCollectionCtxt } from "./useCheckboxCollection";

export type useCheckboxType = useToggleType & {
  id: string;
  isToggle: boolean;
  name?: string;
  desc?: string;
};

const useCheckbox = ({ id }: { id: string }) => {
  const { items, onChange: onChangeCheckboxCollection } = useContext(
    CheckboxCollectionCtxt
  );
  const activeCheckbox = items?.find((item) => item?.id == id);
  const { isToggle, toggle } = useToggle({
    isToggle: activeCheckbox?.isToggle,
    onChange: (isToggle) =>
      onChangeCheckboxCollection?.(
        items?.map((item) => (item?.id == id ? { ...item, isToggle } : item))
      ),
  });
  const { isHovered, isFocused, buttonPropList } = useButton({
    onPush: toggle,
    isntSemanticPushableElem: true,
  });
  return { isHovered, isFocused, isToggle, checkboxPropList: buttonPropList };
};

export { useCheckbox };
