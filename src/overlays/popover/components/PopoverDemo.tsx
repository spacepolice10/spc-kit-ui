import { usePopover } from "../hook/usePopover";

export function PopoverDemo() {
  const { isShow, show, hide, wrapperPropList, popoverPropList, triggerRef } =
    usePopover();
  return (
    <div {...wrapperPropList}>
      {isShow && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            width: "100%",
            height: "100vh",
          }}
          //   className="fixed inset-0 w-full h-screen -z-0"
          onClick={hide}
        ></div>
      )}
      <button ref={triggerRef} onClick={show}>
        YP
      </button>
      <div {...popoverPropList}>
        {isShow && (
          <div style={{ width: 140, backgroundColor: "white" }}>
            LET"S ADD SOME SHITTY CONTENT THERE TO SEE WHAT WILL HAPPEN
          </div>
        )}
      </div>
    </div>
  );
}
