import { ReactNode } from "react";
import {
  CalendarCtxt,
  calendarItemType,
  useCalendar,
  useCalendarType,
} from "../hook/useCalendar";
import { stylesType } from "../../../util/stylesType";

export type CalendarType = stylesType &
  useCalendarType & {
    children: (args: calendarItemType) => ReactNode;
  };

const Calendar = (props: CalendarType) => {
  const { children, classStyle } = props;
  const {
    listOfMonths,
    // listOfDaysInAMonthWithOffset,
    calendarPropList,
  } = useCalendar(props);

  return (
    <div {...calendarPropList} className={classStyle as string}>
      <CalendarCtxt.Provider value={listOfMonths}>
        {listOfMonths.map(({ name, days }) => {
          return children?.({ name, days });
        })}
      </CalendarCtxt.Provider>
    </div>
  );
};

const Item = (
  props: calendarItemType & {
    children: (args: calendarItemType) => ReactNode;
  }
) => {
  const { name, days, children } = props;
  return children?.({ name, days });
};

export { Calendar, Item };
