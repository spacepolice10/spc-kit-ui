import { useRef, useState } from "react";
import { Overlay, Trigger as OverlayTrigger } from "./Overlay";

export default function OverlayDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>TEST MODAL</button>
      <Overlay classStyle={"background_tint"} hideOnBackdropPush={true}>
        <OverlayTrigger key="button_modal">MODAL TEST</OverlayTrigger>
        <div style={{ backgroundColor: "white", height: 200, width: 200 }}>
          MODAL!
        </div>
      </Overlay>
      <Overlay
        focusingElem={ref}
        onHideCallback={() => setIsOpen(false)}
        initIsShow={false}
        isShow={isOpen}
        hideOnBackdropPush={true}
      >
        <div>
          <div style={{ backgroundColor: "white" }}>MORE MODALS</div>
          <button ref={ref} onClick={() => alert("YO")}>
            YO
          </button>
        </div>
      </Overlay>
    </>
  );
}
