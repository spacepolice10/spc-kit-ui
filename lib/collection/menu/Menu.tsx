import {
	Children,
	MutableRefObject,
	ReactElement,
	ReactNode,
	cloneElement,
	createContext,
	useContext,
} from "react";
import { useButtonType } from "../../button/button";
import { useButton } from "../../main";
import { pushPropListType } from "../../util/pushChildrenType";
import {
	useMenu,
	useMenuReturnType,
	useMenuType,
} from "./useMenu";

const MenuCtxt = createContext({} as useMenuReturnType);

type MenuType<T> = useMenuType<T> & {
	children: ReactNode[];
};
const Menu = <T extends { id: string }>(
	props: MenuType<T>
) => {
	const { children, ...restPropList } = props;
	const menuPropList = useMenu(restPropList);
	const [button, body] = Children.toArray(children);
	return (
		<MenuCtxt.Provider value={menuPropList}>
			<div style={{ position: "relative" }}>
				{menuPropList.isShow && (
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
				{menuPropList.isShow && body}
			</div>
		</MenuCtxt.Provider>
	);
};

type MenuButtonType = useButtonType & pushPropListType;

function MenuButton(propList: MenuButtonType) {
	const { show, isShow, menuButtonPropList } =
		useContext(MenuCtxt);
	const { buttonPropList } = useButton({
		...propList,
		onPush: show,
	});
	const ref =
		menuButtonPropList.ref as MutableRefObject<HTMLButtonElement>;
	return (
		<button ref={ref} {...buttonPropList}>
			{typeof propList.children == "function"
				? propList?.children({ isShow })
				: propList?.children}
		</button>
	);
}

type MenuBodyType = {
	children: ReactNode[];
	className?: string;
};

function MenuBody(propList: MenuBodyType) {
	const { className, children } = propList;
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

const MenuComponents = Object.assign(Menu, {
	Button: MenuButton,
	Body: MenuBody,
});

export { MenuComponents as Menu };
