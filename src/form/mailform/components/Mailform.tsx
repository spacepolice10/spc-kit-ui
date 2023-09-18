import { useMailform } from "../hook/useMailform";
import { focusingOnTextform } from "../../util/focusingOnTextform";
import { TextformType } from "../../textform/components/Textform";
import { useSearchFormType } from "../../searchform/hook/useSearchForm";
import { ReactNode } from "react";

export type MailformType<T> = TextformType &
  useSearchFormType<T> & {
    children: ({
      items,
      selectedId,
    }: {
      items: T[];
      selectedId: string;
    }) => ReactNode;
  };

const Mailform = (props: MailformType<{ id: string; name: string }>) => {
  const { children, className } = props;
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
        typeof className != "function"
          ? className
          : className?.({ isValid: isMail })
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
