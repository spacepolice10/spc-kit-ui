import { useState } from "react";
import { Button } from "../../../button/button/components/Button";
import { Calendar, Item } from "../components/Calendar";

export default function CalendarDemo() {
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    undefined
  );

  return (
    <>
      {/* <>{monthsName}</>
      <>{daysName}</>
      <div className="flex justify-between w-80 px-5">
        {["SU", "MO", "TU", "WE", "TH", "FR", "SA"].map((x) => (
          <p key={x}>{x}</p>
        ))}
      </div> */}

      <Calendar
        date={selectedDate}
        onChange={(x) => setSelectedDate(x)}
        monthsNumberToDraw={4}
        locale="en-US"
      >
        {(args) => (
          <Item {...args}>
            {({ name, days }) => (
              <>
                <p>{name}</p>
                <div
                  className={
                    "grid grid-cols-7 items-center justify-items-center w-80 border p-2"
                  }
                >
                  {days.map(({ number, date, isSelected, isActive }) => (
                    <Button
                      key={date}
                      classStyle={({ isHovered }) =>
                        `${isHovered && "bg-slate-50"} ${
                          isSelected && "bg-violet-100"
                        } ${
                          isActive && "bg-sky-400"
                        } p-2 border w-10 h-10 flex justify-center items-center`
                      }
                      onPush={() => setSelectedDate(date)}
                    >
                      {number}
                    </Button>
                  ))}
                </div>
              </>
            )}
          </Item>
        )}
      </Calendar>
      {/* <Calendar
        classStyle={
          "grid grid-cols-7 items-center justify-items-center w-80 border p-2"
        }
        date={"2023-11"}
        onChange={(x) => setSelectedDate(x)}
        monthsNumberToDraw={4}
      >
        {({ number, date, setSelectedDate, selected, today }) => {
          // console.log(date);
          return (
            <Button
              key={date}
              classStyle={({ isHovered }) =>
                `${isHovered && "bg-slate-50"} ${selected && "bg-violet-100"} ${
                  today && "bg-sky-400"
                } p-2 border w-10 h-10 flex justify-center items-center`
              }
              onPush={() => setSelectedDate(date)}
            >
              {number}
            </Button>
          );
        }}
      </Calendar> */}
    </>
  );
}
