export type useFilterType<T> = {
	items: T[];
	query: string;
	filter: (items: T[], query: string) => T[];
};

const useFilter = <T>(propList: useFilterType<T>) => {
	const { items, query, filter } = propList;
	return filter(items, query);
};

export { useFilter };
