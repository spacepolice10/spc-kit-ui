import {
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useKeyboard } from '../../../interactions/keyboard/components/useKeyboard'

/**
 * @typedef useOverlayType
 * @property {boolean} isShow
 * @property {boolean} [isInitShow]
 * @property {boolean} [hideOnBackdropPush]
 * @property {boolean} [isScrollBlocking]
 * @property {() => void} [onShow]
 * @property {() => void} [onHide]
 * @property {RefObject<HTMLButtonElement>} [focusingElemOnShow]
 * @property {RefObject<HTMLButtonElement>} [focusingElemOnHide]
 * @returns
 */

export const OverlayContext = createContext({})

/**
 *
 * @param {useOverlayType} props
 * @returns
 */
const useOverlay = (props) => {
  const {
    hideOnBackdropPush,
    onShow,
    onHide,
    isScrollBlocking,
    focusingElemOnHide,
    focusingElemOnShow,
  } = props ?? {}

  const [uncontrolledIsShow, setUncontrolledIsShow] = useState(
    props?.initIsShow
  )
  const isShow = props?.isShow ?? uncontrolledIsShow

  const overlayRef = useRef(null)
  const triggerRef = useRef(null)

  const { keyboardPropList } = useKeyboard({
    Escape: () => hide(),
  })
  function show() {
    setUncontrolledIsShow(true)
    onShow?.()
  }
  function hide() {
    if (!focusingElemOnHide?.current) {
      triggerRef.current?.focus({ preventScroll: true })
    } else {
      focusingElemOnHide.current?.focus({ preventScroll: true })
    }
    setUncontrolledIsShow(false)
    onHide?.()
  }

  useEffect(() => {
    if (!isShow) return
    if (focusingElemOnShow) {
      focusingElemOnShow?.current?.focus()
    } else {
      overlayRef.current?.focus()
    }
  }, [isShow])
  useEffect(() => {
    if (!isShow || !isScrollBlocking) return
    const html = document.querySelector('html')
    if (!html) return
    html.style.overflow = 'hidden'
    return () => {
      html.style.overflow = 'auto'
    }
  }, [isShow])

  const overlayBackgroundPropList = {
    style: {
      padding: 0,
      inset: 0,
      width: '100%',
      height: '100dvh',
    },
    onClick: (ev) => {
      if (ev.target != ev.currentTarget) return
      hideOnBackdropPush && hide()
    },
    ...keyboardPropList,
  }

  const memoized = useMemo(
    () => ({
      hide,
      show,
      triggerRef: focusingElemOnHide ?? triggerRef,
      overlayRef,
    }),
    []
  )

  return {
    isShow: isShow ?? uncontrolledIsShow,
    overlayBackgroundPropList,
    ...memoized,
  }
}

export { useOverlay }
