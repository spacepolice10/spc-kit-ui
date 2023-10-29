import {
	Children,
	MutableRefObject,
	ReactElement,
	ReactNode,
	cloneElement,
	createContext,
	useContext,
} from "react";
import { useButton } from "../../../main";
import {
	useMenu,
	useMenuReturnType,
	useMenuType,
} from "./useMenu";

const MenuCtxt = createContext({} as useMenuReturnType);

type MenuType<T> = useMenuType<T> & {
	children: ReactNode[];
	className?: string;
};
const Menu = <T extends { id: string }>(
	props: MenuType<T>
) => {
	const { children, ...restPropList } = props;
	const { isShow, hide, ...rest } = useMenu(restPropList);
	const [button, ...body] = Children.toArray(children);
	return (
		<MenuCtxt.Provider value={{ isShow, hide, ...rest }}>
			<div style={{ position: "relative" }}>
				{isShow && (
					<div
						style={{
							position: "fixed",
							inset: 0,
							width: "100%",
							height: "100vh",
							background: "none",
							cursor: "default",
						}}
					></div>
				)}
				{button}
				{isShow && body}
			</div>
		</MenuCtxt.Provider>
	);
};

/**
 *
 * @param {import('../../../button/button/components/Button').ButtonType
 * &
 * {children: ((isShow: boolean) => ReactNode) | ReactNode}} props
 * @returns
 */
function MenuButton(props) {
	const { show, isShow, menuButtonPropList } =
		useContext(MenuCtxt);
	const { buttonPropList } = useButton({
		role: "button",
		label: "button",
		title: "menu button",
		onPush: show,
	});
	const ref =
		menuButtonPropList.ref as MutableRefObject<HTMLButtonElement>;
	return (
		<button ref={ref} {...buttonPropList}>
			{typeof props.children == "function"
				? props?.children(isShow ?? false)
				: props?.children}
		</button>
	);
}

/**
 *
 * @param {object} props
 * @param {((hide: () => void) => ReactNode)} props.children
 * @param {string} props.className
 * @returns
 */
function MenuBody(props) {
	const { className, children } = props;
	const { menuPropList, isInverted, hide } =
		useContext(MenuCtxt);
	return (
		<div {...menuPropList} className={className}>
			{[
				isInverted
					? Children.toArray(children).reverse()
					: Children.toArray(children),
			].flatMap((elemList) => {
				return elemList.map((item) => {
					const elem = item as ReactElement;
					return cloneElement(elem, { hide });
				});
			})}
		</div>
	);
}

export { Menu, MenuBody, MenuButton };
