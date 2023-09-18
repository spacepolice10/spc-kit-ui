import { Children, ReactNode, useContext } from "react";
import { stylesType } from "../../../util/stylesType";
import { OverlayContext, useOverlay, useOverlayType } from "../hook/useOverlay";
import { createPortal } from "react-dom";
import { Button, ButtonType } from "../../../button/button/components/Button";

export type OverlayType = stylesType &
  useOverlayType & { children: ReactNode; withPortal?: boolean };

const Overlay = (props: OverlayType) => {
  const { children, className } = props;
  const { isShow, overlayTriggerCallback, overlayBackgroundPropList } =
    useOverlay(props);
  const [button, body] = Children.toArray(children);

  return (
    <OverlayContext.Provider value={overlayTriggerCallback}>
      {props?.isShow == undefined && button}
      {isShow && typeof document == "object" ? (
        createPortal(
          <div className={className as string} {...overlayBackgroundPropList}>
            {body ?? Children.toArray(children)[0]}
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
  const overlayTriggerCallback = useContext(OverlayContext);
  return (
    <Button {...props} onPush={overlayTriggerCallback}>
      {props?.children}
    </Button>
  );
}

export { Overlay, Trigger };
