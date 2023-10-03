import { Children } from 'react'
import { RadioGroupCtxt, useRadioGroup } from './useRadioGroup'

/**
 * @typedef RadioGroupType
 * @type {import("./useRadioGroup").useRadioGroupType &
 * {children: ReactNode[]}}
 */

/**
 *
 * @param {RadioGroupType} propList
 * @returns
 */
const RadioGroup = (propList) => {
  const { className, children } = propList

  const { radioGroupPropList, ...restRadioGroupPropList } =
    useRadioGroup(propList)
  return (
    <RadioGroupCtxt.Provider
      value={{ ...propList, ...restRadioGroupPropList }}
    >
      <div {...radioGroupPropList} className={className}>
        {Children.toArray(children).map((elem) => elem)}
      </div>
    </RadioGroupCtxt.Provider>
  )
}
export { RadioGroup }
