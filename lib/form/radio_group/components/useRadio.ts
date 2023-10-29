import {
	useToggleButton,
	useToggleButtonType,
} from "../../../button/toggle_button/components/useToggleButton";
import { useRadioGroupCtxt } from "./useRadioGroup";

export type useRadioType = useToggleButtonType & {
	id: string;
};
export type useRadioReturnType = {};

const useRadio = (propList: useRadioType) => {
	const { items, onChange, selectedId, isSelectOnFocusing } =
		useRadioGroupCtxt();
	function clickRadio() {
		const id = items?.find((item) => item?.id == propList?.id)
			?.id;
		id && onChange?.(id);
	}
	const { toggleButtonPropList, ...rest } = useToggleButton({
		role: "checkbox",
		isToggle: selectedId == propList?.id,
		onChange: clickRadio,
		...(isSelectOnFocusing && {
			onFocus: clickRadio,
		}),
		...propList,
	});

	return {
		...rest,
		radioPropList: toggleButtonPropList,
	};
};

export { useRadio };
