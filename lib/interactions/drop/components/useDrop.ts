import { useState } from "react";

export type useDropType = {
	onDragOver: (dataTransfer: string) => void;
	onDrop: (dataTransfer: string) => void;
};

type dropPropListType = {
	onDragOver: (ev: React.DragEvent) => void;
	onDragLeave: (ev: React.DragEvent) => void;
	onDragEnd: (ev: React.DragEvent) => void;
	onDrop: (ev: React.DragEvent) => void;
};

type useDropReturnType = {
	isDragOver: boolean;
	dropPropList: dropPropListType;
};

const useDrop = (props: useDropType): useDropReturnType => {
	const { onDragOver, onDrop } = props ?? {};
	const [isDragOver, setIsDragOver] = useState(false);

	const handleDragOver = (ev: React.DragEvent) => {
		ev.preventDefault();
		setIsDragOver(true);
		const data = ev.dataTransfer.getData("dataTransfer");
		onDragOver?.(data);
	};
	const handleDragLeave = (ev: React.DragEvent) => {
		ev.preventDefault();
		setIsDragOver(false);
	};
	const handleDragEnd = (ev: React.DragEvent) => {
		ev.preventDefault();
		setIsDragOver(false);
	};
	const handleDrop = (ev: React.DragEvent) => {
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
