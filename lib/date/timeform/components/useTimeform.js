import { useMemo, useReducer } from "react";
import createDate from "../../util/createDate";

/**
 *
 * @param {object} props
 * @param {Date | string} props.date — used if dateform must be controlled
 * @param {(selectedDate: string) => void} props.onChange — fire on date change
 * @returns
 */
const useTimeform = (props) => {
  const { date, onChange } = props;
  const activeDate = date ?? createDate();

  function changeTime(prev, action) {
    onChange?.(selectedDate);
    return Object.assign({}, prev, { [action.type]: action.value });
  }
  function updateHour(ev) {
    const value = ev.currentTarget.value;
    const maxVal = 24;
    switch (+value > maxVal) {
      case true:
        dispatch({ type: "hour", value: maxVal });
        break;
      case false:
        dispatch({ type: "hour", value: +value });
        break;
    }
  }
  function updateMinute(ev) {
    const value = ev.currentTarget.value;
    switch (+value > 60) {
      case true:
        dispatch({ type: "minute", value: 60 });
        break;
      case false:
        dispatch({ type: "minute", value: +value });
        break;
    }
  }
  function updateSecond(ev) {
    const value = ev.currentTarget.value;
    switch (+value > 60) {
      case true:
        dispatch({ type: "second", value: 60 });
        break;
      case false:
        dispatch({ type: "second", value: +value });
        break;
    }
  }

  /**
   *
   * @param {{hour: number, minute: number, second: number}} prev
   * @param {{ type: string; value: number }} action
   * @returns
   */
  const [dateParams, dispatch] = useReducer(changeTime, {
    year: activeDate.hour,
    months: activeDate.minute,
    days: activeDate.second,
  });
  var selectedDate = useMemo(() => {
    const { year, months, days } = dateParams;
    const date = new Date(+year, +months - 1, +days + 1);
    if (!date) return;
    return date.toISOString().split("T")[0];
  }, [dateParams]);

  const secondPropList = {
    onInput: updateSecond,
    value: `${dateParams?.second}`,
    type: "number",
    maxLength: 4,
  };
  const minutePropList = {
    onInput: updateMinute,
    value: `${dateParams?.minute}`,
    type: "number",
    maxLength: 2,
  };
  const hourPropList = {
    onInput: updateHour,
    value: `${dateParams?.hour}`,
    type: "number",
    maxLength: 2,
  };
  return { secondPropList, minutePropList, hourPropList, selectedDate };
};

export { useTimeform };
