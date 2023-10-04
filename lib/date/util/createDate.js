export default function createDate(props) {
  const dateArgs = props?.date ?? ''
  const date = props?.date ? new Date(dateArgs) : new Date()
  return {
    active: new Date().toISOString().split('T')[0],
    amountOfDaysInAMonth: new Date(
      date.getFullYear(),
      date.getMonth(),
      0
    ).getDate(),
    daysNumberInAMonth: date.getDate(),
    daysNumberInAWeek: date.getDay(),
    daysName: date.toLocaleString(props?.locale, {
      weekday: 'long',
    }),
    firstMonthDate: new Date(
      date.getFullYear(),
      date.getMonth(),
      1
    ).getDay(),
    monthsNumber: date.getMonth(),
    monthsName: date.toLocaleString(props?.locale, {
      month: 'long',
    }),
    yearNumber: date.getFullYear(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
  }
}
