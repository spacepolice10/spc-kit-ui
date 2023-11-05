import { useMemo, useState } from "react";
import { useFocusScope } from "../../../interactions/focus_scope/useFocusScope";
import { useKeyboard } from "../../../interactions/keyboard/useKeyboard";
import createDate from "../../util/createDate";

/**
 * @typedef {object} useCalendarTypeReturn
 * @property {Date} date
 * @property {(date: Date) => void} changeDate
 * @property {(ref: RefObject<HTMLDivElement>)} calendarPropList
 * @property {
 * name: string,
 * days: calendarItemDaysListType[],
 * yearNumber: number,
 * monthsNumber: number} listOfMonths
 * @property {() => void} selectPrev
 * @property {() => void} selectNext
 * @returns
 */

/**
 * @typedef useCalendarType
 * @property {Date} startsFromDate, date calendar begins with to draw months (it is determined). Usually enough to past months only
 * @property {Date} date, actual date to work with (might be considered as a controlled date)
 * @property {(selectedDate: string) => void} onChange, callback that fire on date change. Returns date
 * @property {number} monthsNumberToDraw, determines how many months component will return in listOfMonths prop
 * @property {string} locale, locale is necessary to be determined so Date constructor didn't break
 * @returns {useCalendarTypeReturn}
 */

/**
 *
 * @param {useCalendarType} props
 * @returns
 */
const useCalendar = (props) => {
	const {
		startsFromDate,
		date,
		onChange,
		monthsNumberToDraw,
		locale,
	} = props;
	const [
		controlledStartsFromDate,
		setControlledStartsFromDate,
	] = useState(startsFromDate);

	function changeDate(date) {
		setControlledSelectedDate(date);
		onChange?.(date);
	}
	const [controlledSelectedDate, setControlledSelectedDate] =
		useState(date ?? "");

	/**
	 * @param {Date} date
	 * @returns {
	 * number: number,
	 * date: Date,
	 * isSelected: boolean,
	 * isActive: boolean}
	 */
	function generateListOfDaysInAMonthWithOffset(date) {
		const {
			active,
			firstMonthDate,
			amountOfDaysInAMonth,
			yearNumber,
			monthsNumber,
		} = createDate({ date, locale });
		const offset = Array(firstMonthDate).fill("");
		const days = Array.from(
			Array(amountOfDaysInAMonth).keys()
		).map((d) => {
			const number = d + 1;
			const date = new Date(yearNumber, monthsNumber, d + 2)
				.toISOString()
				.split("T")[0];
			const isSelected =
				(props?.date ?? controlledSelectedDate) == date;
			const isActive = active == date;
			return { number, date, isSelected, isActive };
		});
		return [...offset, ...days];
	}

	/**
	 * @returns {
	 * name: string,
	 * days: calendarItemDaysListType[],
	 * yearNumber: number,
	 * monthsNumber: number}
	 */
	const listOfMonths = useMemo(() => {
		const d = date
			? new Date(controlledStartsFromDate ?? date)
			: new Date();
		const y = d.getFullYear();
		const m = d.getMonth();
		return Array.from(Array(monthsNumberToDraw).keys()).map(
			(i) => {
				const date = new Date(y, m + i);
				const name = date.toLocaleString(locale, {
					month: "long",
				});
				const days =
					generateListOfDaysInAMonthWithOffset(date);
				return { name, days, yearNumber: y, monthsNumber: m };
			}
		);
	}, [date, locale, monthsNumberToDraw, onChange]);

	function selectPrev() {
		const date = new Date(controlledStartsFromDate);
		const update = new Date(
			date.setMonth(date.getMonth() - 1)
		).toString();
		setControlledStartsFromDate(update);
		onChange?.(update);
	}
	function selectNext() {
		const date = new Date(controlledStartsFromDate);
		const update = new Date(
			date.setMonth(date.getMonth() + 1)
		).toString();
		setControlledStartsFromDate(update);
		onChange?.(update);
	}

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
	return {
		date: new Date(date ?? controlledSelectedDate),
		changeDate,
		calendarPropList,
		listOfMonths,
		selectPrev,
		selectNext,
	};
};

export { useCalendar };
