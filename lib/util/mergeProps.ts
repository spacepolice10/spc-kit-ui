import {
	CSSProperties,
	HTMLAttributes,
	MutableRefObject,
} from "react";

type mergePropsType<T> = {
	ref?: MutableRefObject<T>;
} & HTMLAttributes<T>;

const mergeProps = <T>(
	propList: mergePropsType<T>[]
): mergePropsType<T> => {
	let mergedStyles = {} as { style: CSSProperties };
	let mergedPropList = {};
	for (const prop of propList) {
		for (const item in prop) {
			if (typeof item != "undefined") {
				Object.assign(mergedPropList, { [item]: prop[item] });
			}
			if (item == "style") {
				Object.assign(mergedStyles, { [item]: prop[item] });
			}
		}
	}

	function generateMergedCallback() {
		let callbackArgs = {};
		let mergedCallback = {};
		propList.forEach((prop) => {
			Object.keys(prop).map((item) => {
				if (item?.[0] == "o" && item?.[1] == "n") {
					if (callbackArgs[item]) {
						Object.assign(callbackArgs, {
							[item]: [...callbackArgs[item], prop[item]],
						});
					} else {
						Object.assign(callbackArgs, {
							[item]: [prop[item]],
						});
					}
				}
			});
			Object.keys(callbackArgs).forEach((item) => {
				Object.assign(mergedCallback, {
					[item]: (ev: Event) => {
						return callbackArgs[item]?.map(
							(callback: (ev: Event) => void) => callback(ev)
						);
					},
				});
			});
		});
		return mergedCallback;
	}
	function generateMergedRefs(): MutableRefObject<T> {
		return {
			ref: (elem: T) =>
				propList.forEach((prop) => {
					if (!prop.ref) return;
					const r = prop.ref as
						| MutableRefObject<T>
						| ((elem: T) => void);
					if (typeof r == "function") {
						r(elem);
					} else if (r != null) {
						r.current = elem;
					}
				}),
		} as unknown as MutableRefObject<T>;
	}
	return {
		...mergedPropList,
		...mergedStyles,
		...generateMergedCallback(),
		...generateMergedRefs(),
	};
};

export { mergeProps };
