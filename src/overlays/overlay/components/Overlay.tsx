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
    overlayBodyPropList,
  } = useOverlay(props);
  const [button, body] = Children.toArray(children);

  return (
    <OverlayContext.Provider value={overlayTriggerPropList}>
      {props?.isShow == undefined && button}
      {isShow && typeof document == "object" ? (
        createPortal(
          <div className={className as string} {...overlayBackgroundPropList}>
            <div {...overlayBodyPropList}>
              {body ?? Children.toArray(children)[0]}
            </div>
          </div>,
          document.body
        )
      ) : (
        <></>
      )}
    </OverlayContext.Provider>
  );
};

function Trigger({ children }: { children: ReactNode }) {
  const overlayTriggerPropList = useContext(OverlayContext);
  return <button {...overlayTriggerPropList}>{children}</button>;
}

export { Overlay, Trigger };
