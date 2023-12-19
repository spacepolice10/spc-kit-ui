import {
	popoverPropListType,
	usePopover,
	usePopoverReturnType,
	usePopoverType,
} from "../../overlays/popover/usePopover";
import { mergeProps } from "../../util/mergeProps";
import {
	collectionPropListType,
	useCollection,
	useCollectionType,
} from "../collection/useCollection";

export type useMenuType<T> = useCollectionType<T> &
	usePopoverType;
export type useMenuReturnType = usePopoverReturnType & {
	menuPropList: popoverPropListType & collectionPropListType;
};

export const useMenu = <T extends { id: string }>(
	propList: useMenuType<T>
): useMenuReturnType => {
	const { popoverPropList, ...restPopoverProplist } =
		usePopover(propList);
	const { collectionPropList, ...restCollectionPropList } =
		useCollection(propList);
	// const { keyboardPropList } = useKeyboard({
	// 	ArrowDown: (ev) => {
	// 		ev.preventDefault();
	// 		focusNextElem();
	// 	},
	// 	ArrowUp: (ev) => {
	// 		ev.preventDefault();
	// 		focusPrevElem();
	// 	},
	// });
	const menuPropList = mergeProps<HTMLDivElement>([
		popoverPropList,
		collectionPropList,
	]);
	return {
		//@ts-ignore
		menuPropList,
		...restPopoverProplist,
		...restCollectionPropList,
	};
};
