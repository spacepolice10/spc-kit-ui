import { Children, ReactNode, useContext } from "react";
import { stylesType } from "../../../util/stylesType";
import { OverlayContext, useOverlay, useOverlayType } from "../hook/useOverlay";
import { createPortal } from "react-dom";
import { Button, ButtonType } from "../../../button/button/components/Button";

export type OverlayType = stylesType &
  useOverlayType & {
    children: ReactNode;
  };

const Overlay = (props: OverlayType) => {
  const { children, className } = props;
  const { isShow, hide, overlayTriggerCallback, overlayBackgroundPropList } =
    useOverlay(props);
  const [button, body] = Children.toArray(children);
  return (
    <OverlayContext.Provider value={{ overlayTriggerCallback, hide }}>
      {props?.isShow == undefined && button}
      {isShow && typeof document == "object" ? (
        createPortal(
          <div className={className as string} {...overlayBackgroundPropList}>
            {body ?? button}
          </div>,
          document.body
        )
      ) : (
        <></>
      )}
    </OverlayContext.Provider>
  );
};

function Trigger(props: ButtonType & { children: ReactNode }) {
  const { overlayTriggerCallback } = useContext(OverlayContext);
  return (
    <Button {...props} onPush={overlayTriggerCallback}>
      {props?.children}
    </Button>
  );
}

function Content({
  children,
}: {
  children: ((hide: () => void) => ReactNode) | ReactNode;
}) {
  const { hide } = useContext(OverlayContext);
  return <>{typeof children == "function" ? children(hide) : children}</>;
}

export { Overlay, Trigger, Content };
