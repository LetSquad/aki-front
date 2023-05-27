import { useCallback } from "react";

import DayTitle from "@parts/EventCalendar/Calendar/DaysView/DayTitle/DayTitle";
import { DAYS_IN_WEEK_ARRAY } from "@parts/EventCalendar/Calendar/utils";
import { useSelectedDate } from "@parts/EventCalendar/EventCalendarContext";

import styles from "./styles/DaysTitle.module.scss";

export default function DaysTitle() {
    const selectedDate = useSelectedDate();

    const getDateByWeekDay = useCallback((day: number) => selectedDate.plus({ day: day - 1 }), [selectedDate]);

    return (
        <div className={styles.container}>
            <div className={styles.dumb} />
            <div className={styles.dateTitlesContainer}>
                {DAYS_IN_WEEK_ARRAY.map((day) => (
                    <DayTitle
                        key={day}
                        day={getDateByWeekDay(day)}
                        className={styles.dateTitle}
                    />
                ))}
            </div>
        </div>
    );
}
