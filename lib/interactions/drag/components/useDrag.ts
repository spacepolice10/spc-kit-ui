import { CSSProperties } from "react";

/**
 *
 * @param onDragStarts callback that fires when user starts dragging element
 * @param dataTransfer text content inside draggable element
 * @todo make it possible to make use of additional information inside `dataTransfer` (files or some undetermined data based on event)
 * @returns
 */
export type useDragType = {
	onDragStarts: (ev: DragEvent) => void;
	dataTransfer: string;
};

type dragPropListType = {
	draggable?: boolean;
	onDragStart: (ev: DragEvent) => void;
	style: CSSProperties;
};

type useDragReturnType = {
	dragPropList: dragPropListType;
};

const useDrag = (props: useDragType): useDragReturnType => {
	const { onDragStarts, dataTransfer } = props ?? {};
	const handleDragStarts = (ev: DragEvent) => {
		const target = ev.currentTarget as HTMLElement;
		ev.dataTransfer.setData(
			"dataTransfer",
			dataTransfer ?? target?.textContent ?? ""
		);
		onDragStarts?.(ev);
	};

	const dragPropList = {
		draggable: true,
		onDragStart: handleDragStarts,
		style: { cursor: "grab" },
	};

	return {
		dragPropList,
	};
};

export { useDrag };
