import { useCallback } from "react";

import { Icon } from "semantic-ui-react";

import { useSelectedDate, useSelectedView, useSetSelectedDate } from "@parts/EventCalendar/EventCalendarContext";
import { CalendarView } from "@parts/EventCalendar/types/enums";

export default function DirectionIcons() {
    const selectedDate = useSelectedDate();
    const setSelectedDate = useSetSelectedDate();

    const selectedView = useSelectedView();

    const move = useCallback((direction: "minus" | "plus") => {
        switch (selectedView) {
            case CalendarView.MONTH: {
                setSelectedDate(selectedDate[direction]({ month: 1 }).set({ day: 1 }));
                break;
            }
            case CalendarView.WEEK: {
                setSelectedDate(selectedDate[direction]({ day: 7 }));
                break;
            }
            case CalendarView.DAY: {
                setSelectedDate(selectedDate[direction]({ day: 1 }));
                break;
            }
            // skip default
        }
    }, [selectedDate, selectedView, setSelectedDate]);

    const moveForward = useCallback(() => move("plus"), [move]);

    const moveBackward = useCallback(() => move("minus"), [move]);

    return (
        <>
            <Icon
                name="angle left"
                link
                size="large"
                onClick={moveBackward}
            />
            <Icon
                name="angle right"
                link
                size="large"
                onClick={moveForward}
            />
        </>
    );
}
