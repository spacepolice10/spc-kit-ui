import { CSSProperties, MutableRefObject, RefObject } from "react";

export type mergePropsType<T> = {
  ref?: RefObject<T>;
  onKeyDown?: (ev: React.KeyboardEvent) => void;
  style?: CSSProperties;
  tabIndex?: number;
}[];
const mergeProps = <T>(props: mergePropsType<T>) => {
  //styles
  function stylesFunc() {
    const styleLists = props?.map((prop) => prop.style);
    const filterUndefined = styleLists.filter(
      (s) => s != undefined
    ) as unknown as [CSSProperties & { key: string; value: string }];
    const styles = filterUndefined.reduce((styles, prop) => {
      return Object.assign(styles, { [prop?.key]: prop?.value }, {});
    });
    return { ...styles };
  }
  const styles = stylesFunc();

  //refs
  function refs(elem: T) {
    const refs = props.map((prop) => prop.ref) as MutableRefObject<T | null>[];
    refs.forEach((r) => {
      r.current = elem;
    });
  }

  //keyboard action list
  function keys(ev: React.KeyboardEvent) {
    props.forEach((prop) => prop.onKeyDown?.(ev));
  }

  //tabindex
  const tabIndex = props?.[props.length - 1].tabIndex;

  return {
    tabIndex,
    ref: refs,
    onKeyDown: keys,
    style: styles,
  };
};

export { mergeProps };
