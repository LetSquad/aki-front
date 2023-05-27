import { useCallback } from "react";

import EventsColumn from "@parts/EventCalendar/Calendar/DaysView/EventsColumn/EventsColumn";
import TimeColumn from "@parts/EventCalendar/Calendar/DaysView/TimeColumn/TimeColumn";
import DaysTitle from "@parts/EventCalendar/Calendar/DaysView/WeekView/DaysTitle/DaysTitle";
import { DAYS_IN_WEEK_ARRAY } from "@parts/EventCalendar/Calendar/utils";
import { useSelectedDate } from "@parts/EventCalendar/EventCalendarContext";

import daysViewStyles from "../styles/DaysView.module.scss";
import styles from "./styles/WeekView.module.scss";

export default function WeekView() {
    const selectedDate = useSelectedDate();

    const getDateByWeekDay = useCallback((day: number) => selectedDate.plus({ day: day - 1 }), [selectedDate]);

    return (
        <>
            <DaysTitle />
            <div className={daysViewStyles.viewOverflowContainer}>
                <div className={daysViewStyles.viewContainer}>
                    <TimeColumn />
                    <div className={styles.eventsContainer}>
                        {DAYS_IN_WEEK_ARRAY.map((day) => (
                            <EventsColumn
                                key={day}
                                day={getDateByWeekDay(day)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
