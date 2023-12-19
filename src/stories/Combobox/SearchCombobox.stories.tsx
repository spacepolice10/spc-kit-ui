import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SearchCombobox } from "../../../lib/combobox/search_combobox";

const meta = {
	title: "Combobox/SearchCombobox",
	component: SearchCombobox,
	tags: ["autodocs"],
} satisfies Meta<typeof SearchCombobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: StoryObj<typeof SearchCombobox> = {
	args: {},
	render: function Render() {
		const data = [
			{ id: "Heart 🫀" },
			{ id: "Smile 😅" },
			{ id: "👻" },
			{ id: "😺" },
			{ id: "🇰🇬" },
			{ id: "🪝" },
			{ id: "🌇" },
		];
		const [query, setQuery] = useState("");
		const filter = data?.filter(
			({ id }) =>
				query.length &&
				id.toLowerCase().includes(query.toLocaleLowerCase())
		);
		return (
			<SearchCombobox
				label="SearchCombobox"
				data={filter}
				value={query}
				onInput={setQuery}
			>
				<SearchCombobox.Searchform />
				<SearchCombobox.Result>
					{({}) =>
						filter?.map(({ id }) => (
							<button
								className="border w-42 my-2 p-2"
								key={id}
							>
								{id}
							</button>
						))
					}
				</SearchCombobox.Result>
			</SearchCombobox>
		);
	},
};
