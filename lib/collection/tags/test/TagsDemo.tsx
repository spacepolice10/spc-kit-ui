import { Plus, Tag, X } from "@phosphor-icons/react";
import { ReactNode, useState } from "react";
import Demo from "../../../../src/demo/Demo";
import { useButtonType } from "../../../button/button";
import { useButton } from "../../../main";
import { Tags } from "../Tags";

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

function TagsDemoElem() {
	const [tags, setTags] = useState<{ id: string }[]>([
		{ id: "Sample chip" },
		{ id: "Cake" },
		{ id: "Chip with ????" },
		{ id: "Fish & chip" },
	]);

	return (
		<>
			<Tags
				items={tags}
				onChange={setTags}
				className="flex border rounded-lg p-2 flex-wrap gap-2 items-start justify-start h-32 overflow-scroll"
			>
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
			</Tags>
			<div>
				<button
					className="button !text-white"
					onClick={() =>
						setTags((state) =>
							state.concat({
								id: window.crypto
									.randomUUID()
									.slice(-4)
									.toString(),
							})
						)
					}
				>
					<Plus />
					Add tag
				</button>
			</div>
		</>
	);
}

export default function TagsDemo() {
	return (
		<Demo name="useTags, Tags" desc="" Icon={Tag}>
			<TagsDemoElem />
		</Demo>
	);
}
