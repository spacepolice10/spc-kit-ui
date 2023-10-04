import { useEffect, useMemo, useState } from 'react'
import { useTextform } from '../../textform/components/useTextform'
import useDebounce from '../../util/useDebounce'
import { useCollection } from '../../../collection/collection/components/useCollection'
import { usePopover } from '../../../overlays/popover/components/usePopover'
import { useKeyboard } from '../../../interactions/keyboard/components/useKeyboard'

/**
 * @typedef useSearchType
 * @property {{id: string}[]} items
 * @property {string} [value]
 * @property {number} [delay]
 * @property {boolean} [withRelativePosition]
 * @property {boolean} [alwaysShowResult]
 * @property {(args: string) => void} [filter]
 * @property {(args: string) => void} [onInput]
 * @property {(args: string) => void} [onKeyboardSelect]
 */

/**
 *
 * @param {useSearchType & useTextformType} props
 * @returns
 */
const useSearch = (props) => {
  const {
    data,
    val,
    filter,
    delay,
    onKeyboardSelect,
    onInput,
    withRelativePosition,
    alwaysShowResult,
  } = props
  const [controlledText, setControlledText] = useState('')

  const debounceText = useDebounce(
    val ?? controlledText,
    delay ?? 0
  )
  const { textformPropList, value } = useTextform({
    val,
    onInput: onInput ?? setControlledText,
    onFocusLoose: () => hide(),
    ...props,
  })

  const filteredData = useMemo(() => {
    if (!debounceText) return []
    const filtered =
      filter?.(debounceText) ??
      data?.filter((item) =>
        item.name.toUpperCase().includes(debounceText.toUpperCase())
      )
    return filtered
  }, [debounceText, data])
  function removeText() {
    setControlledText('')
  }
  const {
    triggerRef,
    isShow,
    show,
    hide,
    popoverPropList,
    isInverted,
  } = usePopover()
  const {
    items: collectionData,
    selectedId,
    collectionPropList,
  } = useCollection({
    items: filteredData,
    controlled: true,
    isInverted,
  })

  const { keyboardPropList: searchFormKeyboardPropList } =
    useKeyboard({
      Enter: (ev) => {
        ev.preventDefault()
        onKeyboardSelect?.(selectedId)
      },
    })

  const searchFormPropList = {
    ...textformPropList,
    ref: triggerRef,
    onKeyDown: (ev) => {
      if (['ArrowUp', 'ArrowDown'].includes(ev.key)) {
        ev.preventDefault()
      }
      collectionPropList.onKeyDown(ev)
      searchFormKeyboardPropList.onKeyDown(ev)
    },
    value,
  }
  useEffect(() => {
    if (!debounceText) hide()
    show()
  }, [debounceText])

  const searchResultPropList = {
    ...popoverPropList,
    ...(withRelativePosition && {
      style: { position: 'relative' },
    }),
  }

  return {
    searchFormPropList,
    searchResultPropList,
    isShow: alwaysShowResult ? true : isShow,
    filteredData: collectionData,
    selectedId,
    removeText,
  }
}

export { useSearch }
