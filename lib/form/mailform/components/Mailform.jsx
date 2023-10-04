import { useMailform } from './useMailform'

// export type MailformType<T> = TextformType &
//   useSearchFormType<T> & {
//     children: ({
//       items,
//       selectedId,
//     }: {
//       items: T[]
//       selectedId: string
//     }) => ReactNode
//   }

const Mailform = (props) => {
  const { children, className } = props
  const {
    isShow,
    selectedId,
    filteredData,
    isMail,
    mailResultPropList,
    mailformPropList,
  } = useMailform(props)
  return (
    <div
      style={{ cursor: 'text', position: 'relative' }}
      className={
        typeof className != 'function'
          ? className
          : className?.({ isValid: isMail })
      }
    >
      <input
        {...mailformPropList}
        style={{
          width: '100%',
          border: 'none',
          outline: 'none',
          background: 'none',
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
  )
}

export { Mailform }
