/**
 * Universal component that represents spc-kit-ui via special playground interactive blocks
 * @param {object} props
 * @param {string} props.name
 * @param {ForwardRefExoticComponent<IconProps>} props.Icon
 * @param {string} [props.desc]
 * @param {ReactNode} props.children
 * @returns
 */
export default function Demo(props) {
	const { name, Icon, desc, children } = props;
	return (
		<>
			<div className="demo_section">
				<div className="flex justify-between items-center">
					<h4>{name}</h4>
					<div className="right-2 top-2">
						<Icon size={44} className="text-pastelGray" />
					</div>
				</div>
				<p>{desc}</p>
				{children}
			</div>
		</>
	);
}
