import { CSSProperties } from "react";

export type useDragType = {
  onDragStarts?: (ev: React.DragEvent) => void;
  dataTransfer?: string;
};

const useDrag = (props?: useDragType) => {
  const { onDragStarts, dataTransfer } = props ?? {};
  const handleDragStarts = (ev: React.DragEvent) => {
    ev.dataTransfer.setData(
      "dataTransfer",
      dataTransfer ?? ev.currentTarget?.textContent ?? ""
    );
    onDragStarts?.(ev);
  };

  const dragPropList = {
    draggable: true,
    onDragStart: handleDragStarts,
    style: { cursor: "grab" } as CSSProperties,
  };

  return {
    dragPropList,
  };
};

export { useDrag };
