import { Children, ReactNode, useContext } from "react";
import { TooltipContext, useTooltip, useTooltipType } from "../hook/useTooltip";
import { stylesType } from "../../../util/stylesType";

export type TooltipType = stylesType & useTooltipType & { children: ReactNode };

const Tooltip = (props: TooltipType) => {
  const { children, style } = props;
  const { tooltipPropList, tooltipTriggerPropList, isShow } = useTooltip(props);

  const [button, body] = Children.toArray(children);
  return (
    <div style={{ ...style, position: "relative" }}>
      <TooltipContext.Provider value={tooltipTriggerPropList}>
        {button}
        <div {...tooltipPropList}>{isShow && body}</div>
      </TooltipContext.Provider>
    </div>
  );
};

const Trigger = (props: stylesType & { children: ReactNode }) => {
  const { children, style } = props;
  const tooltipTriggerPropList = useContext(TooltipContext);
  return (
    <button style={style} {...tooltipTriggerPropList}>
      {children}
    </button>
  );
};

export { Tooltip, Trigger };
