import {
	CSSProperties,
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";
import clamp from "../../util/clamp";
import { useKeyboard } from "../../keyboard/components/useKeyboard";

/**
 
 * @param onMoveStarts — callback to fire on pointing device down
 * @param onMove — callback to fire on pointing device change position
 * @param onMoveFinishes — callback to fire on pointing device up
 */
export type useMoveType = {
	onMoveStarts?: () => void;
	onMove?: () => void;
	onMoveFinishes?: () => void;
};

type coordsType = { x: number; y: number };

export type movePropListType = {
	onPointerDown: (ev: React.PointerEvent) => void;
	style?: CSSProperties;
	onKeyDown: (ev: React.KeyboardEvent) => void;
};

type useMoveReturnType = {
	setIsMoving: Dispatch<SetStateAction<boolean>>;
	setCoords: Dispatch<SetStateAction<coordsType>>;
	coords: coordsType;
	isMoving: boolean;
	movePropList: movePropListType;
};

const useMove = (props: useMoveType): useMoveReturnType => {
	const { onMoveStarts, onMove, onMoveFinishes } =
		props ?? {};

	/**
	 * this target stored to reference while detecting cursor coordinates
	 */
	const [target, setTarget] =
		useState<HTMLElement>(undefined);
	const [isMoving, setIsMoving] = useState<boolean>(false);
	/**
	 * dynamic coords that represent item's position
	 */
	const [coords, setCoords] = useState<coordsType>({
		x: 0,
		y: 0,
	});
	/**
	 * coords shift helps to preserve correct position of the element under cursor at the initial drag. They must be preserved through rerenders
	 */
	const shift = useRef<coordsType>({ x: 0, y: 0 });

	/**
	 * dimensions of moving element and its parent are necessary to preserve correct position of element inside relative parent
	 */
	function generateDimensions(target: HTMLElement) {
		const dimensions = target?.getBoundingClientRect() ?? {
			width: 0,
			height: 0,
		};
		const parentDimensions =
			target?.parentElement?.getBoundingClientRect() ?? {
				width: 0,
				height: 0,
			};
		return { dimensions, parentDimensions };
	}

	// moving element
	function move({ x, y }: coordsType) {
		setCoords({ x, y });
		onMove?.();
	}

	function detectCursorCoords(ev: PointerEvent) {
		ev.stopPropagation();
		if (!target) return;
		const x = ev.pageX - shift?.current.x;
		const y = ev.pageY - shift?.current.y;
		const { dimensions, parentDimensions } =
			generateDimensions(target);
		const valX = clamp(
			x,
			parentDimensions?.width - dimensions?.width - 2
		);
		const valY = clamp(
			y,
			parentDimensions?.height - dimensions?.height - 2
		);
		return { x: valX, y: valY };
	}

	// moving element with cursor or finger
	function moveWithCursor(ev: PointerEvent) {
		const coords = detectCursorCoords(ev);
		coords && move(coords);
	}

	function handleMoveStarts(ev: React.PointerEvent) {
		ev.stopPropagation();
		const target = ev.target as HTMLElement;
		onMoveStarts?.();
		setTarget(target);
		setIsMoving(true);
		shift.current.x = ev.pageX - target?.offsetLeft;
		shift.current.y = ev.pageY - target?.offsetTop;
	}

	function handleMoveFinishes(event: PointerEvent) {
		event.preventDefault();
		event.stopPropagation();
		console.log("finishes");
		setTarget(undefined);
		setIsMoving(false);
		onMoveFinishes?.();
	}

	// listening to mouse events outside of the box so it will not break if user dragged mouse out of the zone which is seems to be movable. It is just a more natural way to interact with such interface components
	useEffect(() => {
		if (!isMoving) return;
		window.addEventListener("pointermove", moveWithCursor);
		window.addEventListener("pointerup", handleMoveFinishes);
		return () => {
			window.removeEventListener(
				"pointermove",
				moveWithCursor
			);
			window.removeEventListener(
				"pointerup",
				handleMoveFinishes
			);
		};
	});

	// moving with keyboard
	function moveWithKeyboard(
		ev: React.KeyboardEvent,
		moveTo:
			| "ArrowLeft"
			| "ArrowUp"
			| "ArrowRight"
			| "ArrowDown"
	) {
		ev.preventDefault();
		ev.stopPropagation();
		const target = ev.currentTarget as HTMLElement;
		const { dimensions, parentDimensions } =
			generateDimensions(target);
		switch (moveTo) {
			case "ArrowLeft":
				move({
					x: clamp(
						coords.x - 20,
						parentDimensions.width - dimensions.width
					),
					y: coords.y,
				});
				break;
			case "ArrowUp":
				move({
					x: coords.x,
					y: clamp(
						coords.y - 20,
						parentDimensions.height - dimensions.height
					),
				});
				break;
			case "ArrowDown":
				move({
					x: coords.x,
					y: clamp(
						coords.y + 20,
						parentDimensions.height - dimensions.height
					),
				});
				break;
			case "ArrowRight":
				move({
					x: clamp(
						coords.x + 20,
						parentDimensions.width - dimensions.width
					),
					y: coords.y,
				});
				break;
		}
	}

	const { keyboardPropList } = useKeyboard({
		ArrowLeft: (ev) => moveWithKeyboard(ev, "ArrowLeft"),
		ArrowUp: (ev) => moveWithKeyboard(ev, "ArrowUp"),
		ArrowRight: (ev) => moveWithKeyboard(ev, "ArrowRight"),
		ArrowDown: (ev) => moveWithKeyboard(ev, "ArrowDown"),
	});

	// return
	const movePropList = {
		onPointerDown: handleMoveStarts,
		...(matchMedia("(pointer:coarse)").matches && {
			style: { touchAction: "none" },
		}),
		...keyboardPropList,
	};

	return {
		setIsMoving,
		setCoords,
		coords,
		isMoving,
		movePropList,
	};
};

export { useMove };
