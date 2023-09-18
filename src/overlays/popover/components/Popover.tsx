import { Children, ReactNode, RefObject, useContext } from "react";
import { stylesType } from "../../../util/stylesType";
import { PopoverContext, usePopover, usePopoverType } from "../hook/usePopover";
import { Button, ButtonType } from "../../../button/button/components/Button";

export type PopoverType = stylesType &
  usePopoverType & {
    children: ReactNode;
  };
const Popover = (props: PopoverType) => {
  const { children } = props;
  const { isShow, show, hide, triggerRef, popoverPropList } = usePopover(props);
  const [button, body] = Children.toArray(children);
  return (
    <PopoverContext.Provider value={{ isShow, triggerRef, show, hide }}>
      <div style={{ position: "relative" }}>
        {isShow && (
          <button
            style={{
              position: "fixed",
              inset: 0,
              width: "100%",
              height: "100vh",
              background: "none",
              cursor: "default",
            }}
            onClick={hide}
          ></button>
        )}
        {button}
        <div {...popoverPropList}>{isShow && body}</div>
      </div>
    </PopoverContext.Provider>
  );
};

function Trigger(
  props: ButtonType & {
    children: ((isShow: boolean) => ReactNode) | ReactNode;
  }
) {
  const { show, isShow, triggerRef } = useContext(PopoverContext);
  const ref = triggerRef as RefObject<HTMLButtonElement>;
  return (
    <Button {...props} ref={ref} onPush={show}>
      {typeof props.children == "function"
        ? props?.children(isShow ?? false)
        : props?.children}
    </Button>
  );
}

function Content({
  children,
}: {
  children: ((hide: () => void) => ReactNode) | ReactNode;
}) {
  const { hide } = useContext(PopoverContext);
  return <>{typeof children == "function" ? children(hide) : children}</>;
}

export { Popover, Trigger, Content };
