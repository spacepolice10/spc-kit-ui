import { useState } from 'react'

/**
 * @typedef useHoverReturnType
 */

/**
 *
 * @typedef useHoverType
 * @property {() => void} [onHover]
 * @property {() => void} [onHoverLoose]
 * @returns
 */

/**
 * @param {useHoverType} [props]
 */
const useHover = (props) => {
  const { onHover, onHoverLoose } = props ?? {}
  const [isHovered, setIsHovered] = useState(false)
  const hoverPropList = {
    onMouseEnter: () => {
      if (matchMedia('(pointer:coarse)').matches) return
      setIsHovered(true)
      onHover?.()
    },
    onMouseLeave: () => {
      setIsHovered(false)
      onHoverLoose?.()
    },
  }
  return {
    isHovered,
    hoverPropList,
  }
}

export { useHover }
