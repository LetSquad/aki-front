import {
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";

import { DateTime } from "luxon";

import Calendar from "@parts/EventCalendar/Calendar/Calendar";
import { EventCalendarContext } from "@parts/EventCalendar/EventCalendarContext";
import Navigation from "@parts/EventCalendar/Navigation/Navigation";
import { CalendarView } from "@parts/EventCalendar/types/enums";
import { EventCalendarProps } from "@parts/EventCalendar/types/types";

import styles from "./styles/EventCalendar.module.scss";

export default function EventCalendar({
    initialDate,
    initialView = CalendarView.MONTH,
    disabledViews = [],
    events = [],
    onDayClick,
    onHourClick,
    onEventClick,
    isFullBusyDay,
    isLoading,
    isSomeBusyDay,
    isFullFreeDay,
    highlightEmptyDay
}: EventCalendarProps) {
    const [selectedDate, setSelectedDate] = useState<DateTime>(initialDate ? DateTime.fromISO(initialDate) : DateTime.now());
    const [selectedView, setSelectedView] = useState<CalendarView>(initialView);

    const setNewSelectedDate = useCallback((newSelectedDate: DateTime | string) => (
        typeof newSelectedDate === "string"
            ? setSelectedDate(DateTime.fromISO(newSelectedDate))
            : setSelectedDate(newSelectedDate)
    ), []);

    const contextValues = useMemo(() => ({
        calendarEvents: events,
        selectedDate,
        setSelectedDate: setNewSelectedDate,
        selectedView,
        setSelectedView,
        disabledViews,
        onDayClick,
        onHourClick,
        onEventClick,
        isFullBusyDay,
        isLoading,
        isSomeBusyDay,
        isFullFreeDay,
        highlightEmptyDay
    }), [
        disabledViews,
        events,
        highlightEmptyDay,
        isFullBusyDay,
        isFullFreeDay,
        isLoading,
        isSomeBusyDay,
        onDayClick,
        onEventClick,
        onHourClick,
        selectedDate,
        selectedView,
        setNewSelectedDate
    ]);

    useEffect(() => {
        if (initialDate) {
            setNewSelectedDate(initialDate);
        }
    }, [initialDate, setNewSelectedDate]);

    return (
        <EventCalendarContext.Provider value={contextValues}>
            <div className={styles.container}>
                <Navigation />
                <Calendar />
            </div>
        </EventCalendarContext.Provider>
    );
}
