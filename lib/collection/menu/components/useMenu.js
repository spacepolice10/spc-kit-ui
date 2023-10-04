import { useMemo } from 'react'
import { usePopover } from '../../../overlays/popover/components/usePopover'
import { useCollection } from '../../collection/components/useCollection'
import { mergeProps } from '../../../util/mergeProps'

/**
 * @typedef useMenuType
 * @type {import("../../collection/components/useCollection").useCollectionType &
 * import("../../../overlays/popover/components/usePopover").usePopoverType
 * }
 */

/**
 *
 * @param {useMenuType} props
 * @returns
 */
const useMenu = (props) => {
  const { items } = props
  const {
    isShow,
    show,
    hide,
    triggerRef,
    popoverPropList,
    isInverted,
  } = usePopover()
  const { collectionPropList } = useCollection({
    items,
    isInverted: props?.isInverted ?? isInverted,
  })

  const memoized = useMemo(
    () => ({
      menuPropList: {
        ...mergeProps([
          popoverPropList,
          collectionPropList,
        ]),
      },
      triggerRef,
      isShow,
      show,
      hide,
      isInverted,
    }),
    [
      collectionPropList,
      hide,
      isInverted,
      isShow,
      popoverPropList,
      show,
      triggerRef,
    ]
  )
  return {
    ...memoized,
  }
}

export { useMenu }
