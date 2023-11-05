import {
	CSSProperties,
	RefObject,
	useEffect,
	useRef,
	useState,
} from "react";
import {
	movePropListType,
	useMove,
} from "../../../interactions/move/useMove.ts";

export type useSliderType = {
	value?: number;
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
		const coordsDirections = { x: "x", y: "y" };
		const chosenDirections = coordsDirections[axis];
		if (!thumb) return;
		const halfOfThumbW = thumb.clientWidth / 2;
		const halfOfThumbH = thumb.clientHeight / 2;
		const sliderOffset =
			target?.getBoundingClientRect()?.[chosenDirections];
		const x =
			axis == "x"
				? ev.clientX - (sliderOffset + halfOfThumbW)
				: 0;
		const y =
			axis == "y"
				? ev.clientY - (sliderOffset + halfOfThumbH)
				: 0;
		const singleCoordsUnit = { x, y }[chosenDirections];
		const slideUnitAmount = slideRef?.current?.[unit] ?? 0;
		const thumbUnitAmount = thumbRef?.current?.[unit] ?? 0;
		const val = +(
			(maxVal *
				((singleCoordsUnit /
					(slideUnitAmount - thumbUnitAmount)) *
					100)) /
			100
		).toFixed(0);
		setIsMoving(true);
		onChange?.(val);
		setCoords({ x, y });
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
			[axis]: offset,
		}));
	}

	const {
		setIsMoving,
		setCoords,
		coords,
		isMoving,
		movePropList,
	} = useMove({
		onMove: (coords) => {
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
			setControlledValue(isNaN(value) ? defVal ?? 0 : value);
			onChange?.(value);
		},
		onMoveFinishes: () => onChangeFinishes?.(value),
	});
	const [controlledValue, setControlledValue] =
		useState(defVal);
	const value = props.value ?? controlledValue;

	// useEffect(() => {
	// 	if (!defVal) return;
	// 	offsetSlider(defVal);
	// 	onChange?.(defVal);
	// }, [defVal]);

	useEffect(() => {
		if (isMoving) return;
		offsetSlider(props?.value ?? defVal);
	}, [props?.value]);

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
			cursor: "pointer",
		} as CSSProperties,
	};
	const thumbPropList = {
		...movePropList,
		ref: thumbRef,
		style: {
			cursor: "drag",
			display: "block",
			position: "absolute",
			left: axis == "x" ? `${coords.x}px` : "auto",
			top: axis == "y" ? `${coords.y}px` : "auto",
		} as CSSProperties,
	};

	return {
		value: value ?? controlledValue,
		offsetSlider,
		slidePropList,
		thumbPropList,
	};
};

export { useSlider };
