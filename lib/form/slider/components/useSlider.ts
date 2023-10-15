import {
	CSSProperties,
	RefObject,
	useEffect,
	useMemo,
	useRef,
} from "react";
import {
	movePropListType,
	useMove,
} from "../../../interactions/move/components/useMove.ts";

export type useSliderType = {
	minVal?: number;
	maxVal: number;
	defVal?: number;
	axis?: "x" | "y";
	onChange?: (args: number) => void;
	onChangeFinishes?: (args: number) => void;
};

type slidePropListType = {
	onPointerDown: (ev: React.PointerEvent) => void;
	ref: RefObject<HTMLDivElement>;
	style: CSSProperties;
};

type thumbPropListType = {
	ref: RefObject<HTMLDivElement>;
	style: CSSProperties;
} & movePropListType;

export type useSliderReturnType = {
	value: number;
	offsetSlider: (args: number) => void;
	slidePropList: slidePropListType;
	thumbPropList: thumbPropListType;
};

const useSlider = (
	props: useSliderType
): useSliderReturnType => {
	const {
		minVal = 0,
		maxVal,
		defVal = 0,
		axis = "x",
		onChange,
		onChangeFinishes,
	} = props;
	const slideRef = useRef<HTMLDivElement>(null);
	const thumbRef = useRef<HTMLDivElement>(null);
	const unit = { x: "offsetWidth", y: "offsetHeight" }[axis];

	function offsetSliderByPush(ev: React.PointerEvent) {
		if (isMoving) return;
		const target = ev.currentTarget as HTMLElement;
		const thumb = thumbRef.current;
		if (!thumb) return;
		const sliderOffsetLeft =
			target?.getBoundingClientRect()?.left;
		const halfOfThumbWidth = thumb.clientWidth / 2;
		setIsMoving(true);
		setCoords((state) => {
			return {
				x: ev.clientX - (sliderOffsetLeft + halfOfThumbWidth),
				y: state.y,
			};
		});
		setIsMoving(false);
	}
	function offsetSlider(value: number) {
		const thumb = thumbRef.current;
		const slideUnitAmount = slideRef?.current?.[unit] ?? 0;
		const thumbUnitAmount = thumbRef?.current?.[unit] ?? 0;
		const offset =
			((slideUnitAmount - thumbUnitAmount) *
				((value * 100) / maxVal)) /
			100;
		const chosenAxis = { x: "left", y: "top" }[axis];
		thumb.style[chosenAxis] = `${offset}px`;
		setCoords((state) => ({
			...state,
			[axis]: `${offset}px`,
		}));
	}

	const {
		setIsMoving,
		setCoords,
		coords,
		isMoving,
		movePropList,
	} = useMove({
		onMoveFinishes: () => onChangeFinishes?.(value),
	});
	const value = useMemo(() => {
		const coordsDirections = { x: "x", y: "y" };
		const chosenDirections = coordsDirections[axis];
		const slideUnitAmount = slideRef?.current?.[unit] ?? 0;
		const thumbUnitAmount = thumbRef?.current?.[unit] ?? 0;
		const coord = coords[chosenDirections];
		const value = +(
			(maxVal *
				((coord / (slideUnitAmount - thumbUnitAmount)) *
					100)) /
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
	}, [value]);

	const slidePropList = {
		onPointerDown: offsetSliderByPush,
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
		ref: thumbRef,
		style: {
			display: "block",
			position: "absolute",
			left: axis == "x" ? `${coords.x}px` : "auto",
			top: axis == "y" ? `${coords.y}px` : "auto",
		} as CSSProperties,
	};

	return {
		value,
		offsetSlider,
		slidePropList,
		thumbPropList,
	};
};

export { useSlider };
