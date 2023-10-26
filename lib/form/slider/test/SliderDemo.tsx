import { useMemo, useState } from "react";
import { Button } from "../../../main";
import { Slider, Thumb } from "../components/Slider";

export default function SliderDemo() {
	const [contrast, setContrast] = useState(100);
	const [brightness, setBrightness] = useState(100);
	const [hue, setHue] = useState(0);
	const [saturate, setSaturate] = useState(100);
	const params = useMemo(
		() => ({
			filter: `contrast(${contrast / 100}) brightness(${
				brightness / 100
			}) hue-rotate(${hue}deg) saturate(${saturate / 100})`,
		}),
		[contrast, brightness, saturate, hue]
	);
	return (
		<div className="w-full flex flex-col gap-8 p-2 border">
			<div className="flex gap-4">
				<div className="overflow-hidden">
					<div className="border-white h-[208px] overflow-hidden">
						<img
							src="/girl.jpg"
							alt="Photo of `a girl glaring at photos` by Andrey K"
							className="w-40 h-52 object-cover "
							style={params}
						/>
					</div>
					<p className="mt-4">
						Photo by{" "}
						<a
							className="text-prim hover:underline"
							href="https://unsplash.com/@anamnesis33?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
						>
							Andrey K
						</a>{" "}
						on{" "}
						<a
							className="text-prim hover:underline"
							href="https://unsplash.com/photos/cvdL6SHoAE8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
						>
							Unsplash
						</a>
					</p>
				</div>
				<div className="flex flex-col gap-4 w-10/12">
					<div className="w-full">
						<div className="flex gap-2 mb-2">
							<p>contrast — </p>
							<p className="text-pastelGray">{contrast}</p>
						</div>
						<Slider
							value={contrast}
							onChange={setContrast}
							className="bg-pastelGray w-full h-1 rounded-sm "
							defVal={100}
							maxVal={140}
						>
							<Thumb className="h-4 w-2 bg-prim rounded-sm focus:border-textPrim border"></Thumb>
						</Slider>
					</div>
					<div className="w-full">
						<div className="flex gap-2 mb-2">
							<p>brightness — </p>
							<p className="text-pastelGray">{brightness}</p>
						</div>
						<Slider
							value={brightness}
							onChange={setBrightness}
							className="bg-pastelGray w-full h-1 rounded-sm "
							defVal={100}
							maxVal={140}
						>
							<Thumb className="h-4 w-2 bg-prim rounded-sm focus:border-textPrim border"></Thumb>
						</Slider>
					</div>
					<div className="w-full">
						<div className="flex gap-2 mb-2">
							<p>saturate — </p>
							<p className="text-pastelGray">{saturate}</p>
						</div>
						<Slider
							value={saturate}
							onChange={setSaturate}
							className="bg-pastelGray w-full h-1 rounded-sm "
							defVal={100}
							maxVal={140}
						>
							<Thumb className="h-4 w-2 bg-prim rounded-sm focus:border-textPrim border"></Thumb>
						</Slider>
					</div>
					<div className="w-full">
						<div className="flex gap-2 mb-2">
							<p>hue — </p>
							<p className="text-pastelGray">{hue}</p>
						</div>
						<Slider
							value={hue}
							onChange={setHue}
							className="bg-pastelGray w-full h-1 rounded-sm "
							defVal={20}
							maxVal={140}
						>
							<Thumb className="h-4 w-2 bg-prim rounded-sm focus:border-textPrim border"></Thumb>
						</Slider>
					</div>
					<div className="w-full justify-end">
						<Button
							hoverTitle="Reset"
							onPush={() => {
								setContrast(100);
								setBrightness(100);
								setHue(0);
								setSaturate(100);
							}}
							className="text-pastelGray hover:!bg-pastelGray/20 p-1 rounded-md font-mono italic uppercase ml-auto"
						>
							Reset
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
