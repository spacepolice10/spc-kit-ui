import { useState } from 'react'
import { Button } from '../../../button/button/components/Button'
import {
    PeriodCalendar,
    Item as PeriodCalendarItem,
} from '../components/PeriodCalendar'

export default function PeriodCalendarDemo() {
    const [selectedPeriodDate, setSelectedPeriodDate] = useState(new Date().toString())

    return (
        <>
            <PeriodCalendar
                date={selectedPeriodDate}
                onChange={(x) => setSelectedPeriodDate(x)}
                onChangePeriod={(x) => console.log(x)}
                monthsNumberToDraw={1}
                locale="en-US"
            >
                {({ selectPrev, selectNext, changeDate, ...rest }) => (
                    <>
                        <button onClick={selectPrev}>selectPrev</button>
                        <button onClick={selectNext}>selectNext</button>
                        <PeriodCalendarItem {...rest}>
                            {({ name, days }) => (
                                <>
                                    <p>{name}</p>
                                    <div
                                        className={
                                            'grid grid-cols-7 items-center justify-items-center w-80 border p-2'
                                        }
                                    >
                                        {days.map(
                                            ({
                                                number,
                                                date,
                                                isSelected,
                                                isActive,
                                                isInPeriod,
                                                isInPeriodBeforeSelect,
                                                setEndsWithBeforeSelect,
                                            }) => (
                                                <Button
                                                    key={date}
                                                    onHover={() => {
                                                        console.log(date)

                                                        setEndsWithBeforeSelect(date)
                                                    }}
                                                    className={({
                                                        isHovered,
                                                    }) =>
                                                        `${isInPeriodBeforeSelect &&
                                                        'bg-gray-200/50'
                                                        }
                             ${isInPeriod && 'bg-red-200/50'}
                             ${isHovered && 'bg-slate-50'} 
                             ${isSelected && 'bg-violet-100'} 
                             ${isActive && '!bg-sky-400'} 
                             p-2 border w-10 h-10 flex justify-center items-center`
                                                    }
                                                    onPush={() =>
                                                        changeDate(date)
                                                    }
                                                >
                                                    {number}
                                                </Button>
                                            )
                                        )}
                                    </div>
                                </>
                            )}
                        </PeriodCalendarItem>
                    </>
                )}
            </PeriodCalendar>
        </>
    )
}
