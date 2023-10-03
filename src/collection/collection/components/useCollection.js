import { useEffect, useState } from 'react'
import { useFocusScope } from '../../../interactions/focus_scope/components/useFocusScope'
import { useKeyboard } from '../../../interactions/keyboard/components/useKeyboard'

/**
 * @typedef useCollectionType
 * @property {[]} items
 * @property {boolean} isControlled
 * @property {boolean} isHorizontal
 * @property {boolean} isInverted
 * @returns
 */

/**
 *
 * @param {useCollectionType} props
 * @returns
 */
const useCollection = (props) => {
  const { items, controlled, isInverted } = props || {}
  const [selectedId, setSelectedId] = useState('')

  const { focusNextElem, focusPrevElem, focusScopePropList } = useFocusScope()
  const [isHorizontal, setIsHorizontal] = useState(false)

  function removeSelectedId() {
    setSelectedId('')
  }
  useEffect(() => {
    const elem = focusScopePropList.ref?.current
    if (!elem) return
    const isFlex = window.getComputedStyle(elem).display == 'flex'
    const isColumn = window.getComputedStyle(elem).flexDirection == 'column'
    setIsHorizontal(props?.isHorizontal ?? (isFlex && !isColumn))
  }, [focusScopePropList, props?.isHorizontal])

  function setSelectedIdPrev(ev) {
    if (controlled) {
      if (!items?.length) return
      if (!selectedId) {
        const id = items?.[items?.length - 1]?.id
        setSelectedId(`${id}`)
      }
      const index = items.findIndex((x) => x?.id == selectedId) - 1
      if (index < 0) return
      const id = items[index]?.id
      setSelectedId(`${id}`)
    } else {
      ev.preventDefault()
      focusPrevElem()
    }
  }
  function setSelectedIdNext(ev) {
    if (controlled) {
      if (!items?.length) return
      if (!selectedId) {
        const id = items?.[0]?.id
        setSelectedId(`${id}`)
      }
      const index = items.findIndex((x) => x?.id == selectedId) + 1
      if (index > items.length - 1) return
      const id = items[index]?.id
      setSelectedId(`${id}`)
    } else {
      ev.preventDefault()
      focusNextElem()
    }
  }

  const { keyboardPropList } = useKeyboard({
    ...(isHorizontal
      ? {
          ArrowLeft: setSelectedIdPrev,
          ArrowRight: setSelectedIdNext,
        }
      : {
          ArrowUp: setSelectedIdPrev,
          ArrowDown: setSelectedIdNext,
        }),
  })
  const collectionPropList = {
    ...keyboardPropList,
    ...focusScopePropList,
  }

  return {
    items: isInverted ? items?.reverse() : items ?? [],
    collectionPropList,
    selectedId,
    setSelectedId,
    removeSelectedId,
  }
}

export { useCollection }
