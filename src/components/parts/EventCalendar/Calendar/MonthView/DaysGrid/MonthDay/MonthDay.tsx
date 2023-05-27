import { MouseEvent, useCallback } from "react";

import classNames from "classnames";
import { DateTime } from "luxon";

import DayEvents from "@parts/EventCalendar/Calendar/MonthView/DaysGrid/MonthDay/DayEvents";
import Title from "@parts/EventCalendar/Calendar/MonthView/DaysGrid/MonthDay/Title";
import { useCalendarEventsByDay, useOnDayClick } from "@parts/EventCalendar/EventCalendarContext";

import styles from "./styles/MonthDay.module.scss";

interface MonthDayProps {
    day: DateTime;
    rowsCount: number;
}

export default function MonthDay({ day, rowsCount }: MonthDayProps) {
    const events = useCalendarEventsByDay(day);
    const onDayClick = useOnDayClick();

    const onClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
        if (onDayClick && day.startOf("day") >= DateTime.now().startOf("day")) {
            onDayClick(DateTime.fromObject({ year: day.year, month: day.month, day: day.day }), event);
        }
    }, [day, onDayClick]);

    return (
        <div
            className={classNames(
                styles.day,
                { [styles.dayPointer]: !!onDayClick && day.startOf("day") >= DateTime.now().startOf("day") }
            )}
            style={{ height: `${100 / rowsCount}%` }}
            aria-hidden
            onClick={onClick}
        >
            <Title
                day={day}
                events={events}
            />
            <DayEvents
                events={events}
                day={day}
            />
        </div>
    );
}
