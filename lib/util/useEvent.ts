type useEventType<T> = {
	ev: T;
	callback: (ev: T) => void;
};

const useEvent = <T>(propList: useEventType<T>) => {
	const { ev, callback } = propList;
	return { ev: callback };
};
