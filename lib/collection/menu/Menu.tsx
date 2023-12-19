import {
	Children,
	ReactNode,
	RefObject,
	createContext,
	useContext,
} from "react";
import {
	useButton,
	useButtonType,
} from "../../button/button";
import {
	useMenu,
	useMenuReturnType,
	useMenuType,
} from "./useMenu";

export type MenuType<T> = {
	children: ReactNode[];
	className?: string;
} & useMenuType<T>;

export type MenuButtonType = {
	children:
		| ReactNode
		| (({ isShow }: { isShow: boolean }) => ReactNode);
	className?: string;
} & useButtonType;

export type MenuBodyType = {
	children:
		| ReactNode
		| (({ hide }: { hide: () => void }) => ReactNode);
	className?: string;
};

const MenuCtxt = createContext({} as useMenuReturnType);
const useMenuCtxt = () => useContext(MenuCtxt);

const Menu = <T extends { id: string }>(
	propList: MenuType<T>
) => {
	const { children, className, ...restPropList } = propList;
	const menuPropList = useMenu(restPropList);
	const { isShow } = menuPropList;
	const [button, body] = Children.toArray(children);
	return (
		<MenuCtxt.Provider value={menuPropList}>
			<div className={className}>
				{isShow && (
					<div
						style={{
							position: "fixed",
							inset: 0,
							width: "100%",
							height: "100vh",
							zIndex: 9998,
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

const MenuButton = (propList: MenuButtonType) => {
	const { children, className, ...restPropList } = propList;
	const { triggerRef, isShow, show, hide } = useMenuCtxt();
	const { buttonPropList } = useButton({
		onPress: () => (isShow ? hide() : show()),
		...restPropList,
	});
	const ref =
		triggerRef as unknown as RefObject<HTMLButtonElement>;
	return (
		<button
			className={className}
			ref={ref}
			{...buttonPropList}
		>
			{typeof children == "function"
				? children({ isShow })
				: children}
		</button>
	);
};

const MenuBody = (propList: MenuBodyType) => {
	const { children, className, ...restPropList } = propList;
	const { menuPropList, hide } = useMenuCtxt();
	return (
		<div className={className} {...menuPropList}>
			{typeof children == "function"
				? children({ hide })
				: children}
		</div>
	);
};

const MenuExport = Object.assign(Menu, {
	Button: MenuButton,
	Body: MenuBody,
});

export { MenuExport as Menu };
