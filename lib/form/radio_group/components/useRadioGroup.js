import { createContext, useState } from 'react'
import { useCollection } from '../../../collection/collection/components/useCollection'

const RadioGroupCtxt = createContext({})

/**
 * @typedef useRadioGroupType
 * @property {{id: string, name: string}[]} items
 * @property {(args: string) => void} onChange
 * @property {string} [selectedId]
 * @property {boolean} [selectOnFocusing]
 */

/**
 *
 * @param {useRadioGroupType} props
 * @returns
 */
const useRadioGroup = (props) => {
  const { items, ...restPropList } = props
  const { collectionPropList } = useCollection({
    items,
  })

  const [controlledSelectedId, setControlledSelectedId] = useState(
    props.selectedId ?? ''
  )

  /**
   * fire onChange callback passed with propList & change local state
   * @param {string} id
   */
  function onChange(id) {
    props?.onChange(id)
    setControlledSelectedId(id)
  }

  return {
    ...restPropList,
    radioGroupPropList: collectionPropList,
    selectedId: props.selectedId ?? controlledSelectedId,
    onChange,
  }
}

export { useRadioGroup, RadioGroupCtxt }
