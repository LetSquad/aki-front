import { useCallback, useMemo, useState } from "react";

import { DateTime } from "luxon";

import NewRentSlotModal from "@components/Schedule/NewRentSlotModal";
import RentSlotEventModal from "@components/Schedule/RentSlotEventModal";
import { getFormatTimeInterval } from "@coreUtils/utils";
import { Place } from "@models/places/types";
import { RentSlotStatus } from "@models/rentSlots/enums";
import { RentSlot } from "@models/rentSlots/types";
import EventCalendar from "@parts/EventCalendar/EventCalendar";
import { CalendarView } from "@parts/EventCalendar/types/enums";
import { CalendarEvent } from "@parts/EventCalendar/types/types";
import { useAppSelector } from "@store/hooks";
import { selectIsCurrentPlaceLoading } from "@store/place/selectors";

import styles from "./styles/Calendar.module.scss";

interface CalendarProps {
    currentPlace: Place;
}

export default function Calendar({ currentPlace }: CalendarProps) {
    const isLoading = useAppSelector(selectIsCurrentPlaceLoading);

    const [openedEvent, setOpenedEvent] = useState<CalendarEvent<RentSlot>>();
    const [newSlotDate, setNewSlotDate] = useState<DateTime>();

    const onEventClick = useCallback((event: CalendarEvent<RentSlot>) => {
        setOpenedEvent(event);
    }, []);

    const onNewSlotAdd = useCallback((date: DateTime) => {
        setNewSlotDate(date);
    }, []);

    const onSlotModalClose = useCallback(() => setOpenedEvent(undefined), []);

    const onNewSlotModalClose = useCallback(() => setNewSlotDate(undefined), []);

    const events = useMemo(() => currentPlace.rentSlots?.map((slot) => ({
        id: slot.id,
        startAt: slot.timeStart,
        endAt: slot.timeEnd,
        title: `${slot.status === RentSlotStatus.OPEN ? "Открытый слот" : "Забронированный слот"} ${getFormatTimeInterval(slot.timeStart, slot.timeEnd)}`,
        isMonthVisible: true,
        additionalInfo: slot
    })), [currentPlace.rentSlots]);

    const slotsInDayEvent = useCallback((dayEvents: CalendarEvent[]) => (
        dayEvents.filter((event) => event.isMonthVisible === false)
    ), []);

    const isFullBusyDay = useCallback((dayEvents: CalendarEvent[]) => {
        const slotsInDayEventLength = slotsInDayEvent(dayEvents).length;
        return dayEvents.length > 0 && slotsInDayEventLength === 0;
    }, [slotsInDayEvent]);

    const isSomeBusyDay = useCallback((dayEvents: CalendarEvent[]) => {
        const slotsInDayEventLength = slotsInDayEvent(dayEvents).length;
        return dayEvents.length > 0 && slotsInDayEventLength > 0 && dayEvents.length - slotsInDayEventLength > 0;
    }, [slotsInDayEvent]);

    const isFullFreeDay = useCallback((dayEvents: CalendarEvent[]) => (
        dayEvents.length > 0 && slotsInDayEvent(dayEvents).length === dayEvents.length
    ), [slotsInDayEvent]);

    return (
        <div className={styles.container}>
            <EventCalendar
                events={events}
                disabledViews={[CalendarView.WEEK]}
                initialDate={DateTime.now().plus({ day: 1 }).toISODate() as string}
                onEventClick={onEventClick}
                isFullBusyDay={isFullBusyDay}
                isSomeBusyDay={isSomeBusyDay}
                isFullFreeDay={isFullFreeDay}
                highlightEmptyDay
                isLoading={isLoading}
                onDayClick={onNewSlotAdd}
                onHourClick={onNewSlotAdd}
            />
            <RentSlotEventModal
                currentPlace={currentPlace}
                event={openedEvent}
                onClose={onSlotModalClose}
            />
            <NewRentSlotModal
                currentPlace={currentPlace}
                date={newSlotDate}
                onClose={onNewSlotModalClose}
            />
        </div>
    );
}
