import { MouseEvent, useCallback, useMemo } from "react";

import { DateTime } from "luxon";
import { Icon } from "semantic-ui-react";

import { getFormatTimeInterval } from "@coreUtils/utils";
import Event from "@parts/EventCalendar/Calendar/Event/Event";
import { useSetSelectedDate, useSetSelectedView } from "@parts/EventCalendar/EventCalendarContext";
import { CalendarView } from "@parts/EventCalendar/types/enums";
import { CalendarEvent } from "@parts/EventCalendar/types/types";

import styles from "./styles/DayEvents.module.scss";

interface DayEventsProps {
    day: DateTime;
    events: CalendarEvent[]
}

export default function DayEvents({ day, events }: DayEventsProps) {
    const setCalendarView = useSetSelectedView();
    const setSelectedDate = useSetSelectedDate();

    const changeToDayView = useCallback((domEvent: MouseEvent<HTMLButtonElement>) => {
        domEvent.stopPropagation();
        setSelectedDate(day);
        setCalendarView(CalendarView.DAY);
    }, [day, setCalendarView, setSelectedDate]);

    const viewableEvents = useMemo(() => {
        const monthsVisibleEvents = events.filter((event) => event.isMonthVisible !== false);
        return monthsVisibleEvents.length > 2 ? monthsVisibleEvents.slice(0, 3) : monthsVisibleEvents;
    }, [events]);

    return (
        <div className={styles.eventBlockContainer}>
            <div className={styles.eventsContainer}>
                {viewableEvents.map((event) => (
                    <Event
                        key={event.id}
                        className={styles.event}
                        linkClassName={styles.eventLink}
                        event={event}
                        wide={false}
                        title={"endAt" in event ? getFormatTimeInterval(event.startAt, event.endAt) : "Весь день"}
                    />
                ))}
            </div>
            {events.length > viewableEvents.length && (
                <Icon
                    link
                    className={styles.more}
                    name="angle down"
                    onClick={changeToDayView}
                />
            )}
        </div>
    );
}
