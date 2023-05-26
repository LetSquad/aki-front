import { useMemo } from "react";

import { DateTime, Interval } from "luxon";

import MonthDay from "@parts/EventCalendar/Calendar/MonthView/DaysGrid/MonthDay/MonthDay";
import { DAYS_IN_WEEK } from "@parts/EventCalendar/Calendar/utils";
import { useSelectedDate } from "@parts/EventCalendar/EventCalendarContext";

import styles from "./styles/DaysGrid.module.scss";

export default function DaysGrid() {
    const selectedDate = useSelectedDate();

    const firstMonthDay = useMemo(() => selectedDate.set({ day: 1 }), [selectedDate]);
    const lastMonthDay = useMemo(() => selectedDate.set({ day: selectedDate.daysInMonth }), [selectedDate]);
    const intervalStart = useMemo(() => firstMonthDay.minus({ day: firstMonthDay.weekday - 1 }), [firstMonthDay]);
    const intervalEnd = useMemo(() => lastMonthDay.plus({ day: DAYS_IN_WEEK - lastMonthDay.weekday + 1 }), [lastMonthDay]);

    const daysOfMonth = useMemo(() => (
        Interval
            .fromDateTimes(intervalStart, intervalEnd)
            .splitBy({ days: 1 }).map((d) => d.start as DateTime)
    ), [intervalEnd, intervalStart]);

    return (
        <div className={styles.container}>
            {daysOfMonth.map((day) => (
                <MonthDay
                    key={`${day.month}-${day.day}`}
                    rowsCount={daysOfMonth.length / DAYS_IN_WEEK}
                    day={day}
                />
            ))}
        </div>
    );
}
