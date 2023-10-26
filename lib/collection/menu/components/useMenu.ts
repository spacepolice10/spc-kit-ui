import {
	usePopover,
	usePopoverType,
} from "../../../overlays/popover/components/usePopover";
import { mergeProps } from "../../../util/mergeProps";
import {
	useCollection,
	useCollectionType,
} from "../../collection/components/useCollection";

export type useMenuType<T> = usePopoverType &
	useCollectionType<T>;

const useMenu = (props) => {
	const { items } = props;
	const {
		isShow,
		isInverted,
		show,
		hide,
		triggerPropList,
		popoverPropList,
	} = usePopover();
	const { collectionPropList } = useCollection({
		items,
		isInverted: props?.isInverted ?? isInverted,
	});

	const menuPropList = {
		...mergeProps<HTMLDivElement>([
			popoverPropList,
			collectionPropList,
		]),
	};

	return {
		menuPropList,
		triggerPropList,
		show,
		hide,
		isShow,
		isInverted,
	};
};

export { useMenu };
