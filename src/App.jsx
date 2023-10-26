import ButtonListDemo from "./demo/ButtonListDemo";
import CollectionListDemo from "./demo/CollectionListDemo";
import ComboboxDemo from "./demo/ComboboxDemo";
import FormDemo from "./demo/FormDemo";
import InteractionsDemo from "./demo/InteractionsDemo";
import OverlaysListDemo from "./demo/OverlaysListDemo";

function App() {
	return (
		<>
			<header className="w-full flex justify-center">
				<div className="max-w-4xl flex justify-start w-full">
					<h1 className="font-bold relative italic text-5xl text-white pl-4 pt-2 mt-4 pb-4 -mb-4 uppercase before:block before:absolute before:-inset-2 before:skew-y-3  before:w-60 before:bg-prim before:-z-10 ">
						spc-kit
					</h1>
				</div>
			</header>
			<div className="max-w-4xl mx-auto">
				{/* <DateDemo /> */}
				<InteractionsDemo />
				<ButtonListDemo />
				<OverlaysListDemo />
				<FormDemo />
				<CollectionListDemo />
				<ComboboxDemo />
			</div>
			{/* <CollectionListDemo /> */}
		</>
	);
}

export default App;
