import {
	popoverPropListType,
	triggerPropListType,
	usePopover,
	usePopoverType,
} from "../../overlays/popover/usePopover";
import { mergeProps } from "../../util/mergeProps";
import {
	collectionPropListType,
	useCollection,
	useCollectionType,
} from "../collection/useCollection";

export type useMenuType<T> = usePopoverType &
	useCollectionType<T>;

export type useMenuReturnType = {
	menuPropList?: popoverPropListType & collectionPropListType;
	menuButtonPropList: triggerPropListType;
	show: () => void;
	hide: () => void;
	isShow: boolean;
	isInverted: boolean;
};

const useMenu = <T extends { id: string }>(
	props: useMenuType<T>
): useMenuReturnType => {
	const { items } = props;
	const {
		isShow,
		isInverted,
		show,
		hide,
		triggerPropList,
		popoverPropList,
	} = usePopover(props);
	const { collectionPropList } = useCollection({
		items,
		isInverted: props?.isInverted ?? isInverted,
	});

	const menuPropList = mergeProps<HTMLDivElement>([
		popoverPropList,
		collectionPropList,
	]) as popoverPropListType & collectionPropListType;
	const menuButtonPropList = triggerPropList;

	return {
		menuPropList,
		menuButtonPropList,
		show,
		hide,
		isShow,
		isInverted,
	};
};

export { useMenu };
