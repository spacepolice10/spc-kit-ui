import {
  Children,
  cloneElement,
  createContext,
  useContext,
} from 'react'
import { useMenu } from './useMenu'
import { Button } from '../../../button/button/components/Button'

const MenuCtxt = createContext({})

/**
 * @typedef MenuType
 * @type {import('./useMenu').useMenuType}
 */

/**
 *
 * @param {MenuType} props
 * @returns
 */
const Menu = (props) => {
  const { children, ...restPropList } = props
  const { isShow, hide, ...rest } = useMenu(restPropList)
  const [button, ...body] = Children.toArray(children)
  return (
    <MenuCtxt.Provider value={{ isShow, hide, ...rest }}>
      <div style={{ position: 'relative' }}>
        {isShow && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              width: '100%',
              height: '100vh',
              background: 'none',
              cursor: 'default',
            }}
          ></div>
        )}
        {button}
        {isShow && body}
      </div>
    </MenuCtxt.Provider>
  )
}

/**
 *
 * @param {import('../../../button/button/components/Button').ButtonType
 * &
 * {children: ((isShow: boolean) => ReactNode) | ReactNode}} props
 * @returns
 */
function MenuButton(props) {
  const { show, isShow, triggerRef } = useContext(MenuCtxt)
  const ref = triggerRef
  return (
    <Button {...props} ref={ref} onPush={show}>
      {typeof props.children == 'function'
        ? props?.children(isShow ?? false)
        : props?.children}
    </Button>
  )
}

/**
 *
 * @param {object} props
 * @param {((hide: () => void) => ReactNode)} props.children
 * @param {string} props.className
 * @returns
 */
function MenuBody(props) {
  const { className, children } = props
  const { menuPropList, isInverted, hide } = useContext(MenuCtxt)
  return (
    <div className={className} {...menuPropList}>
      {[
        isInverted
          ? Children.toArray(children).reverse()
          : Children.toArray(children),
      ].flatMap((elemList) => {
        return elemList.map((item) => {
          return cloneElement(item, { hide })
        })
      })}
    </div>
  )
}

export { Menu, MenuButton, MenuBody }
