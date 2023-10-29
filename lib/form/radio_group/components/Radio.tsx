import { useButtonType } from "../../../button/button";

import { elementPropListTypeComponents } from "../../../util/useElement";
import { useRadio, useRadioType } from "./useRadio";

type RadioType = useRadioType &
	useButtonType &
	elementPropListTypeComponents;
const Radio = (propList: RadioType) => {
	const { children, className, ...restPropList } = propList;
	const { radioPropList, ...restRadioPropList } =
		useRadio(restPropList);
	return (
		<button
			{...radioPropList}
			className={
				typeof className != "function"
					? className
					: className?.(restRadioPropList)
			}
			onClick={(ev: React.MouseEvent | React.KeyboardEvent) =>
				radioPropList.onClick(ev)
			}
		>
			{typeof children != "function"
				? children
				: children?.(restRadioPropList)}
		</button>
	);
};

export { Radio };
