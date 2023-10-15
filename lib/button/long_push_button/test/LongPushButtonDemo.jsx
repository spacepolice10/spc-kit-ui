import { LongPushButton } from "../components/LongPushButton";

const LongPushButtonDemo = () => {
	return (
		<LongPushButton
			className={({ isPushed }) =>
				`${
					isPushed && "scale-105"
				} button !bg-pastelPink hover:brightness-95`
			}
			onPush={() => alert("that was long")}
			delay={800}>
			Push it longer
		</LongPushButton>
	);
};

export { LongPushButtonDemo };
