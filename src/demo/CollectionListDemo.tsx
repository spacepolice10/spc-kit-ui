import MenuDemo from "../../lib/collection/menu/test/MenuDemo";
import SelectMenuDemo from "../../lib/collection/select/test/SelectMenuDemo";
import TagsDemo from "../../lib/collection/tags/test/TagsDemo";

export default function CollectionListDemo() {
	return (
		<section>
			<h2>Collection:</h2>
			<div className="grid sm:grid-cols-2 gap-2">
				<TagsDemo />
				<SelectMenuDemo />
			</div>
			<div className="grid sm:grid-cols-2 gap-2">
				<MenuDemo />
			</div>
			{/* <MenuDemo />
			<GridCollection columnNumber={2}>
				<Button onPush={() => console.log("test")}>😗</Button>
				<Button>😗</Button>
				<Button>😗</Button>
				<Button>{() => "😗"}</Button>
			</GridCollection> */}
		</section>
	);
}
