import { useState } from "react";

/**
 *
 * @param {object} props
 * @param {(dataTransfer: string) => void} props.onDragOver
 * @param {(dataTransfer: string) => void} props.onDrop
 * @todo make it possible to make use of additional information inside `dataTransfer` (files or some undetermined data based on event)
 */

export type useDropType = {
	onDragOver: (dataTransfer: string) => void;
	onDrop: (dataTransfer: string) => void;
};

type dropPropListType = {
	onDragOver: (ev: DragEvent) => void;
	onDragLeave: (ev: DragEvent) => void;
	onDragEnd: (ev: DragEvent) => void;
	onDrop: (ev: DragEvent) => void;
};

type useDropReturnType = {
	isDragOver: boolean;
	dropPropList: dropPropListType;
};

const useDrop = (props: useDropType): useDropReturnType => {
	const { onDragOver, onDrop } = props ?? {};
	const [isDragOver, setIsDragOver] = useState(false);

	const handleDragOver = (ev) => {
		ev.preventDefault();
		setIsDragOver(true);
		const data = ev.dataTransfer.getData("dataTransfer");
		onDragOver?.(data);
	};
	const handleDragLeave = (ev) => {
		ev.preventDefault();
		setIsDragOver(false);
	};
	const handleDragEnd = (ev) => {
		ev.preventDefault();
		setIsDragOver(false);
	};
	const handleDrop = (ev) => {
		ev.preventDefault();
		const data = ev.dataTransfer.getData("dataTransfer");
		setIsDragOver(false);
		onDrop?.(data);
	};

	const dropPropList = {
		onDragOver: handleDragOver,
		onDragLeave: handleDragLeave,
		onDragEnd: handleDragEnd,
		onDrop: handleDrop,
	};

	return {
		isDragOver,
		dropPropList,
	};
};

export { useDrop };
