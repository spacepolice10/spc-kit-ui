import { createContext, useMemo, useState } from "react";
import { useFocusScope } from "../../../interactions/focus_scope/hook/useFocusScope";
import { useKeyboard } from "../../../interactions/keyboard/hook/useKeyboard";
import createDate from "../../util/createDate";

export type useCalendarType = {
  date?: string;
  onChange?: (selectedDate: string) => void;
  monthsNumberToDraw?: number;
  locale: string;
};

export type calendarItemType = {
  name: string;
  days: calendarItemDaysListType[];
  selectPrev?: () => void;
  selectNext?: () => void;
};

export type calendarItemDaysListType = {
  number: number;
  date: string;
  isSelected?: boolean;
  isActive?: boolean;
};

export const CalendarCtxt = createContext([] as calendarItemType[]);

const useCalendar = (props: useCalendarType) => {
  const { date, onChange, monthsNumberToDraw, locale } = props;
  const [controlledSelectedDate, setControlledSelectedDate] = useState(
    date ?? ""
  );

  function generateListOfDaysInAMonthWithOffset(date: Date | string) {
    const {
      now,
      firstMonthDate,
      daysNumberInAMonth,
      yearNumber,
      monthsNumber,
    } = createDate({ date, locale });
    const offset = Array(firstMonthDate).fill("");

    const days = Array.from(Array(daysNumberInAMonth).keys()).map((d) => {
      const number = d + 1;
      const date = new Date(yearNumber, monthsNumber, d + 2)
        .toISOString()
        .split("T")[0];
      const isSelected = (props?.date ?? controlledSelectedDate) == date;
      const isActive = now == date;
      return { number, date, isSelected, isActive };
    });
    return [...offset, ...days] as calendarItemDaysListType[];
  }

  const listOfMonths = useMemo(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = d.getMonth();
    return Array.from(Array(monthsNumberToDraw).keys()).map((i) => {
      const date = new Date(y, m + i);
      const name = date.toLocaleString(locale, { month: "long" });
      const days = generateListOfDaysInAMonthWithOffset(date);
      return { name, days };
    });
  }, [date]);

  const {
    focusScopeRef,
    focusNextElem,
    focusPrevElem,
    focusNextElemGrid,
    focusPrevElemGrid,
  } = useFocusScope();
  const { keyboardPropList } = useKeyboard({
    ArrowLeft: focusPrevElem,
    ArrowRight: focusNextElem,
    ArrowUp: () => focusPrevElemGrid(7),
    ArrowDown: () => focusNextElemGrid(7),
  });

  const calendarPropList = {
    ref: focusScopeRef,
    ...keyboardPropList,
  };
  function changeDate(date: string) {
    setControlledSelectedDate(date);
    onChange?.(date);
  }
  return {
    date: date ?? controlledSelectedDate,
    changeDate,
    calendarPropList,
    listOfMonths,
  };
};

export { useCalendar };
