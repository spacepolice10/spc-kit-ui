import { useEffect, useMemo, useRef } from 'react'
import { useMove } from '../../../interactions/move/components/useMove.js'
import { useHover } from '../../../interactions/hover/components/useHover.js'
import { useFocus } from '../../../interactions/focus/components/useFocus.js'

/**
 * @typedef useSliderType
 * @property {number} [minVal]
 * @property {number} [maxVal]
 * @property {number} [defVal]
 * @property {'x' | 'y'} [axis]
 * @property {(args: number) => void} [onChange]
 * @property {(args: number) => void} [onChangeFinishes]
 */

/**
 *
 * @param {useSliderType} props
 * @returns
 */
const useSlider = (props) => {
  const {
    maxVal,
    defVal,
    onChange,
    onChangeFinishes,
    axis = 'x',
  } = props
  const slideRef = useRef(null)
  const thumbRef = useRef(null)
  const unit = { x: 'offsetWidth', y: 'offsetHeight' }[axis]
  function offsetSliderByPush(ev) {
    const thumb = thumbRef.current
    if (!thumb) return
    const sliderOffsetLeft =
      ev.currentTarget?.getBoundingClientRect()?.left
    const halfOfThumbWidth = thumb.clientWidth / 2
    setCoords((state) => {
      return {
        x: ev.clientX - (sliderOffsetLeft + halfOfThumbWidth),
        y: state.y,
      }
    })
  }
  function offsetSlider(value) {
    const thumb = thumbRef.current
    if (!isMoving || !thumb) return
    const slideUnitAmount = slideRef?.current?.[unit] ?? 0
    const thumbUnitAmount = thumbRef?.current?.[unit] ?? 0
    const offset =
      ((slideUnitAmount - thumbUnitAmount) *
        ((value * 100) / maxVal)) /
      100
    const chosenAxis = { x: 'left', y: 'top' }[axis]
    thumb.style[chosenAxis] = `${offset}px`
    setCoords((state) => ({ ...state, [axis]: `${offset}px` }))
  }

  const { setCoords, coords, isMoving, movePropList } = useMove({
    onMoveFinishes: () => onChangeFinishes?.(value),
  })
  const value = useMemo(() => {
    const coordsDirections = { x: 'x', y: 'y' }
    const chosenDirections = coordsDirections[axis]
    const slideUnitAmount = slideRef?.current?.[unit] ?? 0
    const thumbUnitAmount = thumbRef?.current?.[unit] ?? 0
    const coord = coords[chosenDirections]
    const value = +(
      (maxVal *
        ((coord / (slideUnitAmount - thumbUnitAmount)) * 100)) /
      100
    ).toFixed(0)
    return isNaN(value) ? defVal ?? 0 : value
  }, [coords])

  useEffect(() => {
    if (!defVal) return
    offsetSlider(defVal)
  }, [defVal])

  useEffect(() => {
    if (!onChange || !value) return
    onChange?.(value)
  }, [onChange, value])

  const { isHovered, hoverPropList } = useHover()
  const { isFocused, focusPropList } = useFocus()

  const slidePropList = {
    onMouseDown: offsetSliderByPush,
    ref: slideRef,
    style: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      padding: 0,
      margin: 0,
      touchAction: 'none',
    },
  }
  const thumbPropList = {
    ...movePropList,
    ...hoverPropList,
    ...focusPropList,
    ref: thumbRef,
    style: {
      display: 'block',
      position: 'absolute',
      left: axis == 'x' ? `${coords.x}px` : 'auto',
      top: axis == 'y' ? `${coords.y}px` : 'auto',
    },
  }

  return {
    value,
    slidePropList,
    thumbPropList,
    offsetSlider,
    isHovered,
    isFocused,
  }
}

export { useSlider }
