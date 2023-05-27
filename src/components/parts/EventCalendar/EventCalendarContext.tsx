import { createContext, MouseEvent, useContext } from "react";

import { DateTime } from "luxon";

import { isSameDate } from "@coreUtils/utils";
import { CalendarView } from "@parts/EventCalendar/types/enums";

import { CalendarEvent } from "./types/types";

type EventCalendarContextType = {
    calendarEvents: CalendarEvent[];
    isLoading?: boolean;
    selectedDate: DateTime;
    setSelectedDate: (newSelectedDate: DateTime | string) => void;
    selectedView: CalendarView;
    setSelectedView: (newSelectedView: CalendarView) => void;
    disabledViews: CalendarView[];
    onDayClick?: (date: DateTime, event: MouseEvent) => void;
    onHourClick?: (date: DateTime, event: MouseEvent) => void;
    onEventClick?: (calendarEvent: CalendarEvent, event: MouseEvent) => void;
    isFullBusyDay?: (calendarEvents: CalendarEvent[]) => boolean;
    fullBusyDayColor?: string;
    isSomeBusyDay?: (calendarEvents: CalendarEvent[]) => boolean;
    someBusyDayColor?: string;
    isFullFreeDay?: (calendarEvents: CalendarEvent[]) => boolean;
    fullFreeDayColor?: string;
    highlightEmptyDay?: true | string;
};

export const EventCalendarContext = createContext<EventCalendarContextType | undefined>(undefined);

export function useCalendarEvents() {
    const context = useContext(EventCalendarContext);
    if (!context) {
        throw new Error("useCalendarEvents must be used within a EventCalendarProvider");
    }
    return context.calendarEvents;
}

export function useIsLoading() {
    const context = useContext(EventCalendarContext);
    if (!context) {
        throw new Error("useIsLoading must be used within a EventCalendarProvider");
    }
    return context.isLoading;
}

export function useCalendarEventsByDay(day: DateTime) {
    const context = useContext(EventCalendarContext);
    if (!context) {
        throw new Error("useCalendarEventsByDay must be used within a EventCalendarProvider");
    }
    return context.calendarEvents.filter((event) => isSameDate(DateTime.fromISO(event.startAt), day));
}

export function useSelectedDate() {
    const context = useContext(EventCalendarContext);
    if (!context) {
        throw new Error("useSelectedDate must be used within a EventCalendarProvider");
    }
    return context.selectedDate;
}

export function useSetSelectedDate() {
    const context = useContext(EventCalendarContext);
    if (!context) {
        throw new Error("useSetSelectedDate must be used within a EventCalendarProvider");
    }
    return context.setSelectedDate;
}

export function useSelectedView() {
    const context = useContext(EventCalendarContext);
    if (!context) {
        throw new Error("useSelectedView must be used within a EventCalendarProvider");
    }
    return context.selectedView;
}

export function useSetSelectedView() {
    const context = useContext(EventCalendarContext);
    if (!context) {
        throw new Error("useSetSelectedView must be used within a EventCalendarProvider");
    }
    return context.setSelectedView;
}

export function useDisabledViews() {
    const context = useContext(EventCalendarContext);
    if (!context) {
        throw new Error("useDisabledViews must be used within a EventCalendarProvider");
    }
    return context.disabledViews;
}

export function useOnDayClick() {
    const context = useContext(EventCalendarContext);
    if (!context) {
        throw new Error("useOnDayClick must be used within a EventCalendarProvider");
    }
    return context.onDayClick;
}

export function useOnHourClick() {
    const context = useContext(EventCalendarContext);
    if (!context) {
        throw new Error("useOnHourClick must be used within a EventCalendarProvider");
    }
    return context.onHourClick;
}

export function useOnEventClick() {
    const context = useContext(EventCalendarContext);
    if (!context) {
        throw new Error("useOnEventClick must be used within a EventCalendarProvider");
    }
    return context.onEventClick;
}

export function useIsFullBusyDay(events: CalendarEvent[]) {
    const context = useContext(EventCalendarContext);
    if (!context) {
        throw new Error("useIsFullBusyDay must be used within a EventCalendarProvider");
    }
    return context.isFullBusyDay ? context.isFullBusyDay(events) : undefined;
}

export function useFullBusyDayColor() {
    const context = useContext(EventCalendarContext);
    if (!context) {
        throw new Error("useFullBusyDayColor must be used within a EventCalendarProvider");
    }
    return context.fullBusyDayColor;
}

export function useIsSomeBusyDay(events: CalendarEvent[]) {
    const context = useContext(EventCalendarContext);
    if (!context) {
        throw new Error("useIsSomeBusyDay must be used within a EventCalendarProvider");
    }
    return context.isSomeBusyDay ? context.isSomeBusyDay(events) : undefined;
}

export function useSomeBusyDayColor() {
    const context = useContext(EventCalendarContext);
    if (!context) {
        throw new Error("usesSmeBusyDayColor must be used within a EventCalendarProvider");
    }
    return context.someBusyDayColor;
}

export function useIsFullFreeDay(events: CalendarEvent[]) {
    const context = useContext(EventCalendarContext);
    if (!context) {
        throw new Error("useIsFullFreeDay must be used within a EventCalendarProvider");
    }
    return context.isFullFreeDay ? context.isFullFreeDay(events) : undefined;
}

export function useFullFreeDayColor() {
    const context = useContext(EventCalendarContext);
    if (!context) {
        throw new Error("useFullFreeDayColor must be used within a EventCalendarProvider");
    }
    return context.fullFreeDayColor;
}

export function useHighlightEmptyDay() {
    const context = useContext(EventCalendarContext);
    if (!context) {
        throw new Error("useHighlightEmptyDay must be used within a EventCalendarProvider");
    }
    return context.highlightEmptyDay;
}
