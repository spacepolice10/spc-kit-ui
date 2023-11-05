import {
	ListMagnifyingGlass,
	X,
} from "@phosphor-icons/react";
import { ReactNode, useState } from "react";
import Demo from "../../../../src/demo/Demo";
import {
	useButton,
	useButtonType,
} from "../../../button/button";
import { TagsCombobox } from "../TagsCombobox";

export default function TagsComboboxDemo() {
	return (
		<Demo
			name="TagsCombobox"
			desc=""
			Icon={ListMagnifyingGlass}
		>
			<TagsComboboxDemoElem />
		</Demo>
	);
}

function TagsComboboxDemoElem() {
	const [tags, setTags] = useState<{ id: string }[]>([
		{ id: "Sample chip" },
	]);
	return (
		<>
			<TagsCombobox items={tags} onChange={setTags}>
				<div className="textform flex items-center gap-2 flex-wrap">
					<TagsCombobox.Tags className="flex gap-4 flex-wrap">
						{tags.length ? (
							tags.map((item) => (
								<Chip
									id={item.id}
									key={item.id}
									title={item.id}
									label={item.id}
									role="tag"
								>
									{item.id}
								</Chip>
							))
						) : (
							<p>No tags</p>
						)}
						<TagsCombobox.Textform
							label="Tags combobox"
							className="bg-transparent !w-min"
						/>
					</TagsCombobox.Tags>
				</div>
			</TagsCombobox>
		</>
	);
}

function Chip(
	propList: {
		children: ReactNode;
		id: string;
		removeTags?: (id: string) => void;
	} & useButtonType
) {
	const { children, id, removeTags, ...restPropList } =
		propList;
	const { buttonPropList } = useButton(propList);
	return (
		<div>
			<button
				{...buttonPropList}
				className="button !rounded-md !bg-pastelGray/20 justify-between hover:!bg-pastelGray/40 !w-fit"
				title="Chip"
				onClick={() => removeTags(id)}
			>
				{children}
				<X />
			</button>
		</div>
	);
}
