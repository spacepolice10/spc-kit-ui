import {
  Children,
  cloneElement,
  ReactElement,
  ReactNode,
  RefObject,
  useContext,
} from "react";
import { MenuCtxt, useMenu, useMenuType } from "../hook/useMenu";
import { Button, ButtonType } from "../../../button/button/components/Button";

export type MenuType<T> = useMenuType<T> & { children: ReactNode[] };

const Menu = <T extends { id: string }>(props: MenuType<T>) => {
  const { isShow, hide, ...rest } = useMenu(props);
  const [button, ...body] = Children.toArray(props?.children);
  return (
    <MenuCtxt.Provider value={{ isShow, hide, ...rest }}>
      <div style={{ position: "relative" }}>
        {isShow && (
          <button
            style={{
              position: "fixed",
              inset: 0,
              width: "100%",
              height: "100vh",
              cursor: "default",
              background: "transparent",
            }}
            onClick={hide}
          ></button>
        )}
        {button}
        {isShow && body}
      </div>
    </MenuCtxt.Provider>
  );
};

function MenuButton(
  props: ButtonType & {
    children: ((isShow: boolean) => ReactNode) | ReactNode;
  }
) {
  const { show, isShow, triggerRef } = useContext(MenuCtxt);
  const ref = triggerRef as RefObject<HTMLButtonElement>;
  return (
    <Button {...props} ref={ref} onPush={show}>
      {typeof props.children == "function"
        ? props?.children(isShow ?? false)
        : props?.children}
    </Button>
  );
}

function MenuBody({
  children,
  className,
}: {
  children: ReactNode[];
  className: string;
}) {
  const { menuPropList, isInverted, hide } = useContext(MenuCtxt);
  return (
    <div className={className} {...menuPropList} tabIndex={-1}>
      {[
        isInverted
          ? Children.toArray(children).reverse()
          : Children.toArray(children),
      ].flatMap((elemList) => {
        return elemList.map((item) => {
          const elem = item as ReactElement;
          return cloneElement(elem, { hide });
        });
      })}
    </div>
  );
}

export { Menu, MenuButton, MenuBody };
