import { useContext } from 'react'
import { CheckboxCollectionCtxt } from './useCheckboxCollection'
import { useToggleButton } from '../../../button/toggle_button/components/useToggleButton'

/**
 *
 * @typedef useCheckboxType
 * @type {import('../../util/useToggle').useToggleType &
 * {id: string, onChange: () => void}}
 */

/**
 *
 * @param {useCheckboxType} props
 * @returns
 */
const useCheckbox = (props) => {
  const { id, onChange } = props
  /**
   * @type {{
   * items: {id: string, isToggle: boolean}[],
   * onChange: () => void
   * }}
   */
  const { items, onChange: onChangeCheckboxCollection } =
    useContext(CheckboxCollectionCtxt)

  function toggleCheckbox(isToggle) {
    onChangeCheckboxCollection?.(
      items?.map((item) =>
        item?.id == id ? { ...item, isToggle } : item
      )
    )
    onChange?.(isToggle)
  }
  const activeCheckbox = items?.find(
    (item) => item?.id == id
  )

  const {
    isHovered,
    isFocused,
    isToggle,
    isPushed,
    buttonPropList,
  } = useToggleButton({
    isToggle: activeCheckbox?.isToggle,
    onChange: toggleCheckbox,
  })
  return {
    isHovered,
    isFocused,
    isToggle,
    isPushed,
    checkboxPropList: buttonPropList,
  }
}

export { useCheckbox }
