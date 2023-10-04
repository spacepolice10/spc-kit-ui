import { useMemo, useReducer } from 'react'
import createDate from '../../util/createDate'

/**
 *
 * @param {object} props
 * @param {Date | string} props.date — used if dateform must be controlled
 * @param {(selectedDate: string) => void} props.onChange — fire on date change
 * @returns
 */
const useDateform = (props) => {
  const { date, onChange } = props
  const activeDate = date ?? createDate()

  function changeDate(prev, action) {
    onChange?.(selectedDate)
    return Object.assign({}, prev, { [action.type]: action.value })
  }
  function updateYear(ev) {
    const value = ev.currentTarget.value
    const maxVal = 9999
    switch (+value > maxVal) {
      case true:
        dispatch({ type: 'year', value: maxVal })
        break
      case false:
        dispatch({ type: 'year', value: +value })
        break
    }
  }
  function updateDays(ev) {
    const value = ev.currentTarget.value
    const maxVal = new Date(
      dateParams?.year,
      dateParams?.months,
      0
    ).getDate()
    switch (+value > maxVal) {
      case true:
        dispatch({ type: 'days', value: maxVal })
        break
      case false:
        dispatch({ type: 'days', value: +value })
        break
    }
  }
  function updateMonths(ev) {
    const value = ev.currentTarget.value
    switch (+value > 12) {
      case true:
        dispatch({ type: 'months', value: 12 })
        break
      case false:
        dispatch({ type: 'months', value: +value })
        break
    }
  }

  /**
   *
   * @param {{year: number, months: number, days: number}} prev
   * @param {{ type: string; value: number }} action
   * @returns
   */
  const [dateParams, dispatch] = useReducer(changeDate, {
    year: activeDate.yearNumber,
    months: activeDate.monthsNumber,
    days: activeDate.daysNumberInAMonth,
  })
  var selectedDate = useMemo(() => {
    const { year, months, days } = dateParams
    const date = new Date(+year, +months - 1, +days + 1)
    if (!date) return
    return date.toISOString().split('T')[0]
  }, [dateParams])

  const daysPropList = {
    onInput: updateDays,
    value: `${dateParams?.days}`,
    type: 'number',
    maxLength: 2,
  }
  const monthsPropList = {
    onInput: updateMonths,
    value: `${dateParams?.months}`,
    type: 'number',
    maxLength: 2,
  }
  const yearPropList = {
    onInput: updateYear,
    value: `${dateParams?.year}`,
    type: 'number',
    maxLength: 4,
  }
  return {
    daysPropList,
    monthsPropList,
    yearPropList,
    selectedDate,
  }
}

export { useDateform }
