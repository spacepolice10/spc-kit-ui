import { useLongPushButton } from "./useLongPushButton";

/**
 * @typedef {import("./useLongPushButton").useLongPushButtonType} useLongPushButtonType
 * @typedef LongPushButtonType
 * @property {string} [className]
 * @property {object} children
 * @property {({isHovered}) => ReactNode} children.isHovered
 * @property {({isFocused}) => ReactNode} children.isFocused
 * @property {({isPushed}) => ReactNode} children.isPushed
 * @property {({isDisabled}) => ReactNode} children.isDisabled
 * @returns
 */

/**
 * @type {React.FC<LongPushButtonType & useLongPushButtonType>}
 * @returns
 */
const LongPushButton = (props) => {
	const { className, children, ...restPropList } = props;
	const {
		isLongPushed,
		isFocused,
		isHovered,
		longPushButtonPropList,
	} = useLongPushButton(restPropList);
	return (
		<button
			className={
				typeof className != "function"
					? className
					: className?.({
							isPushed: isLongPushed,
							isHovered,
							isFocused,
					  })
			}
			{...longPushButtonPropList}
		>
			{typeof children != "function"
				? children
				: children?.({
						isPushed: isLongPushed,
						isHovered,
						isFocused,
				  })}
		</button>
	);
};

export { LongPushButton };
