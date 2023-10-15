import { Button } from "../components/Button";

const SingleButtonDemo = () => {
	return (
		<>
			<Button className="button" onPush={() => alert("hey")}>
				Push it
			</Button>
		</>
	);
};

export { SingleButtonDemo };
