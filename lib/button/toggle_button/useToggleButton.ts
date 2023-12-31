import {
	useToggle,
	useToggleType,
} from "../../form/util/useToggle";
import {
	useButton,
	useButtonType,
} from "../button/useButton";

export type useToggleButtonType = useToggleType &
	useButtonType;

const useToggleButton = (propList: useToggleButtonType) => {
	const { toggle, isToggle } = useToggle(propList);
	const { buttonPropList, ...restButtonPropList } = useButton(
		{
			...propList,
			onPress: toggle,
		}
	);
	const toggleButtonPropList = {
		...buttonPropList,
		"aria-checked": isToggle,
		"aria-describedby": "Switch toggle",
		role: "checkbox",
	};
	return {
		...restButtonPropList,
		isToggle,
		toggleButtonPropList,
	};
};

export { useToggleButton };
