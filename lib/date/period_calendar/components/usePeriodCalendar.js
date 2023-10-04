import { useEffect, useMemo, useState } from 'react'
import { useCalendar } from '../../calendar/hook/useCalendar'
import createDate from '../../util/createDate'

/**
 * @typedef usePeriodCalendarType
 * @type {import('../../calendar/hook/useCalendar').useCalendarType &
 * {onChangePeriod: (args: string | Date)[] => void}}
 */

/**
 *
 * @param {usePeriodCalendarType} props
 * @returns
 */
const usePeriodCalendar = (props) => {
  const { date, onChangePeriod, monthsNumberToDraw, locale } = props
  const calendar = useCalendar(props)

  const [startsWith, setStartsWith] = useState(undefined)
  const [endsWith, setEndsWith] = useState(undefined)
  const [endsWithBeforeSelect, setEndsWithBeforeSelect] =
    useState(undefined)
  function generateListOfDaysInAMonthWithOffset(date) {
    const {
      active,
      firstMonthDate,
      amountOfDaysInAMonth,
      yearNumber,
      monthsNumber,
    } = createDate({ date, locale })
    const offset = Array(firstMonthDate).fill('')
    const days = Array.from(Array(amountOfDaysInAMonth).keys()).map(
      (d) => {
        const number = d + 1
        const date = new Date(yearNumber, monthsNumber, d + 2)
          .toISOString()
          .split('T')[0]
        const [starts, ends] = [startsWith, endsWith].sort()
        const [startsBeforeSelect, endsBeforeSelect] = [
          startsWith,
          endsWithBeforeSelect,
        ].sort()
        const isSelected = [startsWith, endsWith].some(
          (dt) => dt == date
        )
        const isDisabled = date == undefined
        const isInPeriod =
          date > (starts ?? '') && date < (ends ?? '')
        const isInPeriodBeforeSelect =
          date > (startsBeforeSelect ?? '') &&
          date < (endsBeforeSelect ?? '') &&
          !endsWith
        const isActive = active == date
        return {
          number,
          date,
          isSelected,
          isActive,
          isInPeriod,
          isDisabled,
          isInPeriodBeforeSelect,
          setEndsWithBeforeSelect,
        }
      }
    )
    return [...offset, ...days]
  }
  const listOfMonths = useMemo(() => {
    const d = date ? new Date(date) : new Date()
    const y = d.getFullYear()
    const m = d.getMonth()
    return Array.from(Array(monthsNumberToDraw).keys()).map((i) => {
      const date = new Date(y, m + i)
      const name = date.toLocaleString(locale, { month: 'long' })
      const days = generateListOfDaysInAMonthWithOffset(date)
      return { name, days }
    })
  }, [startsWith, endsWith, endsWithBeforeSelect])

  function changeDate(date) {
    if (endsWith) {
      setStartsWith(date)
      setEndsWith(undefined)
    } else {
      if (startsWith) {
        setEndsWith(date)
      } else {
        setStartsWith(date)
      }
    }
  }

  useEffect(() => {
    if (!endsWith) return
    onChangePeriod?.([startsWith, endsWith])
  }, [endsWith])

  return { ...calendar, changeDate, listOfMonths }
}

export { usePeriodCalendar }
