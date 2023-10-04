import { useState } from 'react'
import { useToggleButton } from '../../../button/toggle_button/components/useToggleButton'

/**
 * @typedef useSwitchType
 * @type {import('../../../button/toggle_button/components/useToggleButton').useToggleButtonType & {isVertical: boolean}}
 */

/**
 *
 * @param {useSwitchType} props
 * @returns
 */
const useSwitch = (props) => {
  const { buttonPropList, isToggle, ...restButtonPropList } =
    useToggleButton({
      ...props,
      isntSemanticPushableElem: true,
    })

  const [outerWidth, setOuterWidth] = useState(0)
  const [innerWidth, setInnerWidth] = useState(0)
  const switchWrapPropList = {
    ...buttonPropList,
    ref: (ref) => {
      if (!ref) return
      setOuterWidth(ref?.offsetWidth)
    },
  }
  const switchPropList = {
    ref: (ref) => {
      if (!ref) return
      setInnerWidth(ref?.offsetWidth)
    },
    style: {
      position: 'absolute',
      inset: 'auto 0px',
      transform: isToggle
        ? `${props?.isVertical ? 'translateY' : 'translateX'}(${
            outerWidth - innerWidth
          }px)`
        : '',
    },
  }
  return {
    isToggle,
    switchWrapPropList,
    switchPropList,
    ...restButtonPropList,
  }
}

export { useSwitch }
