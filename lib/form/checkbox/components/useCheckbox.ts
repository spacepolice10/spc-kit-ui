import { useCheckboxCollectionCtxt } from "./useCheckboxCollection";
import {
	useToggleButton,
	useToggleButtonType,
} from "../../../button/toggle_button/components/useToggleButton";

export type useCheckboxType = useToggleButtonType & {
	id: string;
};

const useCheckbox = (propList: useCheckboxType) => {
	const { id, onChange } = propList;
	const { items, onChange: onChangeCheckboxCollection } =
		useCheckboxCollectionCtxt();

	function toggleCheckbox(isToggle: boolean) {
		onChangeCheckboxCollection?.(
			items?.map((item) =>
				item?.id == id ? { ...item, isToggle } : item
			)
		);
		onChange?.(isToggle);
	}
	const activeCheckbox = items?.find(
		(item) => item?.id == id
	);

	const { buttonPropList, ...rest } = useToggleButton({
		hoverTitle: propList.hoverTitle,
		isToggle: activeCheckbox?.isToggle,
		onChange: toggleCheckbox,
	});
	return {
		...rest,
		checkboxPropList: buttonPropList,
	};
};

export { useCheckbox };
