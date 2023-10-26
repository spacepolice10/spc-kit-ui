import { useState } from "react";
import { useSearchCombobox } from "../components/useSearchCombobox";

export default function SearchCombobobxDemo() {
	const items = [{ id: "hey" }, { id: "say" }];
	const [query, setQuery] = useState("");
	const result = items.filter((x) => x.id.includes(query));
	const {
		searchComboboxFormPropList,
		searchComboboxResultPropList,
		selectedId,
		isShow,
	} = useSearchCombobox<{
		id: string;
	}>({
		label: "Test searchCombobox",
		onInput: setQuery,
		onSubmit: (x) => console.log(x),
		items: result,
	});
	return (
		<div className="relative">
			<input
				className="textform"
				{...searchComboboxFormPropList}
			/>
			{isShow && !!result.length && (
				<div
					{...searchComboboxResultPropList}
					className="bg-white p-2 z-10 border"
				>
					{result?.map((x) => (
						<button
							className={selectedId == x?.id && "bg-red-400"}
						>
							{x.id}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
