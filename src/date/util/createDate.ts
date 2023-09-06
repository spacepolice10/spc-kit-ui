export type createDateType = {
  date?: Date | string;
  locale: string;
};

export default function createDate(props?: createDateType) {
  const dateArgs = props?.date ?? "";
  const date = props?.date ? new Date(dateArgs) : new Date();
  return {
    now: new Date().toISOString().split("T")[0],
    daysNumberInAMonth: new Date(
      date.getFullYear(),
      date.getMonth(),
      0
    ).getDate(),
    daysNumberInAWeek: date.getDay(),
    daysName: date.toLocaleString(props?.locale, { weekday: "long" }),
    firstMonthDate: new Date(date.getFullYear(), date.getMonth(), 1).getDay(),
    monthsNumber: date.getMonth(),
    monthsName: date.toLocaleString(props?.locale, { month: "long" }),
    yearNumber: date.getFullYear(),
  };
}
