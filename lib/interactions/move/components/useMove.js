import { useEffect, useRef, useState } from 'react'
import clamp from '../../util/clamp'
import { useKeyboard } from '../../keyboard/components/useKeyboard'

/**
 *
 * @param {object} [props]
 * @param {() => void} props.onMoveStarts — callback to fire on pointing device down
 * @param {() => void} props.onMove — callback to fire on pointing device change position
 * @param {() => void} props.onMoveFinishes — callback to fire on pointing device up
 * @returns
 */
const useMove = (props) => {
  const { onMoveStarts, onMove, onMoveFinishes } = props || {}

  /**
   * @type {[HTMLElement | undefined, Dispatch<SetStateAction<HTMLElement>>]}  — this target stored to reference while detecting cursor coordinates
   */
  const [target, setTarget] = useState(undefined)
  const [isMoving, setIsMoving] = useState(false)
  const [coords, setCoords] = useState({
    x: 0,
    y: 0,
  })
  // coords shift helps to preserve correct position of the element under cursor at the initial drag
  const shift = useRef({ x: 0, y: 0 })

  // dimensions of moving element and its parent are necessary to preserve correct position of element inside relative parent
  /**
   *
   * @param {HTMLElement} target
   * @returns
   */
  function generateDimensions(target) {
    const dimensions = target?.getBoundingClientRect() ?? {
      width: 0,
      height: 0,
    }
    const parentDimensions =
      target?.parentElement?.getBoundingClientRect() ?? {
        width: 0,
        height: 0,
      }
    return { dimensions, parentDimensions }
  }

  // moving element
  /**
   * @param {{x: number, y: number}}
   * @returns
   */
  function move({ x, y }) {
    setCoords({ x, y })
    onMove?.()
  }

  // moving element with cursor or finger
  function detectCursorCoords(ev) {
    ev.stopPropagation()
    if (!target) return
    const x = ev.pageX - shift?.current.x
    const y = ev.pageY - shift?.current.y
    const { dimensions, parentDimensions } =
      generateDimensions(target)
    const valX = clamp(
      x,
      parentDimensions?.width - dimensions?.width - 2
    )
    const valY = clamp(
      y,
      parentDimensions?.height - dimensions?.height - 2
    )
    return { x: valX, y: valY }
  }

  function moveWithCursor(ev) {
    const coords = detectCursorCoords(ev)
    coords && move(coords)
  }

  function handleMoveStarts(ev) {
    const target = ev.target
    onMoveStarts?.()
    setTarget(target)
    setIsMoving(true)
    shift.current.x = ev.pageX - target?.offsetLeft
    shift.current.y = ev.pageY - target?.offsetTop
  }

  function handleMoveFinishes(event) {
    event.preventDefault()
    event.stopPropagation()
    setTarget(undefined)
    setIsMoving(false)
    onMoveFinishes?.()
  }

  // listening to mouse events outside of the box so it will not break if user dragged mouse out of the zone which is seems to be movable. It is just a more natural way to interact with such interface components
  useEffect(() => {
    window.addEventListener('pointermove', moveWithCursor)
    window.addEventListener('pointerup', handleMoveFinishes)
    return () => {
      window.removeEventListener('pointermove', moveWithCursor)
      window.removeEventListener('pointerup', handleMoveFinishes)
    }
  })

  // moving with keyboard
  /**
   *
   * @param {KeyboardEvent} ev
   * @param { "left" | "rights" | "up" | "down"} moveTo — axises available to move to
   */
  function moveWithKeyboard(ev, moveTo) {
    ev.preventDefault()
    ev.stopPropagation()
    const target = ev.currentTarget
    const { dimensions, parentDimensions } =
      generateDimensions(target)
    switch (moveTo) {
      case 'down':
        move({
          x: coords.x,
          y: clamp(
            coords.y + 20,
            parentDimensions.height - dimensions.height
          ),
        })
        break
      case 'up':
        move({
          x: coords.x,
          y: clamp(
            coords.y - 20,
            parentDimensions.height - dimensions.height
          ),
        })
        break
      case 'left':
        move({
          x: clamp(
            coords.x - 20,
            parentDimensions.width - dimensions.width
          ),
          y: coords.y,
        })
        break
      case 'rights':
        move({
          x: clamp(
            coords.x + 20,
            parentDimensions.width - dimensions.width
          ),
          y: coords.y,
        })
        break
    }
  }

  const { keyboardPropList } = useKeyboard({
    ArrowLeft: (ev) => moveWithKeyboard(ev, 'left'),
    ArrowRight: (ev) => moveWithKeyboard(ev, 'rights'),
    ArrowDown: (ev) => moveWithKeyboard(ev, 'down'),
    ArrowUp: (ev) => moveWithKeyboard(ev, 'up'),
  })

  // return
  const movePropList = {
    onPointerDown: handleMoveStarts,
    ...(matchMedia('(pointer:coarse)').matches && {
      style: { touchAction: 'none' },
    }),
    ...keyboardPropList,
  }

  return {
    setCoords,
    coords,
    isMoving,
    movePropList,
  }
}

export { useMove }
