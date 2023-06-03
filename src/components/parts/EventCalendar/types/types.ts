import { MouseEvent } from "react";

import { DateTime } from "luxon";

import { CalendarView, EventStatus } from "./enums";

export type CalendarEvent<T = any> = {
    id: number;
    startAt: string;
    title: string;
    additionalInfo?: T;
    isMonthVisible?: boolean;
    linkTo?: string;
    status?: EventStatus;
} & (
    {
        endAt: string;
    } | {
        fullDay: true;
    }
);

export interface EventCalendarProps {
    initialDate?: string;
    initialView?: CalendarView;
    disabledViews?: CalendarView[];
    events?: CalendarEvent[];
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
    isLoading?: boolean
}
