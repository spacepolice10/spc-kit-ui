import { Children, createContext, useContext } from 'react'
import { useHover } from '../../../interactions/hover/components/useHover.js'
import { useFocus } from '../../../interactions/focus/components/useFocus.js'
import { useSearch } from './useSearch.js'

const SearchCtxt = createContext({})

/**
 * @typedef SearchType
 * @type {import('./useSearch.js').useSearchType &
 * {children: ReactNode}}
 */

/**
 *
 * @param {SearchType} props
 * @returns
 */
const Search = (props) => {
  const { isShow, ...searchPropList } = useSearch(props)
  const [form, body] = Children.toArray(props?.children)
  return (
    <div style={{ position: 'relative' }}>
      <SearchCtxt.Provider value={searchPropList}>
        {form}
        {isShow && body}
      </SearchCtxt.Provider>
    </div>
  )
}

const Form = (props) => {
  const { className } = props
  const { searchFormPropList } = useContext(SearchCtxt)
  const { isHovered, hoverPropList } = useHover()
  const { isFocused, focusPropList } = useFocus()

  return (
    <div
      style={{ cursor: 'text', position: 'relative' }}
      // onClick={focusingOnTextform}

      className={
        typeof className != 'function'
          ? className
          : className?.({ isHovered, isFocused })
      }
      {...hoverPropList}
    >
      <input
        {...searchFormPropList}
        {...focusPropList}
        style={{
          width: '100%',
          border: 'none',
          outline: 'none',
          background: 'none',
        }}
      />
    </div>
  )
}

function Body(props) {
  const { children, className } = props
  const {
    searchResultPropList,
    filteredData,
    removeText,
    selectedId,
  } = useContext(SearchCtxt)
  const items = filteredData
  return (
    <>
      <div className={className} {...searchResultPropList}>
        {children?.({
          items,
          removeText,
          selectedId: selectedId ?? '',
        })}
      </div>
    </>
  )
}

export { Search, Form, Body }
