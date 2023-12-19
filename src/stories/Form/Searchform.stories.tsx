import type { Meta, StoryObj } from "@storybook/react";
import { useRef, useState } from "react";

import { Spinner } from "@phosphor-icons/react";
import {
	Searchform,
	useSearchform,
} from "../../../lib/form/searchform";
import "../../index.css";

const meta = {
	title: "Form/Searchform",
	component: Searchform,
	tags: ["autodocs"],
} satisfies Meta<typeof Searchform>;

export default meta;

export const Base: StoryObj<typeof meta> = {
	args: {
		label: "",
	},
	render: function Render() {
		const textRef = useRef("");
		const [text, setText] = useState("");
		return (
			<>
				<Searchform
					label="Basic input"
					onInput={(data) => (textRef.current = data)}
					onSubmit={(data) => setText(data)}
					className={({ isFocused }) =>
						`${
							isFocused && "border-prim border"
						} border rounded-md p-2 font-sans font-light text-textPrim placeholder:text-base placeholder:text-pastelGray`
					}
					placeholder="Basic input"
					focusOnMount={false}
					isDisabled={false}
				/>
				<div className="py-4 flex gap-4">
					<p className="font-bold py-2">{text}</p>
				</div>
			</>
		);
	},
};
export const WithFakeServer: StoryObj<typeof Searchform> = {
	args: {},
	render: function Render() {
		const [value, setValue] = useState("");
		const [value2, setValue2] = useState("");
		async function doAsync(data: string) {
			return new Promise(function (res, rej) {
				setTimeout(() => {
					res(setValue2(data));
				}, 1200);
			});
		}
		const { searchFormPropList, isInProgress } =
			useSearchform({
				label: "Searchform",
				onInput: setValue,
				onCancel: () => {
					setValue("");
				},
				removeOnSubmit: true,
				onSubmitAsync: (data) => doAsync(data),
			});
		console.log(isInProgress);
		return (
			<>
				<div className="flex gap-4 items-center">
					<div className="animate-spin w-4 h-4">
						{isInProgress && <Spinner className="w-4 h-4" />}
					</div>
					<input
						{...searchFormPropList}
						style={{
							width: "100%",
							outline: "none",
						}}
						className="
						border rounded-md p-2 font-sans font-light text-textPrim placeholder:text-base placeholder:text-pastelGray"
					/>
				</div>
				<div className="py-4 gap-4">
					<p className="text-xs text-gray-400">
						synced:
						<span className="font-bold py-2 ml-2 text-black">
							{value}
						</span>
					</p>
					<p className="text-xs text-gray-400">
						asynced:
						<span className="font-bold py-2 ml-2 text-black">
							{value2}
						</span>
					</p>
				</div>
			</>
		);
	},
};
export const WithDebounce: StoryObj<typeof Searchform> = {
	args: {},
	render: function Render() {
		const [value, setValue] = useState("");
		const [value2, setValue2] = useState("");
		async function doAsync(data: string) {
			return new Promise(function (res, rej) {
				setTimeout(() => {
					res(setValue2(data));
				}, 1200);
			});
		}
		const { searchFormPropList, isInProgress } =
			useSearchform({
				label: "Searchform",
				onInput: setValue,
				removeOnSubmit: false,
				value,
				debounce: 400,
				submitOnChange: true,
				onSubmitAsync: (data) => doAsync(data),
			});
		console.log(isInProgress);
		return (
			<>
				<div className="flex gap-4 items-center">
					<div className="animate-spin w-4 h-4">
						{isInProgress && <Spinner className="w-4 h-4" />}
					</div>
					<input
						{...searchFormPropList}
						style={{
							width: "100%",
							outline: "none",
						}}
						className="
						border rounded-md p-2 font-sans font-light text-textPrim placeholder:text-base placeholder:text-pastelGray"
					/>
				</div>
				<div className="py-4 gap-4">
					<p className="text-xs text-gray-400">
						synced:
						<span className="font-bold py-2 ml-2 text-black">
							{value}
						</span>
					</p>
					<p className="text-xs text-gray-400">
						asynced:
						<span className="font-bold py-2 ml-2 text-black">
							{value2}
						</span>
					</p>
				</div>
			</>
		);
	},
};
