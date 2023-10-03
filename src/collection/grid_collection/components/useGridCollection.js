import { useFocusScope } from '../../../interactions/focus_scope/components/useFocusScope'
import { useKeyboard } from '../../../interactions/keyboard/components/useKeyboard'

/**
 * @typedef useGridCollectionType
 * @property {number} columnNumber
 * @property {boolean} [isInverted]
 */

/**
 *
 * @param {useGridCollectionType} props
 * @returns
 */
const useGridCollection = (props) => {
  const { columnNumber } = props
  const {
    focusScopePropList,
    focusPrevElem,
    focusNextElem,
    focusNextElemGrid,
    focusPrevElemGrid,
  } = useFocusScope()

  const { keyboardPropList } = useKeyboard({
    ArrowLeft: focusPrevElem,
    ArrowUp: () => focusPrevElemGrid(columnNumber),
    ArrowRight: focusNextElem,
    ArrowDown: () => focusNextElemGrid(columnNumber),
  })

  const gridCollectionPropList = {
    ...keyboardPropList,
    ...focusScopePropList,
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${columnNumber}, minmax(0, 1fr))`,
    },
  }
  return {
    gridCollectionPropList,
  }
}

export { useGridCollection }
