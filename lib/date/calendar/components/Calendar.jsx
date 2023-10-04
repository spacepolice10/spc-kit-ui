import { useCalendar } from '../hook/useCalendar'

/**
 * @param {import("../hook/useCalendar").useCalendarType & {children: (args: import("../hook/useCalendar").useCalendarTypeReturn) => ReactNode}} props
 * @returns
 */
const Calendar = (props) => {
  const { children, className } = props
  const {
    date,
    changeDate,
    calendarPropList,
    listOfMonths,
    selectNext,
    selectPrev,
  } = useCalendar(props)
  return (
    <div {...calendarPropList} className={className}>
      {children?.({
        yearNumber: date?.getFullYear(),
        changeDate,
        selectNext,
        selectPrev,
        listOfMonths,
      })}
    </div>
  )
}

export { Calendar }
