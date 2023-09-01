import {
  useSearchform,
  useSearchformType,
} from "../../searchform/hook/useSearchform";

export type useMailformType = useSearchformType<{
  id: string;
  name: string;
}> & { onKeyboardSelect: (args: string) => void };

const useMailform = (props: useMailformType) => {
  const { val, onKeyboardSelect } = props;
  const mailList = [
    { id: "@gmail.com", name: "@gmail.com" },
    { id: "@yandex.ru", name: "@yandex.ru" },
    { id: "@live.com", name: "@live.com" },
    { id: "@icloud.com", name: "@icloud.com" },
  ];
  function filterMail(query: string) {
    return mailList.map((x) => ({ id: x.id, name: query + x.id }));
  }
  function changeMailInForm(domain: string) {
    onKeyboardSelect?.(`${val + domain}`);
  }
  const { searchResultPropList, searchformPropList, ...mailform } =
    useSearchform({
      ...props,
      data: mailList,
      filter: filterMail,
      onKeyboardSelect: changeMailInForm,
    });
  return {
    mailformPropList: searchformPropList,
    mailResultPropList: searchResultPropList,
    ...mailform,
    isMail: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(searchformPropList.value),
  };
};

export { useMailform };
