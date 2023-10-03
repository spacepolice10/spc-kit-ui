import { useState } from 'react'
import { useTextform } from '../../textform/components/useTextform'

/**
 * @typedef useNumberformType
 * @property {string} [defVal]
 * @property {number} [step]
 */

/**
 *
 * @param {useNumberformType} props
 * @returns
 */
const useNumberform = (props) => {
  const { defVal, step } = props
  const [number, setNumber] = useState(defVal ?? '0')

  function increm() {
    setNumber((state) => `${+state + (step ?? 10)}`)
  }
  function decrem() {
    setNumber((state) => `${+state - (step ?? 10)}`)
  }

  const { textformPropList, isHovered, isFocused } = useTextform({
    onInput: (text) => setNumber(text),
  })
  const numberformPropList = {
    ...textformPropList,
    type: 'number',
    value: number,
  }
  return {
    number,
    increm,
    decrem,
    numberformPropList,
    isHovered,
    isFocused,
  }
}

export { useNumberform }
