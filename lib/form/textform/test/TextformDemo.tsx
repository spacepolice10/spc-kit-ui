import { useState } from "react";
import { Textform } from "../components/Textform";

export default function TextformDemo() {
	const [val, setVal] = useState("");
	return (
		<div className="flex flex-col gap-4 w-full">
			<div className="w-full">
				<p className="mb-2">
					uncontolled doesn't rely on prop data
				</p>
				<Textform
					className={({ isFocused }) =>
						`${
							isFocused && "border-prim border"
						} border rounded-md p-2`
					}
					placeholdingText="Textform placeholding text"
					isFocusTrapsAfterMount={false}
				/>
			</div>
			<div className="w-full">
				<div className="flex gap-2 items-center mb-2">
					<p className="">controlled depends on prop data:</p>
					<div className="w-16 h-4 border  flex items-center overflow-scroll">
						<p>{val}</p>
					</div>
				</div>
				<Textform
					className={({ isFocused }) =>
						`${
							isFocused && "border-prim border"
						} border rounded-md p-2`
					}
					onInput={setVal}
					placeholdingText="Textform placeholding text"
					isFocusTrapsAfterMount={false}
				/>
			</div>
		</div>
	);
}
