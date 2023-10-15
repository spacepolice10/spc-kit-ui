import {
	useToggle,
	useToggleType,
} from "../../../form/util/useToggle";
import {
	useButton,
	useButtonType,
} from "../../button/components/useButton";

export type useToggleButtonType = useToggleType &
	useButtonType;

const useToggleButton = (propList: useToggleButtonType) => {
	const { toggle, isToggle } = useToggle(propList);
	const buttonPropList = useButton({
		...propList,
		onPush: (ev) => {
			console.log(ev);
			toggle();
		},
	});
	return {
		isToggle,
		...buttonPropList,
	};
};

export { useToggleButton };
