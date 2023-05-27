import {
    MouseEvent,
    useCallback,
    useMemo,
    useState
} from "react";

import classNames from "classnames";
import { DateTime } from "luxon";

import { isSameDate, isSameWeek } from "@coreUtils/utils";
import ColumnEvent from "@parts/EventCalendar/Calendar/DaysView/EventsColumn/ColumnEvent";
import { HOUR_DIVISION, HOURS_OF_DAY_ARRAY, MINUTES_OF_HOUR } from "@parts/EventCalendar/Calendar/utils";
import { useCalendarEventsByDay, useOnHourClick, useSelectedView } from "@parts/EventCalendar/EventCalendarContext";
import { CalendarView } from "@parts/EventCalendar/types/enums";

import styles from "./styles/EventsColumn.module.scss";

interface EventsColumnProps {
    day: DateTime;
}

export const DIVISIONS_NUMBER_OF_GRID_HOUR = 180;

export default function EventsColumn({ day }: EventsColumnProps) {
    const [nowMarkerTopIndent, setNowMarkerTopIndent] = useState<number>();

    const events = useCalendarEventsByDay(day);
    const selectedView = useSelectedView();
    const onHourClick = useOnHourClick();

    const onClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
        if (onHourClick) {
            const yCoordinate = event.clientY - (event.target as HTMLDivElement).getBoundingClientRect().top;
            const fullHourData = yCoordinate / DIVISIONS_NUMBER_OF_GRID_HOUR;

            const hour = Math.trunc(fullHourData);
            const minutes = Math.trunc((fullHourData - hour) * MINUTES_OF_HOUR);

            const minute = Math.min(...HOUR_DIVISION.filter((division) => division >= minutes));

            const dayWithTime = day.set({
                hour,
                minute,
                second: 0,
                millisecond: 0
            });

            if (dayWithTime > DateTime.now()) {
                onHourClick(dayWithTime, event);
            }
        }
    }, [day, onHourClick]);

    const isToday = useMemo(() => isSameDate(day, DateTime.now()), [day]);

    const inWeek = useMemo(() => isSameWeek(day, DateTime.now()), [day]);

    const isNowMarkerVisible = useMemo(() => (selectedView === CalendarView.DAY ? isToday : inWeek), [inWeek, isToday, selectedView]);
    const updateNowMarkerTopIndent = useCallback((nowMarker: HTMLDivElement) => {
        if (isNowMarkerVisible && nowMarker) {
            setNowMarkerTopIndent((nowMarker.getBoundingClientRect().height / 24) * (DateTime.now().hour + DateTime.now().minute / 60));
        }

        if (isNowMarkerVisible && !nowMarker) {
            setNowMarkerTopIndent(undefined);
        }
    }, [isNowMarkerVisible]);

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <div className={styles.tilesContainer}>
                    {HOURS_OF_DAY_ARRAY.map((hour) => (
                        <div
                            key={hour}
                            className={styles.tile}
                        />
                    ))}
                </div>
                <div className={styles.markerStart} />
                <div
                    className={classNames(
                        styles.gridCellContainer,
                        { [styles.gridCellContainerPointer]: !!onHourClick && day.startOf("day") >= DateTime.now().startOf("day") }
                    )}
                    ref={updateNowMarkerTopIndent}
                    onClick={onClick}
                    aria-hidden
                >
                    <div className={styles.gridCell}>
                        {events.map((event) => (
                            <ColumnEvent
                                key={event.id}
                                event={event}
                                day={day}
                            />
                        ))}
                    </div>
                </div>
                {isNowMarkerVisible && nowMarkerTopIndent !== undefined && (
                    <div
                        className={classNames({
                            [styles.nowMarker]: !isToday,
                            [styles.nowMarkerToday]: isToday
                        })}
                        style={{ top: `${nowMarkerTopIndent}px` }}
                    />
                )}
                <div className={styles.markerEnd} />
            </div>
        </div>
    );
}
