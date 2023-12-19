import { useMenuType } from "../../collection/menu/useMenu";
import {
	useSearchform,
	useSearchformType,
} from "../../form/searchform/useSearchform";
import { useMenu } from "../../main";

export type useSearchComboboxType<T> = useMenuType<T> &
	useSearchformType;

export const useSearchCombobox = <T extends { id: string }>(
	propList: useSearchComboboxType<T>
) => {
	const DATA = propList?.data;
	const IS_SHOW = propList?.isShow;
	const { searchFormPropList } = useSearchform({
		...propList,
		onInput: (data) => {
			propList?.onInput?.(data);
			if (!IS_SHOW && DATA) {
				show();
			}
		},
	});
	const { popoverPropList, isShow, show, hide } = useMenu({
		data: DATA,
		...(IS_SHOW
			? { isShow: IS_SHOW }
			: { isShow: undefined }),
		...propList,
	});
	return {
		searchFormPropList,
		popoverPropList,
		isShow,
		hide,
	};
};
