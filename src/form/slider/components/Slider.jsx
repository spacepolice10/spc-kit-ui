import { useFocus } from '../../../interactions/focus/components/useFocus'
import { useHover } from '../../../interactions/hover/components/useHover'
import { useSlider } from './useSlider'
import { createContext, useContext } from 'react'

export const SliderCtxt = createContext({})

/**
 * @typedef SliderType
 * @type {import("./useSlider").useSliderType &
 * {children: ReactNode}}
 */

/**
 *
 * @param {SliderType} props
 * @returns
 */

const Slider = (props) => {
  const { children, style, className } = props
  const { slidePropList, thumbPropList, offsetSlider, value } =
    useSlider(props)
  function offsetSliderDemo() {
    offsetSlider(200)
  }

  return (
    <>
      <button onClick={offsetSliderDemo}>TEST</button>
      <div
        {...slidePropList}
        style={{ ...style, ...slidePropList.style }}
        className={className}
      >
        <SliderCtxt.Provider value={thumbPropList}>
          {typeof children != 'function'
            ? children
            : children?.({ value })}
        </SliderCtxt.Provider>
      </div>
    </>
  )
}

/**
 *
 * @param {object} props
 * @param {ReactNode} props.children
 * @returns
 */
const SlideThumb = (props) => {
  const { children } = props
  const thumbPropList = useContext(SliderCtxt)
  const { isHovered, hoverPropList } = useHover()
  const { isFocused, focusPropList } = useFocus()
  return (
    <div
      {...thumbPropList}
      {...hoverPropList}
      {...focusPropList}
      style={thumbPropList.style}
    >
      {typeof children != 'function'
        ? children
        : children?.({ isHovered, isFocused })}
    </div>
  )
}

export { Slider, SlideThumb }
