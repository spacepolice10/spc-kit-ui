import { Fragment } from 'react'
import { usePeriodCalendar } from './usePeriodCalendar'

const PeriodCalendar = (props) => {
  const { children, className } = props
  const {
    listOfMonths,
    calendarPropList,
    selectNext,
    selectPrev,
    changeDate,
  } = usePeriodCalendar(props)

  return (
    <div {...calendarPropList} className={className}>
      {listOfMonths.map(({ name, days }) => {
        return (
          <Fragment key={days.toString()}>
            {children?.({
              name,
              days,
              selectPrev,
              selectNext,
              changeDate,
            })}
          </Fragment>
        )
      })}
    </div>
  )
}

const Item = (props) => {
  const { name, days, children } = props
  return (
    <Fragment key={name}>{children?.({ name, days })}</Fragment>
  )
}

export { PeriodCalendar, Item }
