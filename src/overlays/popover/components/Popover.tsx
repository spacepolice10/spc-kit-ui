import { Children, ReactNode, useContext } from "react";
import { stylesType } from "../../../util/stylesType";
import { PopoverContext, usePopover, usePopoverType } from "../hook/usePopover";

export type PopoverType = stylesType &
  usePopoverType & {
    children: ReactNode;
  };
const Popover = (props: PopoverType) => {
  const { children } = props;
  const {
    isShow,
    hide,
    wrapperPropList,
    popoverPropList,
    popoverTriggerPropList,
  } = usePopover(props);
  const [button, body] = Children.toArray(children);
  return (
    <div style={{ position: "relative" }}>
      <PopoverContext.Provider value={popoverTriggerPropList}>
        <div {...wrapperPropList}>
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
    </div>
  );
};

function Trigger({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const popoverTriggerPropList = useContext(PopoverContext);
  return (
    <button className={className} {...popoverTriggerPropList}>
      {children}
    </button>
  );
}

export { Popover, Trigger };
