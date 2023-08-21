import { CSSProperties, RefObject, useEffect, useMemo, useRef } from "react";
import { useMove, useMoveType } from "../../../interactions/move/hook/useMove";
import {
  useHover,
  useHoverType,
} from "../../../interactions/hover/hook/useHover";
import {
  useFocus,
  useFocusType,
} from "../../../interactions/focus/hook/useFocus";

export type useSliderType = {
  minVal?: number;
  maxVal: number;
  defVal?: number;
  axis?: "x" | "y";
  onChange?: (value: number) => void;
  onChangeFinishes?: (value: number) => void;
};

export type useSlideType = {
  ref: RefObject<HTMLDivElement>;
  style: CSSProperties;
} & useHoverType &
  useFocusType &
  useMoveType;

const useSlider = (props: useSliderType) => {
  const { maxVal, defVal, onChange, onChangeFinishes, axis = "x" } = props;
  const slideRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const unit = { x: "offsetWidth", y: "offsetHeight" }[axis] as
    | "offsetWidth"
    | "offsetHeight";
  function offsetSliderByPush(ev: React.MouseEvent) {
    const thumb = thumbRef.current;
    if (!thumb) return;
    const sliderOffsetLeft = ev.currentTarget?.getBoundingClientRect()?.left;
    const halfOfThumbWidth = thumb.clientWidth / 2;
    setCoords((state) => {
      return {
        x: ev.clientX - (sliderOffsetLeft + halfOfThumbWidth),
        y: state.y,
      };
    });
  }
  function offsetSlider(value: number) {
    const slideUnitAmount = slideRef?.current?.[unit] ?? 0;
    const thumbUnitAmount = thumbRef?.current?.[unit] ?? 0;
    const offset =
      ((slideUnitAmount - thumbUnitAmount) * ((value * 100) / maxVal)) / 100;
    const thumb = thumbRef.current;
    if (!thumb) return;
    thumb.style.left = `${offset}px`;
  }

  const { setCoords, coords, movePropList } = useMove({
    onMoveFinishes: () => onChangeFinishes?.(value),
  });
  const value = useMemo(() => {
    const coordsDirections = { x: "x", y: "y" };
    const chosenDirections = coordsDirections[axis] as "x" | "y";
    const slideUnitAmount = slideRef?.current?.[unit] ?? 0;
    const thumbUnitAmount = thumbRef?.current?.[unit] ?? 0;
    const coord = coords[chosenDirections];
    const value = +(
      (maxVal * ((coord / (slideUnitAmount - thumbUnitAmount)) * 100)) /
      100
    ).toFixed(0);
    return isNaN(value) ? defVal ?? 0 : value;
  }, [coords]);

  useEffect(() => {
    if (!defVal) return;
    offsetSlider(defVal);
  }, [defVal]);

  useEffect(() => {
    if (!onChange || !value) return;
    onChange?.(value);
  }, [onChange, value]);

  const { isHovered, hoverPropList } = useHover();
  const { isFocused, focusPropList } = useFocus();

  const slidePropList = {
    onMouseDown: offsetSliderByPush,
    ref: slideRef,
    style: {
      display: "flex",
      alignItems: "center",
      position: "relative",
      padding: 0,
      margin: 0,
      touchAction: "none",
    } as CSSProperties,
  };
  const thumbPropList = {
    ...movePropList,
    ...hoverPropList,
    ...focusPropList,
    ref: thumbRef,
    style: {
      display: "block",
      position: "absolute",
      left: axis == "x" ? `${coords.x}px` : "auto",
      top: axis == "y" ? `${coords.y}px` : "auto",
    } as CSSProperties,
  } as useSlideType;

  return {
    value,
    slidePropList,
    thumbPropList,
    isHovered,
    isFocused,
  };
};

export { useSlider };
