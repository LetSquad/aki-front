import { useMemo } from "react";

import { DateTime } from "luxon";
import { useMediaQuery } from "react-responsive";

import { isSameDate } from "@coreUtils/utils";
import Event from "@parts/EventCalendar/Calendar/Event/Event";
import { useSelectedView } from "@parts/EventCalendar/EventCalendarContext";
import { CalendarView } from "@parts/EventCalendar/types/enums";
import { CalendarEvent } from "@parts/EventCalendar/types/types";

import styles from "./styles/ColoumnEvent.module.scss";

interface EventProps {
    event: CalendarEvent;
    day: DateTime;
}

export default function ColumnEvent({ event, day }: EventProps) {
    const isMobile = useMediaQuery({ maxWidth: 450 });

    const selectedView = useSelectedView();

    const startDateTime = useMemo(() => {
        const start = DateTime.fromISO(event.startAt);

        if (isSameDate(day, start)) {
            return start;
        }

        return day.set({
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
        });
    }, [event.startAt, day]);

    const endDateTime = useMemo(() => {
        if ("endAt" in event) {
            const end = DateTime.fromISO(event.endAt);

            if (isSameDate(startDateTime, end)) {
                return end;
            }
        }

        return startDateTime.set({
            day: startDateTime.day + 1,
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
        });
    }, [event, startDateTime]);

    const fromStartMinutesInterval = useMemo(() => (
        Math.abs(startDateTime
            .set({ hour: 0, minute: 0 })
            .diff(startDateTime, ["minutes"])
            .minutes)
    ), [startDateTime]);

    const betweenDatesMinutesInterval = useMemo(() => (
        Math.abs(startDateTime
            .diff(endDateTime, ["minutes"])
            .minutes)
    ), [endDateTime, startDateTime]);

    return (
        <Event
            customStyle={{
                height: `${betweenDatesMinutesInterval * 3 - 1}px`,
                maxHeight: `${betweenDatesMinutesInterval * 3 - 1}px`,
                gridRow: fromStartMinutesInterval + 1
            }}
            className={styles.event}
            event={event}
            wide={selectedView === CalendarView.DAY || !isMobile}
        />
    );
}
