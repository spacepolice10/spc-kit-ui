import { createContext, useMemo } from 'react'
import { useCollection } from '../../../collection/collection/components/useCollection'

const CheckboxCollectionCtxt = createContext({})

/**
 * @typedef useCheckboxCollectionType
 * @type {import("./useCheckbox").useCheckboxType[] &
 * {onChange: () => void}}
 */

/**
 *
 * @param {useCheckboxCollectionType} props
 * @returns
 */
const useCheckboxCollection = (props) => {
  const { collectionPropList } = useCollection({
    items: props?.items,
  })
  const memoized = useMemo(
    () => ({
      ...props,
      checkboxCollectionPropList: collectionPropList,
    }),
    [props]
  )
  return { ...memoized }
}

export { useCheckboxCollection, CheckboxCollectionCtxt }
