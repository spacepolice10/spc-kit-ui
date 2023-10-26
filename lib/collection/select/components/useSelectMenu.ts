import {
	useSelect,
	useSelectType,
} from "../../../form/select/components/useSelect";
import { usePopover } from "../../../main";
import { mergeProps } from "../../../util/mergeProps";

export type useSelectMenuType<T> = useSelectType<T> & {};

const useSelectMenu = <
	T extends { id: string; isSelected: boolean },
>(
	propList: useSelectType<T>
) => {
	const { selectPropList } = useSelect(propList);
	const { popoverPropList, triggerPropList, isShow } =
		usePopover();
	const selectMenuPropList = {
		...mergeProps([popoverPropList, selectPropList]),
	};
	const selectMenuButtonPropList = {
		...triggerPropList,
	};
	return {
		selectMenuPropList,
		selectMenuButtonPropList,
		isShow,
	};
};

export { useSelectMenu };
