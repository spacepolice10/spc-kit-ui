import {
  useSearchForm,
  useSearchFormType,
} from "../../searchform/hook/useSearchForm";

export type useMailformType = useSearchFormType<{
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
  const { searchResultPropList, searchFormPropList, ...mailform } =
    useSearchForm({
      ...props,
      data: mailList,
      filter: filterMail,
      onKeyboardSelect: changeMailInForm,
    });
  return {
    mailformPropList: searchFormPropList,
    mailResultPropList: searchResultPropList,
    ...mailform,
    isMail: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(searchFormPropList.value),
  };
};

export { useMailform };
