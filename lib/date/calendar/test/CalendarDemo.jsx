import { useState } from "react";
import { Button } from "../../../button/button/Button";
import { Calendar } from "../components/Calendar";

export default function CalendarDemo() {
	const DATE = "2023-09";
	const [selectedDate, setSelectedDate] = useState(
		new Date().toString()
	);
	return (
		<>
			<Calendar
				startsFromDate={DATE}
				date={selectedDate}
				onChange={(x) => setSelectedDate(x)}
				monthsNumberToDraw={1}
				locale="en-US"
			>
				{({
					selectPrev,
					selectNext,
					yearNumber,
					listOfMonths,
					changeDate,
				}) => (
					<>
						<button onClick={selectPrev}>selectPrev</button>
						<button onClick={selectNext}>selectNext</button>
						<p>{yearNumber}</p>
						{listOfMonths.map(({ name, days }) => (
							<>
								<p>{name}</p>

								<div
									className={
										"grid grid-cols-7 items-center justify-items-center w-80 border p-2"
									}
								>
									{days.map(
										({
											number,
											date,
											isSelected,
											isActive,
										}) => (
											<Button
												key={date}
												className={({ isHovered }) =>
													`${isHovered && "bg-slate-50"} ${
														isSelected && "bg-violet-100"
													} ${
														isActive && "bg-sky-400"
													} p-2 border w-10 h-10 flex justify-center items-center`
												}
												onPush={() => changeDate(date)}
											>
												{number}
											</Button>
										)
									)}
								</div>
							</>
						))}
						<div></div>
					</>
				)}
			</Calendar>
		</>
	);
}
