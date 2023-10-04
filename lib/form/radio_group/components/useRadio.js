import { useContext } from 'react'
import { RadioGroupCtxt } from './useRadioGroup'
import { useToggleButton } from '../../../button/toggle_button/components/useToggleButton'

/**
 * @typedef useRadioType
 * @property {string} id
 * @property {(isToggle: boolean) => void} [onChange]
 */

/**
 *
 * @param {useRadioType} props
 * @returns
 */
const useRadio = (props) => {
  const { items, onChange, selectedId, selectOnFocusing } =
    useContext(RadioGroupCtxt)
  function clickRadio() {
    const id = items?.find((item) => item?.id == props?.id)?.id
    id && onChange?.(id)
  }

  const { buttonPropList, ...rest } = useToggleButton({
    isToggle: selectedId == props?.id,
    onChange: clickRadio,
    isntSemanticPushableElem: true,
    ...(selectOnFocusing && {
      onFocus: clickRadio,
    }),
  })

  return {
    ...rest,
    radioPropList: buttonPropList,
  }
}

export { useRadio }
