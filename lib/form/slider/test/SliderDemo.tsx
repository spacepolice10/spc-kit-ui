import { useMemo, useState } from "react";
import { Slider, Thumb } from "../components/Slider";

export default function SliderDemo() {
	const [contrast, setContrast] = useState(0);
	const [brightness, setBrightness] = useState(0);
	const params = useMemo(
		() => ({
			filter: `contrast(${contrast / 100}) brightness(${
				brightness / 100
			})`,
		}),
		[contrast, brightness]
	);
	return (
		<div className="w-full flex flex-col gap-8 my-2">
			<div className="flex gap-4">
				<div className="border-white outline outline-prim border-2 rounded-lg overflow-hidden">
					<img
						src="/girl.jpg"
						alt="Photo of `a girl glaring at photos` by Andrey K"
						className="w-32 h-44 object-cover "
						style={params}
					/>
				</div>
				<p>
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
			<div className="w-full">
				<div className="flex gap-2 mb-2">
					<p>contrast — </p>
					<p className="text-pastelGray">{contrast}</p>
				</div>
				<Slider
					onChange={setContrast}
					className="bg-pastelGray w-full h-1 rounded-sm"
					defVal={70}
					maxVal={140}
				>
					<Thumb className="h-4 w-2 bg-prim rounded-sm"></Thumb>
				</Slider>
			</div>
			<div className="w-full">
				<div className="flex gap-2 mb-2">
					<p>brightness — </p>
					<p className="text-pastelGray">{brightness}</p>
				</div>
				<Slider
					onChange={setBrightness}
					className="bg-pastelGray w-full h-1 rounded-sm"
					defVal={100}
					maxVal={140}
				>
					<Thumb className="h-4 w-2 bg-prim rounded-sm"></Thumb>
				</Slider>
			</div>
		</div>
	);
}
