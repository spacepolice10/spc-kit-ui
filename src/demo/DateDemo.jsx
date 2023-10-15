import CalendarDemo from '../../lib/date/calendar/test/CalendarDemo'
import DateformDemo from '../../lib/date/dateform/test/DateformDemo'

import PeriodCalendarDemo from '../../lib/date/period_calendar/test/PeriodCalendarDemo'
import TimeformDemo from '../../lib/date/timeform/test/TimeformDemo'

export default function DateDemo() {
  // const [selectedDate, setSelectedDate] = useState("2023-10-10");
  return (
    <>
      {/* <DateForm date={selectedDate} onChange={(x) => setSelectedDate(x)} /> */}
      <CalendarDemo />
      <PeriodCalendarDemo />
      <DateformDemo />
      <TimeformDemo />
    </>
  )
}
