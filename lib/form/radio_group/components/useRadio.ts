import {
	useToggleButton,
	useToggleButtonType,
} from "../../../button/toggle_button/components/useToggleButton";
import { useRadioGroupCtxt } from "./useRadioGroup";

export type useRadioType = useToggleButtonType & {
	id: string;
};

const useRadio = (propList: useRadioType) => {
	const { items, onChange, selectedId, isSelectOnFocusing } =
		useRadioGroupCtxt();
	function clickRadio() {
		const id = items?.find((item) => item?.id == propList?.id)
			?.id;
		id && onChange?.(id);
	}
	const { toggleButtonPropList, ...rest } = useToggleButton({
		hoverTitle: propList.hoverTitle,
		isToggle: selectedId == propList?.id,
		onChange: clickRadio,
		...(isSelectOnFocusing && {
			onFocus: clickRadio,
		}),
	});

	return {
		...rest,
		radioPropList: toggleButtonPropList,
	};
};

export { useRadio };
