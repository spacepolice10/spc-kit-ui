import { useSelectMenu } from "./useSelectMenu";

const SelectMenu = (propList) => {
	const items = [{ id: "test24", isSelected: false }];
	const {
		selectMenuPropList,
		selectMenuButtonPropList,
		isShow,
	} = useSelectMenu({
		items,
	});
	console.log(selectMenuPropList);
	return (
		<div className="relative">
			<button {...selectMenuButtonPropList}>Test</button>
			{isShow && (
				<div {...selectMenuPropList}>
					{items.map((item) => item.id)}
				</div>
			)}
		</div>
	);
};

export { SelectMenu };
