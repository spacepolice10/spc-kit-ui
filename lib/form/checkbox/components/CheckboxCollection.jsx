import { Children } from 'react'
import {
  CheckboxCollectionCtxt,
  useCheckboxCollection,
} from './useCheckboxCollection'

/**
 * @typedef CheckboxCollectionType
 * @type {import("./useCheckboxCollection").useCheckboxCollectionType &
 * {children: ReactNode}}
 */

/**
 *
 * @param {CheckboxCollectionType} props
 * @returns
 */
const CheckboxCollection = (props) => {
  const { className, ...restPropList } = props
  const {
    checkboxCollectionPropList,
    ...restCheckboxCollectionPropList
  } = useCheckboxCollection(restPropList)
  return (
    <CheckboxCollectionCtxt.Provider
      value={restCheckboxCollectionPropList}
    >
      <div
        {...checkboxCollectionPropList}
        className={className}
      >
        {Children.toArray(props?.children).map(
          (elem) => elem
        )}
      </div>
    </CheckboxCollectionCtxt.Provider>
  )
}
export { CheckboxCollection }
