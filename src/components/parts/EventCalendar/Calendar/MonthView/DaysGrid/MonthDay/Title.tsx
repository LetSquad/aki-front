import { MouseEvent, useCallback, useMemo } from "react";

import classNames from "classnames";
import { DateTime } from "luxon";

import { isSameDate, isSameMonth } from "@coreUtils/utils";
import { useToggle } from "@hooks/useToogle";
import {
    useFullBusyDayColor,
    useFullFreeDayColor,
    useHighlightEmptyDay,
    useIsFullBusyDay,
    useIsFullFreeDay,
    useIsSomeBusyDay,
    useSelectedDate,
    useSetSelectedDate,
    useSetSelectedView,
    useSomeBusyDayColor
} from "@parts/EventCalendar/EventCalendarContext";
import { CalendarView } from "@parts/EventCalendar/types/enums";
import { CalendarEvent } from "@parts/EventCalendar/types/types";

import styles from "./styles/Title.module.scss";

interface TitleProps {
    day: DateTime;
    events: CalendarEvent[];
}

export default function Title({ day, events }: TitleProps) {
    const selectedDate = useSelectedDate();
    const setCalendarView = useSetSelectedView();
    const setSelectedDate = useSetSelectedDate();

    const isFullBusyDay = useIsFullBusyDay(events);
    const fullBusyDayColor = useFullBusyDayColor();
    const isSomeBusyDay = useIsSomeBusyDay(events);
    const someBusyDayColor = useSomeBusyDayColor();
    const isFullFreeDay = useIsFullFreeDay(events);
    const fullFreeDayColor = useFullFreeDayColor();
    const highlightEmptyDay = useHighlightEmptyDay();

    const [isHovered,, setIsHoverTrue, setIsHoverFalse] = useToggle();

    const changeToDayView = useCallback((domEvent: MouseEvent<HTMLDivElement>) => {
        domEvent.stopPropagation();
        setSelectedDate(day);
        setCalendarView(CalendarView.DAY);
    }, [day, setCalendarView, setSelectedDate]);

    const isCurrentMonth = useMemo(() => isSameMonth(selectedDate, day), [day, selectedDate]);

    const isToday = useMemo(() => isSameDate(day, DateTime.now()), [day]);

    const isEmptyDay = useMemo(() => events.length === 0, [events.length]);

    const titleColorStyle = useMemo(() => {
        if (isEmptyDay && highlightEmptyDay) {
            return typeof highlightEmptyDay === "string" ? highlightEmptyDay : undefined;
        }

        if (isFullBusyDay) {
            return fullBusyDayColor;
        }

        if (isSomeBusyDay) {
            return someBusyDayColor;
        }

        if (isFullFreeDay) {
            return fullFreeDayColor;
        }

        return undefined;
    }, [
        fullBusyDayColor,
        fullFreeDayColor,
        highlightEmptyDay,
        isEmptyDay,
        isFullBusyDay,
        isFullFreeDay,
        isSomeBusyDay,
        someBusyDayColor
    ]);

    return (
        <div
            onMouseEnter={setIsHoverTrue}
            onMouseLeave={setIsHoverFalse}
            className={classNames(
                styles.titleContainer,
                {
                    [styles.titleContainerFullBusy]: isFullBusyDay && !fullBusyDayColor,
                    [styles.titleContainerSomeBusy]: isSomeBusyDay && !someBusyDayColor,
                    [styles.titleContainerFullFree]: isFullFreeDay && !fullFreeDayColor,
                    [styles.titleContainerEmpty]: highlightEmptyDay === true && isEmptyDay,
                    [styles.titleContainerHovered]: isHovered
                }
            )}
            style={{ backgroundColor: titleColorStyle }}
            onClick={changeToDayView}
            aria-hidden
        >
            <span
                className={classNames(
                    styles.title,
                    {
                        [styles.titleCurrent]: isToday && !isHovered,
                        [styles.titleHovered]: isHovered,
                        [styles.titleOtherMonth]: !isCurrentMonth
                    }
                )}
            >
                {day.day}
            </span>
        </div>
    );
}
