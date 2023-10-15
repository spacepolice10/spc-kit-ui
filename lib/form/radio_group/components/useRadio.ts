import { useRadioGroupCtxt } from "./useRadioGroup";
import {
	useToggleButton,
	useToggleButtonType,
} from "../../../button/toggle_button/components/useToggleButton";

export type useRadioType = useToggleButtonType & {
	id: string;
};

const useRadio = (propList: useRadioType) => {
	const { items, onChange, selectedId, isSelectOnFocusing } =
		useRadioGroupCtxt();
	function clickRadio() {
		console.log("test");
		const id = items?.find((item) => item?.id == propList?.id)
			?.id;
		id && onChange?.(id);
	}
	const { buttonPropList, ...rest } = useToggleButton({
		hoverTitle: propList.hoverTitle,
		isToggle: selectedId == propList?.id,
		onChange: clickRadio,
		...(isSelectOnFocusing && {
			onFocus: clickRadio,
		}),
	});

	return {
		...rest,
		radioPropList: buttonPropList,
	};
};

export { useRadio };
