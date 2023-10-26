import {
	CSSProperties,
	HTMLAttributes,
	MutableRefObject,
} from "react";

type mergePropsType<T> = {
	ref?: MutableRefObject<T>;
} & HTMLAttributes<T>;

const mergeProps = <T>(propList: mergePropsType<T>[]) => {
	let mergedStyles = {} as { style: CSSProperties };
	let mergedRefs = {} as { ref: (elem: T) => void };
	let mergedCallback = {};
	let mergedPropList = {};
	for (const prop of propList) {
		for (const item in prop) {
			if (item == "style") {
				Object.assign(mergedStyles, { [item]: prop[item] });
			}
			if (item == "ref") {
				const r = prop[item] as
					| MutableRefObject<T>
					| ((elem: T) => void);
				const callback = (elem: T) => {
					if (typeof r == "function") {
						r(elem);
					} else if (r != null) {
						r.current = elem;
					}
				};
				Object.assign(mergedRefs, callback);
			}
			if (item[0] == "o" && item[1] == "n") {
				Object.assign(mergedCallback, {
					[item]: prop[item],
				});
			}
			if (typeof item != "undefined") {
				Object.assign(mergedPropList, { [item]: prop[item] });
			}
		}
	}
	return {
		...mergedStyles,
		...mergedRefs,
		...mergedCallback,
		...mergedPropList,
	};
};

export { mergeProps };
