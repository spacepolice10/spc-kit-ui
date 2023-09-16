import { Children, ReactNode, useContext } from "react";
import { MenuCtxt, useMenu, useMenuType } from "../hook/useMenu";

export type MenuType<T> = useMenuType<T> & { children: ReactNode[] };

const Menu = <T extends { id: string }>(props: MenuType<T>) => {
  const { isShow, hide, ...ctxtPropList } = useMenu(props);
  const [button, ...body] = Children.toArray(props?.children);
  return (
    <MenuCtxt.Provider value={ctxtPropList}>
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

function Button({ children }: { children: ReactNode }) {
  const { menuTriggerPropList } = useContext(MenuCtxt);
  return <button {...menuTriggerPropList}>{children}</button>;
}

function Body({
  children,
  className,
}: {
  children: ReactNode[];
  className: string;
}) {
  const { menuPropList, isInverted } = useContext(MenuCtxt);
  return (
    <div tabIndex={-1} className={className} {...menuPropList}>
      {isInverted
        ? Children.toArray(children).reverse()
        : Children.toArray(children)}
    </div>
  );
}

export { Menu, Button, Body };
