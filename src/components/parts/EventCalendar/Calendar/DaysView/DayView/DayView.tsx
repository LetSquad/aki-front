import DayTitle from "@parts/EventCalendar/Calendar/DaysView/DayTitle/DayTitle";
import EventsColumn from "@parts/EventCalendar/Calendar/DaysView/EventsColumn/EventsColumn";
import TimeColumn from "@parts/EventCalendar/Calendar/DaysView/TimeColumn/TimeColumn";
import { useSelectedDate } from "@parts/EventCalendar/EventCalendarContext";

import styles from "../styles/DaysView.module.scss";

export default function DayView() {
    const selectedDay = useSelectedDate();

    return (
        <>
            <DayTitle day={selectedDay} />
            <div className={styles.viewOverflowContainer}>
                <div className={styles.viewContainer}>
                    <TimeColumn />
                    <EventsColumn day={selectedDay} />
                </div>
            </div>
        </>
    );
}
