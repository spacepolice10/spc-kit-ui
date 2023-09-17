import { Children, ReactNode, useContext } from "react";
import { stylesType } from "../../../util/stylesType";
import { OverlayContext, useOverlay, useOverlayType } from "../hook/useOverlay";
import { createPortal } from "react-dom";

export type OverlayType = stylesType &
  useOverlayType & { children: ReactNode; withPortal?: boolean };

const Overlay = (props: OverlayType) => {
  const { children, className } = props;
  const {
    isShow,
    overlayTriggerPropList,
    overlayBackgroundPropList,
    overlayPropList,
  } = useOverlay(props);
  const [button, body] = Children.toArray(children);

  return typeof document == "object" ? (
    createPortal(
      <OverlayContext.Provider value={overlayTriggerPropList}>
        {props?.isShow == undefined && button}
        {isShow && (
          <div className={className as string} {...overlayBackgroundPropList}>
            <div {...overlayPropList}>
              {body ?? Children.toArray(children)[0]}
            </div>
          </div>
        )}
      </OverlayContext.Provider>,
      document?.body
    )
  ) : (
    <></>
  );
};

function Trigger({ children }: { children: ReactNode }) {
  const overlayTriggerPropList = useContext(OverlayContext);
  return <button {...overlayTriggerPropList}>{children}</button>;
}

export { Overlay, Trigger };
