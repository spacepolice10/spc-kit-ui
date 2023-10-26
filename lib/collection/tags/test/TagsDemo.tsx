import { Plus, Tag, X } from "@phosphor-icons/react";
import { ReactNode, useState } from "react";
import Demo from "../../../../src/demo/Demo";
import { Button } from "../../../main";
import { Tags } from "../components/Tags";

function Chip({
	children,
	id,
	removeTags,
}: {
	children: ReactNode;
	id: string;
	removeTags?: (id: string) => void;
}) {
	return (
		<div>
			<Button
				className="button !rounded-md !bg-pastelGray/20 justify-between hover:!bg-pastelGray/40 !w-fit"
				hoverTitle="Chip"
				onPush={() => removeTags(id)}
			>
				{children}
				<X />
			</Button>
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
						<Chip id={item.id} key={item.id}>
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
