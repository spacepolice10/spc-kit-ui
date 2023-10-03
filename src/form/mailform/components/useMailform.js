import { useSearch } from '../../search/components/useSearch'

const useMailform = (props) => {
  const { val, onKeyboardSelect } = props
  const mailList = [
    { id: '@gmail.com', name: '@gmail.com' },
    { id: '@yandex.ru', name: '@yandex.ru' },
    { id: '@live.com', name: '@live.com' },
    { id: '@icloud.com', name: '@icloud.com' },
  ]
  function filterMail(query) {
    return mailList.map((x) => ({ id: x.id, name: query + x.id }))
  }
  function changeMailInForm(domain) {
    onKeyboardSelect?.(`${val + domain}`)
  }
  const { searchResultPropList, searchFormPropList, ...mailform } =
    useSearch({
      ...props,
      data: mailList,
      filter: filterMail,
      onKeyboardSelect: changeMailInForm,
    })
  return {
    mailformPropList: searchFormPropList,
    mailResultPropList: searchResultPropList,
    ...mailform,
    isMail: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
      searchFormPropList.value
    ),
  }
}

export { useMailform }
