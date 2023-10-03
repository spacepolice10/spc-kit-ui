import { useState } from "react";

/**
 *
 * @param {object} props
 * @param {(dataTransfer: string) => void} props.onDragOver
 * @param {(dataTransfer: string) => void} props.onDrop
 * @returns
 */
const useDrop = (props) => {
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
