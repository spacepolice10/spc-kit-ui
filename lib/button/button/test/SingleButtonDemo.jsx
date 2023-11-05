import { Button } from "../Button";

const SingleButtonDemo = () => {
	return (
		<>
			<Button
				className="button"
				onHover={() => console.log("hovered")}
				onPush={() => alert("hey")}
			>
				Push it
			</Button>
		</>
	);
};

export { SingleButtonDemo };
