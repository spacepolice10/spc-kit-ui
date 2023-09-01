import { useMailform } from "../hook/useMailform";
import { focusingOnTextform } from "../../util/focusingOnTextform";
import { SearchformType } from "../../searchform/components/Searchform";

export type MailformType<T> = SearchformType<T>;

const Mailform = (props: MailformType<{ id: string; name: string }>) => {
  const { children, classStyle } = props;
  const {
    isShow,
    selectedId,
    filteredData,
    isMail,
    mailResultPropList,
    mailformPropList,
  } = useMailform(props);
  return (
    <div
      style={{ cursor: "text", position: "relative" }}
      className={
        typeof classStyle != "function"
          ? classStyle
          : classStyle?.({ isValid: isMail })
      }
      onClick={focusingOnTextform}
    >
      <input
        {...mailformPropList}
        style={{
          width: "100%",
          border: "none",
          outline: "none",
          background: "none",
        }}
      />
      {isShow && (
        <div {...mailResultPropList}>
          {children?.({
            items: filteredData ?? [],
            selectedId,
          })}
        </div>
      )}
    </div>
  );
};

export { Mailform };
