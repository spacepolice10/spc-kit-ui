/**
 *
 * @param {object} [props]
 * @param {(ev: DragEvent) => void} [props.onDragStarts]
 * @param {string} [props.dataTransfer]
 * @returns
 */
const useDrag = (props) => {
  const { onDragStarts, dataTransfer } = props ?? {}
  const handleDragStarts = (ev) => {
    ev.dataTransfer.setData(
      'dataTransfer',
      dataTransfer ?? ev.currentTarget?.textContent ?? ''
    )
    onDragStarts?.(ev)
  }

  const dragPropList = {
    draggable: true,
    onDragStart: handleDragStarts,
    style: { cursor: 'grab' },
  }

  return {
    dragPropList,
  }
}

export { useDrag }
